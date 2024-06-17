import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as fspath from "path";
import {
  AnyPrincipal,
  Effect,
  PolicyDocument,
  PolicyStatement,
} from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { BasicLambdaRole } from "./basic-lambda-role";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class DrawMyDiaryAwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Rest API
    const api = new apigateway.RestApi(this, "draw-my-diary-api", {
      restApiName: "draw-my-diary-api",
      deployOptions: {
        stageName: "dev",
      },
      deploy: true,
      cloudWatchRole: true,
      endpointTypes: [apigateway.EndpointType.REGIONAL],
      policy: new PolicyDocument({
        statements: [
          new PolicyStatement({
            effect: Effect.ALLOW,
            principals: [new AnyPrincipal()],
            actions: ["execute-api:Invoke"],
            resources: ["execute-api:/*"],
          }),
        ],
      }),
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
      },
      apiKeySourceType: apigateway.ApiKeySourceType.HEADER,
    });

    // Create API Key
    const apiKey = new apigateway.ApiKey(this, "ApiKey");

    // Create a usage plan and add the API key to it
    const usagePlan = new apigateway.UsagePlan(this, "UsagePlan", {
      name: "Usage Plan",
      apiStages: [
        {
          api,
          stage: api.deploymentStage,
        },
      ],
    });
    usagePlan.addApiKey(apiKey);

    // Create role for lambda
    const basicLambdaRole = new BasicLambdaRole(this, "dev");

    // Construct Lambda
    const TestLambda = new NodejsFunction(this, "dev-test-api", {
      functionName: "dev-test-api",
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: fspath.join(__dirname, "../lambdas/api/test-api.ts"),
      timeout: cdk.Duration.seconds(30),
      description: "Lambda for draw my diary app",
      role: basicLambdaRole,
      environment: {
        API_KEY_PARAM_PATH: "/DMD/DEV/GEMINI_API_KEY",
      },
    });

    // Assign lambdas to API Gateway
    const testResource = api.root.addResource("test");
    testResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(TestLambda),
      {
        apiKeyRequired: true,
      }
    );

    // Misc: Outputs
    new cdk.CfnOutput(this, "API Key ID", {
      value: apiKey.keyId,
    });

    new cdk.CfnOutput(this, "API URL", {
      value: api.url,
    });
  }
}
