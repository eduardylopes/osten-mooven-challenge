interface CompanyAddress {
  street: string;
  number: number;
  complement: string;
  district: string;
  city: string;
  state: string;
  telephone: string;
}

interface CreateCompanyDto {
  id: string;
  corporate_name: string;
  name: string;
  cnpj: string;
  address: CompanyAddress[];
}

export { CreateCompanyDto };
