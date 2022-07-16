import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

export class CompanyAddress {
  @IsString()
  street: string;

  @IsNumber()
  number: number;

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompanyAddress)
  address: CompanyAddress[];
}
