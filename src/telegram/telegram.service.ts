import { Injectable, OnModuleInit } from '@nestjs/common';
import type * as TelegramBotTypes from 'node-telegram-bot-api';
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBotTypes;
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN;
  private readonly channelId = process.env.TELEGRAM_CHANNEL_ID;

  onModuleInit() {
    if (!this.botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN environment variable is not set');
    }

    this.bot = new TelegramBot(this.botToken, { polling: false });
  }

  async sendMarkdownMessage(
    message: string,
  ): Promise<TelegramBotTypes.Message> {
    const targetChannelId = this.channelId;

    if (!targetChannelId) {
      throw new Error(
        'Channel ID is not provided and default channel ID is not set',
      );
    }

    return this.bot.sendMessage(targetChannelId, message, {
      parse_mode: 'Markdown',
    });
  }
}
