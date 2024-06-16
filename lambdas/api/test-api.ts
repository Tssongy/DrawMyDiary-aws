import {
  Context,
  APIGatewayProxyResultV2,
  APIGatewayProxyEventV2,
} from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResultV2> => {
  console.log("Event object: " + JSON.stringify(event));
  console.log("Context: ", context);
  return {
    statusCode: 200,
    body: "Hello world from Sydney!",
  };
};
