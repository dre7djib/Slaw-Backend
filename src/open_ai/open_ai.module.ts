import { Module } from '@nestjs/common';
import { OpenAiService } from './open_ai.service';
import { OpenAiController } from './open_ai.controller';
import OpenAIApi from 'openai';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
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