require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { users } from './users/entities/user.entity';
import { clients } from './clients/entities/client.entity';
import { env } from 'process';
import { ClientsModule } from './clients/clients.module';
import { AuthModule } from './auth/auth.module';
import { OpenAiModule } from './open_ai/open_ai.module';
import { open_ai } from './open_ai/entities/open_ai.entity';

@Module({
  imports: [
    UsersModule,
    ClientsModule,
    AuthModule,
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: [users, clients, open_ai],
    synchronize: true,
    }),
    OpenAiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
