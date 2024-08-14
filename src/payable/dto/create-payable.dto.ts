import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePayableDTO {
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Value must be a number' })
  @IsNotEmpty({ message: 'Value is required' })
  value: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsUUID('4', { message: 'Client ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Client ID is required' })
  clientId: string;

  @IsUUID('4', { message: 'Tranasction ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Tranasction ID is required' })
  transactionId: string;

  @IsDate()
  paymentDate: Date;

  @IsNumber()
  fee: number;
}
