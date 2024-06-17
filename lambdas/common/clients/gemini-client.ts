import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiClient {
  genAI: GoogleGenerativeAI;
  model: GenerativeModel;
  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }
  /**
   *
   * @param prompt prompt for AI
   * @returns text
   */
  runPrompt = async (prompt: string): Promise<string> => {
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  };
}
