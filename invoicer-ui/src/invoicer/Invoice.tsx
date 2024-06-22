import React, {useState} from 'react';
import '../shared/style/form.css';
import '../shared/style/container.css';
import '../shared/style/table.css';
import InvoicesTable from "./InvoicesTable";
import InvoiceForm from "./InvoiceForm";
import {InvoiceDTO} from "./model/InvoiceDTO";

function Invoice({sellerId} : {sellerId:number}) {
    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDTO | null>(null)

    return (
        <>
            <div>
                <h2>Faktury</h2>
            </div>
            <div className="main-container">
                <div className="additional-container">
                    <h3>Lista wystawionych faktur:</h3>
                    <InvoicesTable sellerId={sellerId} selectedInvoiceId={selectedInvoice?.id}
                                   setSelectedInvoice={setSelectedInvoice}/>
                    {selectedInvoice &&
                        <InvoiceForm invoice={selectedInvoice}/>
                    }
                </div>
            </div>
        </>
    );
}

export default Invoice;