import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDTO } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDTO: CreateClientDTO) {
    return this.clientsService.create(createClientDTO);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }
}
