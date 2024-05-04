import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ValidationPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createClientDto: CreateClientDto) {
    return this.clientsService.createClient(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAllClient();
  }

  @Get(':id')
  findOne(@Param('id') clientId: string) {
    try {
      return this.clientsService.findOneClient(clientId);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  update(@Param('id') clientId: string, @Body(new ValidationPipe()) updateClientDto: UpdateClientDto) {
    try {
      return this.clientsService.updateClient(clientId, updateClientDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  remove(@Param('id') clientId: string) {
    try {
      return this.clientsService.removeClient(clientId);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
