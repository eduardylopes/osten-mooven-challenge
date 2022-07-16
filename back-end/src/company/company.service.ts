import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Company } from '@prisma/client';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { cnpjValidation } from 'src/utils/cnpj-validation';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create({
    corporate_name,
    name,
    cnpj,
    address,
  }: CreateCompanyDto): Promise<Company> {
    const isCnpjValid = cnpjValidation(cnpj);

    if (!isCnpjValid) {
      throw new HttpException('cnpj must be valid', HttpStatus.BAD_GATEWAY);
    }

    const companyAlreadyExists = await this.prisma.company.findUnique({
      where: { cnpj },
    });

    if (companyAlreadyExists) {
      throw new HttpException('company already exists', HttpStatus.BAD_REQUEST);
    }

    const newCompany = await this.prisma.company.create({
      data: {
        corporate_name,
        name,
        cnpj,
        address: {
          create: address,
        },
      },
      include: { address: true },
    });

    return newCompany;
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: { address: true },
    });

    if (!company) {
      throw new HttpException('company not found', HttpStatus.NOT_FOUND);
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
      include: { address: true },
    });

    if (!companies) {
      throw new HttpException('company not found', HttpStatus.NOT_FOUND);
    }

    return companies;
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.prisma.company.findMany({
      include: { address: true },
    });

    if (!companies) {
      throw new HttpException(
        'there are no registered companies',
        HttpStatus.NO_CONTENT,
      );
    }

    return companies;
  }

  async remove(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new HttpException('company not found', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.company.delete({
      where: { id },
      include: { address: true },
    });
  }

  async update(
    { name, corporate_name, cnpj, address }: UpdateCompanyDto,
    id: number,
  ) {
    if (cnpj) {
      const isCnpjValid = cnpjValidation(cnpj);

      if (!isCnpjValid) {
        throw new HttpException('cnpj must be valid', HttpStatus.BAD_GATEWAY);
      }
    }

    const company = await this.prisma.company.findUnique({
      where: { id },
      include: { address: true },
    });

    if (!company) {
      throw new HttpException('company not found', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.company.update({
      where: { id },
      data: {
        name,
        corporate_name,
        cnpj,
        address: { update: address },
      },
    });
  }
}
