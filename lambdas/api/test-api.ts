import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { SsmClient } from "../common/clients/ssm-client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CommonUtils } from "../common/common-utils";
import { GeminiClient } from "../common/clients/gemini-client";
import { error400, status200 } from "./response";

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("Event object: " + JSON.stringify(event));
  console.log("Context: ", context);

  // Check if event.body is defined and has a value
  if (!event.body) {
    return error400("Missing request body");
  }
  const body = JSON.parse(event.body);

  // Check if event.body.prompt is defined
  if (!body.prompt) {
    return error400("Missing required parameter: prompt");
  }
  const prompt = body.prompt;

  const ssm = new SsmClient();
  const API_KEY = CommonUtils.safeTrim(
    await ssm.getSecretValue(process.env.API_KEY_PARAM_PATH ?? "")
  );

  const gemini = new GeminiClient(API_KEY);
  const res = await gemini.runPrompt(prompt);
  console.log("res from AI: ", res);

  return status200(res);
};
