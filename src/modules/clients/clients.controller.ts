import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDTO } from './dto/create-client.dto';
import { ClientResponse } from './dto/client-response.dto';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a client',
  })
  @ApiBody({
    type: CreateClientDTO,
  })
  @ApiCreatedResponse({
    description: 'Client created with success',
    type: ClientResponse,
  })
  async create(
    @Body() createClientDTO: CreateClientDTO,
  ): Promise<ClientResponse> {
    const res = await this.clientsService.create(createClientDTO);
    return new ClientResponse(res);
  }
}
