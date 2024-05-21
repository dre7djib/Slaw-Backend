import { Module } from '@nestjs/common';
import { OpenAiService } from './open_ai.service';
import { OpenAiController } from './open_ai.controller';
import OpenAIApi from 'openai';
import { TypeOrmModule } from '@nestjs/typeorm';
import { open_ai } from './entities/open_ai.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([open_ai]), AuthModule, UsersModule],
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