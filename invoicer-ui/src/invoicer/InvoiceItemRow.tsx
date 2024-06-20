import {InvoiceItemDTO} from "./model/InvoiceDTO";
import React from "react";

interface InvoiceItemRowProps {
    invoiceItem: InvoiceItemDTO,
    isSelected: boolean,
    setSelectedInvoiceId: React.Dispatch<React.SetStateAction<number | null>>
}

function InvoiceItemRow(props: InvoiceItemRowProps) {
    return (
        <tr>
            <td>{props.invoiceItem.archivalProduct?.name}</td>
            <td>{props.invoiceItem.archivalProduct?.symbol}</td>
            <td>{props.invoiceItem.archivalProduct?.catalogNumber}</td>
            <td>{props.invoiceItem.archivalProduct?.unit}</td>
            <td>{props.invoiceItem.archivalProduct?.taxRate}</td>
            <td>{props.invoiceItem.quantity}</td>
            <td>{props.invoiceItem.discount}</td>
            <td>0</td>
        </tr>
    )
}

export default InvoiceItemRow;