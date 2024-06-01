import { ProductDTO } from './ProductDTO';

export interface CompanyProductDTO {
    id: number;
    name: string;
    companyProduct: ProductDTO;
}