import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
