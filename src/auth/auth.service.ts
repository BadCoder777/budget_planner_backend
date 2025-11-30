import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const isRegistered = !!(await this.prisma.user.findUnique({
      where: { telegramId: dto.telegramId },
    }));

    if (isRegistered) return;

    return this.prisma.user.create({
      data: {
        telegramId: dto.telegramId,
        telegramUsername: dto.telegramUsername,
      },
    });
  }
}
