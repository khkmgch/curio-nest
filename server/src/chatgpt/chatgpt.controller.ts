import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import { GetChatgptResponseDto } from './dto/get-chatgpt-response.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('chatgpt')
export class ChatgptController {
  constructor(
    private readonly chatgptService: ChatgptService,
  ) {}

  @Post()
  getResponse(@Body() dto: GetChatgptResponseDto) {
    return this.chatgptService.getResponse(dto.prompt);
  }
}
