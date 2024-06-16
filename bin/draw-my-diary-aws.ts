#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DrawMyDiaryAwsStack } from "../lib/draw-my-diary-aws-stack";

const app = new cdk.App();
new DrawMyDiaryAwsStack(app, "DrawMyDiaryAwsStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  description: "Stack created via CDK for Draw My Diary",
});
