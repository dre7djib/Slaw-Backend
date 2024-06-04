import { Controller, Post, Body, Get, Param, Delete, UnauthorizedException, Req, NestMiddleware } from '@nestjs/common';
import { OpenAiService } from './open_ai.service';
import { OpenAIDto } from './dto/open_ai.dto';

@Controller('open-ai')
export class OpenAiController {

  constructor(private readonly openAiService: OpenAiService) {}

  @Post('response')
  async getResponse(@Body() openAiDto: OpenAIDto, @Req() req: Request){
    const userId = req['user']?.sub;
    if (!userId) {
      throw new UnauthorizedException('User ID not found');
    }
    return await this.openAiService.chatGptRequest(openAiDto, userId);
  }

  @Get('thread/:id')
  async getThread(@Param('id') threadId: string) {
    return await this.openAiService.findThread(threadId);
  }

  @Get('threads/list')
  async listThreads(@Req() req: Request) {
    const userId = req['user']?.sub;
    if (!userId) {
      throw new UnauthorizedException('User ID not found');
    }
    return await this.openAiService.listThreads(userId);
  }

  @Post('thread')
  async createThread(@Req() req: Request) {
    const userId = req['user']?.sub;
    if (!userId) {
      throw new UnauthorizedException('User ID not found');
    }
    return await this.openAiService.createThread(userId);
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

