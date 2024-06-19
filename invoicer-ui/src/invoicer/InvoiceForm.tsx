import {InvoiceDTO} from "./model/InvoiceDTO";
import React from "react";

interface InvoiceFormProps {
    invoice: InvoiceDTO
}

function InvoiceForm(props: InvoiceFormProps) {

    return (
        <>
            <div>
                <h2>Faktura</h2>
            </div>
            <div className="main-container">
                <div className="form-group">
                    <label htmlFor="nip">Klient:</label>
                    <input type="string" id="customer" value={props.invoice.customer?.name} readOnly/>
                </div>
                <div className="form-group">
                    <label htmlFor="nip">Symbol:</label>
                    <input type="string" id="symbol" value={props.invoice.symbol} readOnly/>
                </div>
                <div className="form-group">
                    <label htmlFor="saleDate">Data wystawienia faktury:</label>
                    <input type="string" id="saleDate" value={props.invoice.saleDate} readOnly/>
                </div>
                <div className="form-group">
                    <label htmlFor="paymentDate">Data płatności:</label>
                    <input type="string" id="paymentDate" value={props.invoice.paymentDate} readOnly/>
                </div>
                {/*<InvoiceItemTable companyId={props.companyId} invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems}/>*/}
            </div>
        </>
    )
}

export default InvoiceForm;