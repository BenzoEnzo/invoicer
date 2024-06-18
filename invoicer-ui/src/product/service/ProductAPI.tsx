import axios from 'axios';
import { ProductDTO } from "../model/ProductDTO"; // Import ProductDTO

const API_PRODUCT_URL = '/api/products';

class ProductAPI {
    async createProduct(product: ProductDTO): Promise<ProductDTO> {
        try {
            const response = await axios.post<ProductDTO>(API_PRODUCT_URL, product);
            return response.data;
        } catch (error) {
            // More specific error handling (optional)
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                throw error;
            }
        }
    }

    async updateProduct(id: number, product: ProductDTO): Promise<ProductDTO> {
        try {
            const response = await axios.put<ProductDTO>(API_PRODUCT_URL + "/" + id, product);
            return response.data;
        } catch (error) {
            // More specific error handling (optional)
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${error.response.data}`);
            } else {
                throw error;
            }
        }
    }

    async getCompanyProducts(companyId: number): Promise<ProductDTO[]> {
        try {
            const response = await axios.get<ProductDTO[]>(`${API_PRODUCT_URL}/company/${companyId}`);
            return response.data;
        } catch (error) {
            throw new Error('Błąd podczas pobierania produktów firmy.');
        }
    }
}

export default new ProductAPI();