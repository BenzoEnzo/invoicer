import axios from 'axios';
import { CompanyProductDTO } from "../model/CompanyProductDTO";
import { ProductDTO } from "../model/ProductDTO"; // Import ProductDTO

const API_PRODUCT_URL = '/api/products';

class ProductAPI {
    async createProduct(product: CompanyProductDTO): Promise<ProductDTO> {
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
}

export default new ProductAPI();