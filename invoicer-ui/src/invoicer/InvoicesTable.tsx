import React, {useEffect, useState} from "react";
import {InvoiceDTO} from "./model/InvoiceDTO";
import InvoiceAPI from "./service/InvoiceAPI";
import {toast} from "react-toastify";

interface InvoicesTableProps {
    sellerId: number
    selectedInvoiceId: number | undefined,
    setSelectedInvoice: React.Dispatch<React.SetStateAction<InvoiceDTO | null>>
}

function InvoicesTable(props: InvoicesTableProps) {
    const [invoices, setInvoices] = useState<InvoiceDTO[]>([]);

    useEffect(() => {
        InvoiceAPI.getSellerInvoices(props.sellerId)
            .then((r) => setInvoices(r))
            .catch(() => toast.error("Nie udało się pobrać faktur"));
    },[])

    return (
        <table className="table">
            <thead>
            <tr>
                <th>Symbol</th>
                <th>Sprzedawca</th>
                <th>Klient</th>
                <th>Do zapłaty</th>
            </tr>
            </thead>
            <tbody>
            {invoices.map((invoice) => (
                <tr
                    key={invoice.id}
                    className={invoice.id === props.selectedInvoiceId ? 'selected-row' : ''}
                    onClick={() => props.setSelectedInvoice(invoice.id === props.selectedInvoiceId ? null : invoice)}
                >
                    <td>{invoice.symbol}</td>
                    <td>{invoice.seller?.name}</td>
                    <td>{invoice.customer?.name}</td>
                    <td>{invoice.invoicePrice?.netAmount?.toFixed(2)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default InvoicesTable;