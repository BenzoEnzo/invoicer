import React from "react";
import {InvoiceItemDTO} from "./model/InvoiceDTO";
import InvoiceItemRow from "./InvoiceItemRow";

interface InvoiceItemTableProps {
    invoiceItems: InvoiceItemDTO[],
    selectedInvoiceId: number | null,
    setSelectedInvoiceId: React.Dispatch<React.SetStateAction<number | null>>
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
                <th>Do zapłaty</th>
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
            </tbody>
        </table>
    )
}

export default InvoiceItemTable;