import TaxRate from "./TaxRate";
import Unit from "./Unit";

export interface ProductDTO {
    id: number;
    name: string;
    symbol: string;
    catalogNumber: number;
    netPrice: number;
    unit: Unit;
    taxRate: TaxRate;
}