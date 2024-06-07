import { Body, Controller, Post } from '@nestjs/common';
import { DialogflowService } from './dialogflow.service';

@Controller()
export class DialogflowController {
  constructor(private readonly dialogflowService: DialogflowService) {}

  @Post('dialogflow')
  async PostDialogflowResponse(
    @Body('message') message: string,
    @Body('sessionId') sessionId: string,
  ) {
    const projectId = 'chatbotunipam-ixov';
    const languageCode = 'pt-BR';

    const response = await this.dialogflowService.detectIntent(
      projectId,
      message,
      sessionId,
      languageCode,
    );

    return response.fulfillmentMessages[0].text;
  }
}
