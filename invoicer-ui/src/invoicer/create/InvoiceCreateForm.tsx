import React, {useEffect, useState} from "react";
import axios from "axios";
import Select, {SingleValue} from 'react-select';
import {CompanyDTO} from "../../company/model/CompanyDTO";
import {InvoiceDTO, InvoiceItemDTO} from "../model/InvoiceDTO";
import InvoiceItemEditableTable from "./InvoiceItemEditableTable";
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";

interface InvoiceCreateFormProps {
    companyId: number;
}

function InvoiceCreateForm(props: InvoiceCreateFormProps) {
    const { register, handleSubmit } = useForm<InvoiceDTO>();
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItemDTO[]>([{}])

    const [companies, setCompanies] = useState<CompanyDTO[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<{ value: number; label: string } | null>(null);

    useEffect(() => {
        axios.get<CompanyDTO[]>("/api/companies")
            .then(response => setCompanies(response.data))
            .catch(() => toast.error("Nie udało się pobrać klientów"));
    }, []);

    const handleCompanyChange = (selectedOption: SingleValue<{ value: number; label: string }>) => {
        setSelectedCompany(selectedOption);
    };

    const onSubmit: SubmitHandler<InvoiceDTO> = ((data, event) => {
        event?.preventDefault();
        axios.post<InvoiceDTO>('/api/invoices', {
            ...data,
            seller: {id: props.companyId },
            customer: { id: selectedCompany?.value },
            invoiceItems: invoiceItems.filter(item => Object.keys(item).length !== 0)
        })
            .then((r) => console.log(r.data))
            .catch(() => {});
    });

    return (
        <>
            <div>
                <h2>Tworzenie faktury</h2>
            </div>
            <div className="main-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Select
                        value={selectedCompany}
                        onChange={handleCompanyChange}
                        options={companies.map(company => ({value: company.id!, label: company.name!}))}
                        isClearable
                        isSearchable
                        placeholder="Select a company"
                    />
                    <div>
                        <h3>Symbol faktury:</h3>
                        <input
                            type="string"
                            {...register("symbol")}
                            id="symbol"
                            required
                        />
                    </div>
                    <div>
                        <h3>Data wystawienia faktury:</h3>
                        <input
                            type="date"
                            {...register("saleDate")}
                            id="saleDate"
                            required
                        />
                    </div>
                    <div>
                        <h3>Data płatności:</h3>
                        <input
                            type="date"
                            {...register("paymentDate")}
                            id="paymentDate"
                            required
                        />
                    </div>
                    <button type="submit">Utwórz fakturę</button>
                    <InvoiceItemEditableTable companyId={props.companyId} invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems}/>
                </form>
            </div>
        </>
    );
}

export default InvoiceCreateForm;