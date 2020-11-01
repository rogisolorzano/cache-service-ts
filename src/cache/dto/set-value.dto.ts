import { IsNumber, IsString } from 'class-validator';

export class SetValueDto {
  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsNumber()
  ttl: number;
}
