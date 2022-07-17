import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '@prisma/client';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('api/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getAll(): Promise<Company[]> {
    const companies = await this.companyService.findAll();
    return companies;
  }

  @Get('filter')
  async getMany(
    @Query('corporate_name') corporate_name: string,
  ): Promise<Company[]> {
    const companies = await this.companyService.findByContains(corporate_name);
    return companies;
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    const company = await this.companyService.findOne(Number(id));
    return company;
  }

  @ApiBody({ type: [CreateCompanyDto] })
  @Post()
  async post(@Body() company: CreateCompanyDto): Promise<Company> {
    const newCompany = await this.companyService.create(company);
    return newCompany;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.companyService.remove(Number(id));
  }

  @ApiBody({ type: [UpdateCompanyDto] })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() company: UpdateCompanyDto,
  ): Promise<void> {
    await this.companyService.update(company, Number(id));
  }
}
