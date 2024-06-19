import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import Select, { SingleValue } from 'react-select';
import { CompanyDTO } from "../../company/model/CompanyDTO";
import {InvoiceDTO, InvoiceItemDTO} from "../model/InvoiceDTO";
import InvoiceAPI from "../service/InvoiceAPI";
import InvoiceItemTable from "../InvoiceItemTable";

interface CreateInvoiceFormProps {
    companyId: number;
}

function CreateInvoiceForm(props: CreateInvoiceFormProps) {
    const [formData, setFormData] = useState<InvoiceDTO>({ seller: {id: props.companyId} })
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItemDTO[]>([{}])

    const [companies, setCompanies] = useState<CompanyDTO[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<{ value: number; label: string } | null>(null);

    useEffect(() => {
        axios.get<CompanyDTO[]>("/api/companies")
            .then(response => setCompanies(response.data))
            .catch(error => console.error("Error fetching companies:", error));
    }, []);

    const handleCompanyChange = (selectedOption: SingleValue<{ value: number; label: string }>) => {
        setSelectedCompany(selectedOption);
    };

    const onChange = useCallback((e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
        console.log(formData);
    },[formData, setFormData])

    const onSubmit = useCallback((e) => {
        console.log(formData)
        InvoiceAPI.createInvoice({...formData, customer: { id: selectedCompany?.value }})
            .then(r => console.log(r));
     },[])

    return (
        <>
            <div>
                <h2>Tworzenie faktury</h2>
            </div>
            <div className="main-container">
                <form onSubmit={onSubmit}>
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
                            id="symbol"
                            value={formData.symbol}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <h3>Data wystawienia faktury:</h3>
                        <input
                            type="date"
                            id="saleDate"
                            name="saleDate"
                            value={formData.saleDate}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <h3>Data płatności:</h3>
                        <input
                            type="date"
                            id="paymentDate"
                            name="paymentDate"
                            value={formData.saleDate}
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit">Utwórz fakturę</button>
                    <InvoiceItemTable companyId={props.companyId} invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems}/>
                </form>
            </div>
        </>
    );
}

export default CreateInvoiceForm;