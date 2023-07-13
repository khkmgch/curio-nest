import { Injectable } from '@nestjs/common';
import {
  ChatCompletionResponseMessage,
  Configuration,
  CreateChatCompletionRequest,
  OpenAIApi,
} from 'openai';
@Injectable()
export class ChatgptService {
  private readonly openai: OpenAIApi;
  constructor() {
    const configuration: Configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);

    // const completion = await openai.createChatCompletion({
    //   model: 'gpt-3.5-turbo',
    //   messages: [{ role: 'user', content: 'Hello world' }],
    // });
    // console.log(completion.data.choices[0].message);
  }

  async getResponse(
    prompt: string,
  ): Promise<ChatCompletionResponseMessage> {
    try {
      const template: string =
        'この疑問を解決するために、参考になる日本語の本のタイトルを3つ列挙して';
      const params: CreateChatCompletionRequest = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `"${prompt}" ${template}。`,
          },
        ],
      };
      // console.log(params);
      const response =
        await this.openai.createChatCompletion(params);
      console.log("response: ",response)
      return response.data.choices[0].message;
    } catch (error) {
      console.error(error);
    }
  }
}
