import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '@prisma/client';
import { CreateCompanyDto } from './dtos/create-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getAll(): Promise<Company[]> {
    const companies = await this.companyService.findAll();
    return companies;
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Company> {
    const company = await this.companyService.findOne(id);
    return company;
  }

  @Get('includes/:value')
  async getMany(@Param('value') value: string): Promise<Company[]> {
    const companies = await this.companyService.findByContains(value);
    return companies;
  }

  @Post()
  async post(@Body() company: CreateCompanyDto): Promise<Company> {
    const newCompany = await this.companyService.create(company);
    return newCompany;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.companyService.remove(id);
  }
}
