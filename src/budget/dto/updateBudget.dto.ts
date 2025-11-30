import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BudgetType } from '../../../generated/prisma/enums';

export class updateBudgetDto {
  @IsNumber()
  @IsDecimal()
  @IsNotEmpty()
  amount?: number;

  @IsString()
  @IsNotEmpty()
  name?: string;

  type?: BudgetType;

  @IsString()
  @IsNotEmpty()
  telegramId?: string;
}
