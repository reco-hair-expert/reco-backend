import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { TelegramService } from './telegram.service';

class SendMessageDto {
  @ApiProperty()
  message: string;
}

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendMessage(@Body() req: SendMessageDto) {
    return this.telegramService.sendMarkdownMessage(req.message);
  }
}
