import { IsNotEmpty, IsString } from "class-validator";

export class GetChatgptResponseDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;
}
