import {InvoiceItemDTO} from "./model/InvoiceDTO";
import React, {useEffect, useState} from "react";
import {countPrices, Price} from "./InvoiceItemPriceUtils";

interface InvoiceItemRowProps {
    invoiceItem: InvoiceItemDTO
}

function InvoiceItemRow(props: InvoiceItemRowProps) {
    const [price, setPrice] = useState<Price>({ netPrice: 0, brutPrice: 0 })

    useEffect(() => {
        setPrice(countPrices(props.invoiceItem))
    },[props.invoiceItem])

    return (
        <tr>
            <td>{props.invoiceItem.archivalProduct?.name}</td>
            <td>{props.invoiceItem.archivalProduct?.symbol}</td>
            <td>{props.invoiceItem.archivalProduct?.catalogNumber}</td>
            <td>{props.invoiceItem.archivalProduct?.unit}</td>
            <td>{props.invoiceItem.archivalProduct?.taxRate}</td>
            <td>{props.invoiceItem.partialPrice}</td>
            <td>{props.invoiceItem.quantity}</td>
            <td>{props.invoiceItem.discount}</td>
            <td>{price.netPrice}</td>
            <td>{price.brutPrice}</td>
        </tr>
    )
}

export default InvoiceItemRow;