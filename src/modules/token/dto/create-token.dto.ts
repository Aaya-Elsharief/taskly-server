import { IsString, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';
import { SourceEnum } from '../constants/token.enum';

export class CreateTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsEnum(SourceEnum)
  deviceSource: SourceEnum;

  @IsDateString()
  expiresAt: Date;
}
