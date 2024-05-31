import axios from 'axios';
import {CompanyProductDTO} from "../model/CompanyProductDTO"

const API_PRODUCT_URL = '/api/products';

class ProductAPI {
    async createProduct(companyProductDTO: CompanyProductDTO): Promise<CompanyProductDTO> {
        try {
            const response = await axios.post<CompanyProductDTO>(API_PRODUCT_URL, companyProductDTO);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default new ProductAPI();