import { api } from "boot/axios";

export const getAllCompanies = async () => {
  const response = await api.get("company");
  return response;
};

export const getFilterCompanies = async (companyName) => {
  const response = await api.get(
    `company/filter?corporate_name=${companyName}`
  );

  return response;
};

export const getCompany = async (companyId) => {
  const response = await api.get(`company/${companyId}`);

  return response;
};

export const deleteCompany = async (companyId) => {
  const response = await api.delete(`company/${companyId}`);

  return response;
};

export const updateCompany = async (companyId, body) => {
  try {
    const response = await api.patch(`company/${companyId}`, body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createCompany = async (body) => {
  try {
    const response = await api.post("company", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
