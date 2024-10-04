import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDTO {
  @ApiProperty({
    description: 'The name of the client',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
