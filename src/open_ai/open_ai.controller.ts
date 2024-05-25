import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { OpenAiService } from './open_ai.service';
import { OpenAIDto } from './dto/open_ai.dto';

@Controller('open-ai')
export class OpenAiController {

  constructor(private readonly openAiService: OpenAiService) {}

  @Post('response')
  async getResponse(@Body() openAiDto: OpenAIDto) {
    return await this.openAiService.chatGptRequest(openAiDto);
  }

  @Get('thread/:id')
  async getThread(@Param('id') threadId: string) {
    return await this.openAiService.findThread(threadId);
  }

  @Post('thread')
  async createThread() {
    return await this.openAiService.createThread();
  }

  @Delete('thread/:id')
  async deleteThread(@Param('id') threadId: string) {
    return await this.openAiService.deleteThread(threadId);
  }

  @Get('thread/:id/messages')
  async getThreadMessages(@Param('id') threadId: string) {
    return await this.openAiService.getThreadMessages(threadId);
  }
}
