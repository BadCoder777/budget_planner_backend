import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetDto } from './dto/budget.dto';
import { TelegramAuthGuard } from '../libs/common/guards/telegramAuth';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @UseGuards(TelegramAuthGuard)
  @Post()
  addBudget(@Body() dto: BudgetDto) {
    return this.budgetService.addBudget(dto);
  }

  @Get()
  getAllBudget() {
    return this.budgetService.getAllBudget();
  }

  @Get(':id')
  getBudgetById(@Param() id: string) {
    return this.budgetService.getBudgetById(Number(id));
  }
}
