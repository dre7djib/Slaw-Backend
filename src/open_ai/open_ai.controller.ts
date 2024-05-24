import { Controller,Post, Body} from '@nestjs/common';
import { OpenAiService } from './open_ai.service';
import OpenAIApi from 'openai';
import { OpenAIDto } from './dto/open_ai.dto';

@Controller('open-ai')
export class OpenAiController {

  public openai: OpenAIApi;
  
  constructor(private readonly openAiService: OpenAiService) {}

  @Post()
  getResponse(@Body() openAiDto: OpenAIDto) {
    return this.openAiService.chatGpt_request(openAiDto);
  }

}
