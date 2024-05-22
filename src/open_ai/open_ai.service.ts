require('dotenv').config();
import OpenAIApi from "openai";
import { Inject, Injectable } from '@nestjs/common';
import { env } from 'process';
import { OpenAIDto } from "./dto/open_ai.dto";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class OpenAiService {
  constructor(
    @Inject('OpenAI') private openai: OpenAIApi,
    private authService: AuthService,
  ) {}

  async chatGpt_request(openAIDto: OpenAIDto): Promise<any> {
    const token = openAIDto.headers
    const userId = this.authService.verifyToken(token)
    if (userId === false) {
      throw new Error('Unauthorized');
    }
    
    const completion = await this.openai.chat.completions.create({
      messages: [
      { role: "system", content: "Tu es ChatGPT, un assistant intelligent spécialisé en rédaction, description et enseignement. Tu fourniras des réponses détaillées, bien structurées et adaptées à chaque contexte. Utilise un ton professionnel, mais accessible, et ajuste ton niveau de langage en fonction du public cible indiqué. Pour la rédaction, structure les textes de manière claire et cohérente. Pour les descriptions, sois évocatif et précis. Pour l'enseignement, explique les concepts de manière simple et compréhensible, en évitant le jargon technique quand cela est nécessaire."},
      { role: "user", content: openAIDto.text },
      ],
      model: env.OPENAI_MODEL,
      temperature: 0.5,
      max_tokens: 500
    });
    return {
      response: completion.choices[0].message.content
    }
  }

}
