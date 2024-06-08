import {CompanyDTO} from "../../company/model/CompanyDTO";
import {ProductDTO} from "../../product/model/ProductDTO";
import {EntityDTO} from "../../shared/model/EntityDTO";

export interface InvoiceDTO extends EntityDTO {
    symbol?: string;
    creationDate?: Date;
    saleDate?: Date;
    paymentDate?: Date;
    seller?: CompanyDTO;
    customer?: CompanyDTO;
    invoicePrice?: InvoicePriceDTO;
}

export interface InvoiceItemDTO extends EntityDTO {
    invoicePosition?: number;
    quantity?: number;
    discount?: number;
    product?: ProductDTO;
    partialPrice?: number;
}

export interface InvoicePriceDTO extends EntityDTO {
    netAmount?: number;
    vatAmount?: number;
    brutAmount?: number;
    invoiceItems?: InvoiceItemDTO[];
}