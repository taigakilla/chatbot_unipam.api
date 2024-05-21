import { Body, Controller, Post} from '@nestjs/common';
import { DialogflowService } from './dialogflow.service';
import { randomUUID } from 'node:crypto';

@Controller()
export class DialogflowController {
  constructor(private readonly dialogflowService: DialogflowService) {}

  @Post('dialogflow')
  async postDialogflowResponse(@Body('message') message: string) {
    
    const projectId = 'chatbotunipam-ixov'; 
    const sessionId = randomUUID();
    const languageCode = 'pt-BR';
    const response = await this.dialogflowService.detectIntent(projectId, message, sessionId, languageCode);

    return response;
  }
}
