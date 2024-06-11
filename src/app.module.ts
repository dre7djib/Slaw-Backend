require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OpenAiModule } from './open_ai/open_ai.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    OpenAiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor() {}
}
