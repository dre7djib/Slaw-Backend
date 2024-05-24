import { Module } from '@nestjs/common';
import { OpenAiService } from './open_ai.service';
import { OpenAiController } from './open_ai.controller';
import OpenAIApi from 'openai';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

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
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
  exports: [OpenAiService],
})
export class OpenAiModule {}