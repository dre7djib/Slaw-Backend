require('dotenv').config();
import OpenAIApi from 'openai';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { env } from 'process';
import { OpenAIDto } from './dto/open_ai.dto';

@Injectable()
export class OpenAiService {
  constructor(
    @Inject('OpenAI') private openai: OpenAIApi,
  ) {}

  private readonly logger = new Logger(OpenAiService.name);

  async chatGptRequest(openAIDto: OpenAIDto): Promise<any> {
    this.logger.log('ChatGPT Request');
    try {
      const thread = await this.findThread(openAIDto.thread);
      return await this.getResponse(thread.id, openAIDto.text);

    } catch (error) {
      const thread = await this.createThread();
      return await this.getResponse(thread.id, openAIDto.text);
    }
  }
  
  async findThread(threadId: string): Promise<any> {
    this.logger.log('Find Thread');
    try {
      const thread = await this.openai.beta.threads.retrieve(threadId);
      return thread;
    } catch (error) {
      throw new NotFoundException(`Thread with ID ${threadId} not found`);
    }
  }

  async createThread(): Promise<any> {
    const thread = await this.openai.beta.threads.create();
    return thread;
  }

  async createThreadMessage(threadId: string, message: string): Promise<any> {
    const threadMessage = await this.openai.beta.threads.messages.create(
      threadId,
      { role: 'user', content: message},
    );
    return threadMessage;
  }

  async deleteThread(threadId: string): Promise<any> {
    this.logger.log('Delete Thread');
    try {
      const thread = await this.openai.beta.threads.del(threadId);
      return thread;
    } catch (error) {
      throw new NotFoundException(`Could not delete thread with ID ${threadId}`);
    }
  }

  async runThread(threadId: string): Promise<any> {
    this.logger.log('Run Thread');
    try {
      const run = await this.openai.beta.threads.runs.createAndPoll(
        threadId,
        { assistant_id: "asst_Xwk2Hfnt2abLTZ6eex53EuQ7" }
      );
      return run;
    } catch (error) {
      throw new NotFoundException(`Could not run thread with ID ${threadId}`);
    }
  }

  async getThreadMessages(threadId: string): Promise<any> {
    this.logger.log('Get Thread Messages');
    try {
      const messages = await this.openai.beta.threads.messages.list(threadId);
      return messages;
    } catch (error) {
      throw new NotFoundException(`Could not retrieve messages for thread ID ${threadId}`);
    }
  }

  async getRunMessages(run: OpenAIApi.Beta.Threads.Runs.Run): Promise<any> {
    this.logger.log('Get Run Messages');
    const messages = await this.openai.beta.threads.messages.list(
      run.thread_id
    );
    return messages;
  }

  async getResponse(thread: string, message: string) {
    this.logger.log('Get Response');
    const threadMessage = await this.createThreadMessage(thread, message);
    const run = await this.runThread(thread);
    const messages = await this.getRunMessages(run);
    return messages;
  }
    
}