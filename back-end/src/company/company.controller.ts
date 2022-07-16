import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '@prisma/client';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('list')
  async getAll(): Promise<Company[]> {
    const companies = await this.companyService.findAll();
    return companies;
  }

  @Get('list/one')
  async getMany(
    @Query('corporate_name') corporate_name: string,
  ): Promise<Company[]> {
    const companies = await this.companyService.findByContains(corporate_name);
    return companies;
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Company> {
    const company = await this.companyService.findOne(id);
    return company;
  }

  @Post()
  async post(@Body() company: CreateCompanyDto): Promise<Company> {
    const newCompany = await this.companyService.create(company);
    return newCompany;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.companyService.remove(id);
  }

  @Patch(':id')
  async update(
    @Param('id')
    id: string,

    @Body() company: UpdateCompanyDto,
  ): Promise<void> {
    await this.companyService.update(company, id);
  }
}
