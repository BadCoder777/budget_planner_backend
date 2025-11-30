import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BudgetDto } from './dto/budget.dto';
import { updateBudgetDto } from './dto/updateBudget.dto';

@Injectable()
export class BudgetService {
  constructor(private readonly prisma: PrismaService) {}

  async addBudget(dto: BudgetDto) {
    const user = await this.prisma.user.findUnique({
      where: { telegramId: dto.telegramId },
    });
    return await this.prisma.budget.create({
      data: {
        amount: dto.amount,
        name: dto.name,
        type: dto.type,
        userId: user!.id,
      },
    });
  }

  async removeBudget(id) {
    return await this.prisma.budget.delete({
      where: { id },
    });
  }

  async updateBudget(id, dto: updateBudgetDto) {
    if (dto) {
      const data = dto;
      return await this.prisma.budget.update({
        where: { id },
        data,
      });
    } else throw new BadRequestException('Bad request');
  }

  async getAllBudget() {
    return await this.prisma.budget.findMany();
  }

  async getBudgetById(id) {
    return await this.prisma.budget.findUnique({
      where: { id },
    });
  }
}
