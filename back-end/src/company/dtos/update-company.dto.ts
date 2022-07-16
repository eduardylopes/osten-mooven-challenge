import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  Matches,
  ValidateNested,
} from 'class-validator';

class CompanyAddressDto {
  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsNumber()
  number?: number;

  @IsOptional()
  @IsString()
  complement?: string | null;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  telephone?: string;
}

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  corporate_name?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, {
    message: 'cnpj must be valid',
  })
  @IsString()
  cnpj?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CompanyAddressDto)
  address?: CompanyAddressDto;
}
