import { Injectable } from '@nestjs/common';
import * as dialogflow from '@google-cloud/dialogflow';
import * as path from 'path';

@Injectable()
export class DialogflowService {
  private sessionClient: dialogflow.SessionsClient;

  constructor() {
    const privateKeyPath = path.resolve(__dirname, '../chatbotunipam-ixov-7f826daa2b04.json'); 
    this.sessionClient = new dialogflow.SessionsClient({
      keyFilename: privateKeyPath,
    });
  }

  async detectIntent(projectId: string, text: string, sessionId: string, languageCode: string) {
    const sessionPath = this.sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: languageCode,
        },
      },
    };

    const responses = await this.sessionClient.detectIntent(request);
    return responses[0].queryResult;
  }
}
