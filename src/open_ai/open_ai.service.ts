require('dotenv').config();
import OpenAIApi from "openai";
import { Inject, Injectable } from '@nestjs/common';
import { env } from 'process';
import { OpenAIDto } from "./dto/open_ai.dto";

@Injectable()
export class OpenAiService {
  constructor(@Inject('OpenAI') private openai: OpenAIApi) {
  }

  async chatGpt_request(openAiDto: OpenAIDto): Promise<any> {
    const completion = await this.openai.chat.completions.create({
      messages: [
      { role: "system", content: "Tu es ChatGPT, un assistant intelligent spécialisé en rédaction, description et enseignement. Tu fourniras des réponses détaillées, bien structurées et adaptées à chaque contexte. Utilise un ton professionnel, mais accessible, et ajuste ton niveau de langage en fonction du public cible indiqué. Pour la rédaction, structure les textes de manière claire et cohérente. Pour les descriptions, sois évocatif et précis. Pour l'enseignement, explique les concepts de manière simple et compréhensible, en évitant le jargon technique quand cela est nécessaire."},
      { role: "user", content: openAiDto.text },
      ],
      model: "gpt-4o",
      temperature: 0.5,
      max_tokens: 500
    });

    console.log(1, completion.choices[0].message.content);

    return {
      response: completion.choices[0].message.content
    }
  }
}
