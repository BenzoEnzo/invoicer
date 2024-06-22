import {InvoiceDTO} from "./model/InvoiceDTO";
import React, {useCallback} from "react";
import InvoiceItemTable from "./InvoiceItemTable";
import {formatDate} from "../shared/DateUtils";
import '../shared/style/temp.css'
import InvoiceAPI from "./service/InvoiceAPI";
import {toast} from "react-toastify";

interface InvoiceFormProps {
    invoice: InvoiceDTO
}

function InvoiceForm(props: InvoiceFormProps) {
    const printInvoice = useCallback(() => {
        InvoiceAPI.generateInvoice(props.invoice.id)
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `invoice_${props.invoice.id}.pdf`;
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => {
                toast.error("Nie udało się wydrukować faktury")
            });
    }, [props.invoice]);

    return (
        <>
            <div className="form-header">
                <h3>Faktura</h3>
                <div>
                    <button onClick={() => printInvoice()}>Drukuj fakturę</button>
                </div>
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
                <InvoiceItemTable
                    invoiceItems={props.invoice.invoiceItems ?? []}
                    invoicePrice={props.invoice.invoicePrice ?? {}}
                />
            </div>
        </>
    )
}

export default InvoiceForm;