import axios from 'axios';
import {CompanyDTO} from "../model/CompanyDTO";

const API_COMPANY_URL = '/api/companies';

class CompanyAPI {
    async createCompany(companyDTO: CompanyDTO): Promise<CompanyDTO> {
        try {
            const response = await axios.post<CompanyDTO>(API_COMPANY_URL, companyDTO);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getCompanyById(id: number): Promise<CompanyDTO> {
        try {
            const response = await axios.get<CompanyDTO>(`${API_COMPANY_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new CompanyAPI();