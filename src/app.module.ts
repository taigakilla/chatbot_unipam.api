import { Module } from '@nestjs/common';
import { DialogflowModule } from './dialogflow.module'; 
import { DialogflowController } from './dialogflow.controller';


@Module({
  imports: [DialogflowModule],
  controllers: [DialogflowController],
})
export class AppModule {}
