import { APIGatewayProxyResult } from "aws-lambda";

export const status200 = (response: any): APIGatewayProxyResult => {
  let body: string =
    typeof response === "string" ? response : JSON.stringify(response);
  return {
    headers: {
      "access-control-allow-methods": "*",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "*",
      "Content-Type": "application/json",
    },
    statusCode: 200,
    body,
  };
};

export const status201 = (response: any): APIGatewayProxyResult => {
  let body: string =
    typeof response === "string" ? response : JSON.stringify(response);
  return {
    headers: {
      "access-control-allow-methods": "*",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "*",
      "Content-Type": "application/json",
    },
    statusCode: 201,
    body,
  };
};

export const error400 = (message: string): APIGatewayProxyResult => {
  return {
    headers: {
      "access-control-allow-methods": "*",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "*",
      "Content-Type": "application/json",
    },
    statusCode: 400,
    body: JSON.stringify({ message }),
  };
};

export const error401 = (message: string): APIGatewayProxyResult => {
  return {
    headers: {
      "access-control-allow-methods": "*",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "*",
      "Content-Type": "application/json",
    },
    statusCode: 401,
    body: JSON.stringify({ message }),
  };
};

export const error403 = (message: string): APIGatewayProxyResult => {
  return {
    headers: {
      "access-control-allow-methods": "*",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "*",
      "Content-Type": "application/json",
    },
    statusCode: 403,
    body: JSON.stringify({ message }),
  };
};

export const error500 = (message: string): APIGatewayProxyResult => {
  return {
    headers: {
      "access-control-allow-methods": "*",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "*",
      "Content-Type": "application/json",
    },
    statusCode: 500,
    body: JSON.stringify({ message }),
  };
};
