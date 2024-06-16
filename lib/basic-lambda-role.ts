import {
  Effect,
  ManagedPolicy,
  PolicyDocument,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

/**
 * IAM Role assumed by Lambda Functions.
 */
export class BasicLambdaRole extends Role {
  constructor(scope: Construct, envName: string) {
    super(scope, `${envName}-basic-lambda-role`, {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      roleName: `${envName}-basic-lambda-role`,
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
      inlinePolicies: {
        lambdaPolicies: new PolicyDocument({
          statements: [
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "logs:GetLog*",
              ],
              resources: ["*"],
            }),
          ],
        }),
      },
    });
  }
}
