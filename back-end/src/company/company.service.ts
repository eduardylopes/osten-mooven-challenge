import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Company } from '@prisma/client';
import { CreateCompanyDto } from './dtos/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(company: CreateCompanyDto): Promise<Company> {
    const companyAlreadyExists = await this.prisma.company.findUnique({
      where: { cnpj: company.id },
    });

    if (companyAlreadyExists) {
      throw new HttpException('Company already exists', HttpStatus.BAD_REQUEST);
    }

    const newCompany = await this.prisma.company.create({ data: company });

    return newCompany;
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.prisma.company.findUnique({ where: { id } });

    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }

    return company;
  }

  async findByContains(value: string): Promise<Company[]> {
    const companies = await this.prisma.company.findMany({
      where: {
        corporate_name: {
          contains: value,
        },
      },
    });

    if (!companies) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }

    return companies;
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.prisma.company.findMany();

    if (!companies) {
      throw new HttpException(
        'There are no registered companies',
        HttpStatus.NO_CONTENT,
      );
    }

    return companies;
  }

  async remove(id: string) {
    await this.prisma.company.delete({ where: { id } });
  }
}
