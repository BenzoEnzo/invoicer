import React, {useEffect, useState} from "react";
import {ProductDTO} from "../product/model/ProductDTO";
import ProductAPI from "../product/service/ProductAPI";
import InvoiceItemEditableRow from "./create/InvoiceItemEditableRow";
import {InvoiceItemDTO} from "./model/InvoiceDTO";

interface InvoiceItemTableProps{
  companyId: number;
  invoiceItems: InvoiceItemDTO[],
  setInvoiceItems: React.Dispatch<React.SetStateAction<InvoiceItemDTO[]>>;
}

function InvoiceItemTable(props: InvoiceItemTableProps) {
    const [products, setProducts] = useState<ProductDTO[]>([])

    useEffect(() => {
        ProductAPI.getCompanyProducts(props.companyId).then((r) => setProducts(r));
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
                <th>Do zapłaty</th>
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
            </tbody>
            </table>
        </>
    )
}

export default InvoiceItemTable;