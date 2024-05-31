import axios from 'axios';
import {CompanyDTO} from "../model/CompanyDTO";
import {ProductDTO} from "../../product/model/ProductDTO"

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

    async getCompanyProducts(companyId: number): Promise<ProductDTO[]> {
        try {
            const response = await axios.get<ProductDTO[]>(`${API_COMPANY_URL}/${companyId}/products`);
            return response.data;
        } catch (error) {
            throw new Error('Błąd podczas pobierania produktów firmy.');
        }
    }
}

export default new CompanyAPI();