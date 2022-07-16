import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

class CreateCompanyAddressDto {
  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsNumber()
  number: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  complement: string;

  @ApiProperty()
  @IsString()
  district: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  telephone: string;
}

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  corporate_name: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Matches(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/, {
    message: 'cnpj must contain 14 digits',
  })
  @IsString()
  cnpj: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => CreateCompanyAddressDto)
  address: CreateCompanyAddressDto;
}
