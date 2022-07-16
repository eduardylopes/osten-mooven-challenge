import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  Matches,
  ValidateNested,
} from 'class-validator';

class UpdateCompanyAddressDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  street?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  number?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  complement?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  telephone?: string;
}

export class UpdateCompanyDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  corporate_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, {
    message: 'cnpj must be valid',
  })
  @IsString()
  cnpj?: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateCompanyAddressDto)
  address?: UpdateCompanyAddressDto;
}
