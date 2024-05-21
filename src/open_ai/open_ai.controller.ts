import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { OpenAiService } from './open_ai.service';
import { Public } from 'src/decorators/public.decorator';
import OpenAIApi from 'openai';
import { OpenAIDto } from './dto/open_ai.dto';
import { Request } from 'express';

@Controller('open-ai')
export class OpenAiController {

  public openai: OpenAIApi;
  
  constructor(private readonly openAiService: OpenAiService) {}

  @Public()
  @Post()
  getResponse(@Body() openAiDto: OpenAIDto) {
    return this.openAiService.chatGpt_request(openAiDto);
  }

}
