import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  telegramUsername: string;

  @IsString()
  @IsNotEmpty()
  telegramId: string;
}
