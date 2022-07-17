import { api } from "boot/axios";

export const getAllCompanies = async () => {
  const response = await api.get("company");

  if (response?.status !== 200) {
    return null;
  }

  return response;
};

export const getFilterCompanies = async (companyName) => {
  const response = await api.get(
    `company/filter?corporate_name=${companyName}`
  );

  if (response?.status !== 200) {
    return null;
  }

  return response;
};

export const getCompany = async (companyId) => {
  const response = await api.get(`company/${companyId}`);

  if (response?.status !== 200) {
    return null;
  }

  return response;
};

export const deleteCompany = async (companyId) => {
  const response = await api.delete(`company/${companyId}`);

  if (response?.status !== 204) {
    return null;
  }

  return response;
};

export const putCompany = async (companyId, body) => {
  const response = await api.patch(`company/${companyId}`, body);

  if (response?.status !== 200) {
    return null;
  }

  return response;
};

export const createCompany = async (body) => {
  const response = await $api(`${process.env.API}/api/company`, body);

  if (response?.status !== 201) {
    return null;
  }

  return response;
};
