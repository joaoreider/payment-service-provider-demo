import { Controller, Post, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDTO } from './dto/create-client.dto';
import { ClientResponse } from './dto/client-response.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(
    @Body() createClientDTO: CreateClientDTO,
  ): Promise<ClientResponse> {
    return await this.clientsService.create(createClientDTO);
  }
}
