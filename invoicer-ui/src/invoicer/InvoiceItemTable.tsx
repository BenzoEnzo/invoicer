import React from "react";
import {InvoiceItemDTO, InvoicePriceDTO} from "./model/InvoiceDTO";
import InvoiceItemRow from "./InvoiceItemRow";
import InvoiceSumRow from "./InvoiceSumRow";

interface InvoiceItemTableProps {
    invoiceItems: InvoiceItemDTO[],
    selectedInvoiceId: number | null,
    setSelectedInvoiceId: React.Dispatch<React.SetStateAction<number | null>>,
    invoicePrice: InvoicePriceDTO,
}

function InvoiceItemTable(props: InvoiceItemTableProps) {
    return (
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
            </tr>
            </thead>
            <tbody>
            {props.invoiceItems.map((item) => (
                <InvoiceItemRow
                    invoiceItem={item}
                    isSelected={false}
                    setSelectedInvoiceId={props.setSelectedInvoiceId}
                />
            ))}
            <InvoiceSumRow
                columnsNumber={10}
                netPrice={props.invoicePrice.netAmount as number}
                brutPrice={props.invoicePrice.brutAmount as number}
            />
            </tbody>
        </table>
    )
}

export default InvoiceItemTable;