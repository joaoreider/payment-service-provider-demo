import { ApiProperty } from '@nestjs/swagger';

export class ClientResponse {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Client ID',
  })
  id: string;
  @ApiProperty({
    example: 'John Doe',
    description: 'Client name',
  })
  name: string;

  constructor(partial: Partial<ClientResponse>) {
    Object.assign(this, partial);
  }
}
