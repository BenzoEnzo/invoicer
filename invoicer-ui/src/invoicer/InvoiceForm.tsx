import {InvoiceDTO} from "./model/InvoiceDTO";
import React, {useState} from "react";
import InvoiceItemTable from "./InvoiceItemTable";
import {formatDate} from "../shared/DateUtils";
import '../shared/style/temp.css'

interface InvoiceFormProps {
    invoice: InvoiceDTO
}

function InvoiceForm(props: InvoiceFormProps) {
    const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);

    return (
        <>
            <div>
                <h3>Faktura</h3>
            </div>
            <div className="main-container">
                <div className="field">
                    <label htmlFor="nip">Klient:</label>
                    <input type="string" id="customer" value={props.invoice.customer?.name} readOnly/>
                </div>
                <div className="field">
                    <label htmlFor="nip">Symbol:</label>
                    <input type="string" id="symbol" value={props.invoice.symbol} readOnly/>
                </div>
                <div className="field">
                    <label htmlFor="saleDate">Data wystawienia faktury:</label>
                    <input type="date" id="saleDate" value={formatDate(props.invoice.saleDate ?? "")} readOnly/>
                </div>
                <div className="field">
                    <label htmlFor="paymentDate">Data płatności:</label>
                    <input type="date" id="paymentDate" value={formatDate(props.invoice.paymentDate ?? "")} readOnly/>
                </div>
                <InvoiceItemTable invoiceItems={props.invoice.invoiceItems ?? []} selectedInvoiceId={selectedInvoiceId} setSelectedInvoiceId={setSelectedInvoiceId}/>
            </div>
        </>
    )
}

export default InvoiceForm;