import {InvoiceItemDTO} from "./model/InvoiceDTO";
import TaxRate from "../product/model/TaxRate";

export interface Price {
    netPrice: number;
    brutPrice: number;
}

export const countPrices = (invoiceItem: InvoiceItemDTO): Price => {
    let netPrice = 0, brutPrice = 0
    if (invoiceItem.partialPrice && invoiceItem.quantity) {
        const discount = invoiceItem.discount ?? 0;
        const partialPrice = invoiceItem.partialPrice * (1 - discount / 100);
        netPrice = partialPrice * invoiceItem.quantity;
        const taxRate: number = invoiceItem.archivalProduct?.taxRate ? TaxRate[invoiceItem.archivalProduct?.taxRate] as unknown as number : 0;
        const multiplier: number = taxRate / 100 + 1;
        brutPrice = partialPrice * multiplier * invoiceItem.quantity;
    }
    return {
        netPrice: netPrice,
        brutPrice: brutPrice
    }
};

export const countSum = (invoiceItems: InvoiceItemDTO[]): Price => {
    return invoiceItems
        .map((item) => countPrices(item))
        .reduce((sum, item) => {
            return {
                netPrice: sum.netPrice + item.netPrice,
                brutPrice: sum.brutPrice + item.brutPrice
            };
        }, { netPrice: 0, brutPrice: 0 });
};