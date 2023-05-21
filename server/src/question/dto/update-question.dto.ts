import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  //任意の値は@IsOptionalを付ける
  @IsString()
  @IsOptional()
  description?: string;
}
