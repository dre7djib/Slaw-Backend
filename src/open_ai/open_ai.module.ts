import { Module } from '@nestjs/common';
import { OpenAiService } from './open_ai.service';
import { OpenAiController } from './open_ai.controller';
import OpenAIApi from 'openai';

@Module({
  controllers: [OpenAiController],
  providers: [
    OpenAiService,
    {
      provide: 'OpenAI',
      useValue: new OpenAIApi({
        apiKey: process.env.OPEN_AI_SECRET_KEY,
      }),
    },
  ],
})
export class OpenAiModule {}