import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDTO } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDTO) {}
