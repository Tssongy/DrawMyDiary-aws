import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

export class SsmClient {
  ssm: SSMClient;
  constructor() {
    this.ssm = new SSMClient({});
  }
  /**
   *
   * @param paramKey path to secret
   * @returns secret value
   */
  getSecretValue = async (paramKey: string): Promise<string | undefined> => {
    let secret;
    try {
      const result = await this.ssm.send(
        new GetParameterCommand({
          Name: paramKey,
          WithDecryption: true,
        })
      );
      secret = result.Parameter?.Value;
    } catch (e) {
      console.error(`Failed to load SSM (${paramKey}) parameter.`, e);
    }
    return secret;
  };
}
