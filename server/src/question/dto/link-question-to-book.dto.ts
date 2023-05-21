import { IsNumber } from 'class-validator';

export class LinkQuestionToBookDto {
  @IsNumber()
  bookId: number;
}
