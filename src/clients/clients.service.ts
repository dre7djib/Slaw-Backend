import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { clients } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(clients)
    private clientsRepository: Repository<clients>,
  ) {}

  createClient(createClientDto: CreateClientDto) {
    const newClient = this.clientsRepository.create({
      ...createClientDto,
      userId: { userId: createClientDto.userId}
    });
    return this.clientsRepository.save(newClient);
  }

  findAllClient() {
    return this.clientsRepository.find();
  }

  findOneClient(clientId: string) {
    const client = this.clientsRepository.findOneBy({ clientId });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async updateClient(clientId: string, updateClientDto: UpdateClientDto) {
    const client = await this.findOneClient(clientId);
    const updatedClient = { ...client, 
      ...updateClientDto, 
      userId: { userId: updateClientDto.userId } 
    };
    return this.clientsRepository.save(updatedClient);
  }

  async removeClient(clientId: string) {
    const client = await this.findOneClient(clientId);
    return this.clientsRepository.remove(client);
  }
}
