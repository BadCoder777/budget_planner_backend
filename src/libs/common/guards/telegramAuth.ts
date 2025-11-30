import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const telegramAuthHeader = request.headers['x-telegram-auth'];

    if (!telegramAuthHeader) return false;

    request.user = await this.prisma.user.findUnique({
      where: { telegramId: telegramAuthHeader },
    });

    return !!request.user;
  }
}
