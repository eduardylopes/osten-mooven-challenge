import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

class CompanyAddress {
  @IsString()
  street: string;

  @IsNumber()
  number: number;

  @IsOptional()
  @IsString()
  complement: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  telephone: string;
}

export class CreateCompanyDto {
  @IsString()
  corporate_name: string;

  @IsString()
  name: string;

  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, {
    message: 'cnpj must be valid',
  })
  @IsString()
  cnpj: string;

  @ValidateNested({ each: true })
  @Type(() => CompanyAddress)
  address: CompanyAddress;
}
