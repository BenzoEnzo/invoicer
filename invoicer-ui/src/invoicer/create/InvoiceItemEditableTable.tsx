import React, {useEffect, useState} from "react";
import {ProductDTO} from "../../product/model/ProductDTO";
import ProductAPI from "../../product/service/ProductAPI";
import InvoiceItemEditableRow from "./InvoiceItemEditableRow";
import {InvoiceItemDTO} from "../model/InvoiceDTO";
import {toast} from "react-toastify";
import InvoiceSumRow from "../InvoiceSumRow";
import {countSum, Price} from "../InvoiceItemPriceUtils";

interface InvoiceItemEditableTableProps{
  companyId: number;
  invoiceItems: InvoiceItemDTO[],
  setInvoiceItems: React.Dispatch<React.SetStateAction<InvoiceItemDTO[]>>;
}

function InvoiceItemEditableTable(props: InvoiceItemEditableTableProps) {
    const [products, setProducts] = useState<ProductDTO[]>([])
    const [sum, setSum] = useState<Price>({ netPrice: 0, brutPrice: 0 });

    useEffect(() => {
        setSum(countSum(props.invoiceItems));
    },[props.invoiceItems]);

    useEffect(() => {
        ProductAPI.getCompanyProducts(props.companyId)
            .then((r) => setProducts(r))
            .catch(() => toast.error("Nie udało się pobrać produktów"));
    },[])

    return (
        <>
            <table className="table">
            <thead>
            <tr>
                <th>Nazwa</th>
                <th>Symbol</th>
                <th>Numer katalogowy</th>
                <th>Jednostka</th>
                <th>Stawka VAT</th>
                <th>Cena netto</th>
                <th>Ilość</th>
                <th>Rabat</th>
                <th>Do zapłaty netto</th>
                <th>Do zapłaty brutto</th>
                <th>Akcje</th>
            </tr>
            </thead>
                <tbody>
            {props.invoiceItems.map((item) => (
                <>
                    <InvoiceItemEditableRow
                        item={item}
                        products={products}
                        setInvoiceItems={props.setInvoiceItems}
                        index={props.invoiceItems.indexOf(item)}
                    />
                </>
            ))}
            <InvoiceSumRow columnsNumber={10} netPrice={sum.netPrice} brutPrice={sum.brutPrice}/>
            </tbody>
            </table>
        </>
    )
}

export default InvoiceItemEditableTable;