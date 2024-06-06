import React, { useEffect, useState } from 'react';
import '../shared/style/form.css';
import '../shared/style/container.css';
import '../shared/style/table.css';
import { CompanyDTO } from "../company/model/CompanyDTO";
import CompanyAPI from '../company/service/CompanyAPI';
import InvoiceAPI from '../invoicer/service/InvoiceAPI';
import { useSelectedProducts } from './service/SelectProductState';
import { InvoiceDTO } from './model/InvoiceDTO';
import { format } from 'date-fns';
import ProductAPI from "../product/service/ProductAPI";

function Invoice() {
    const formatDate = (date:any) => {
        return date ? format(new Date(date), 'yyyy-MM-dd') : 'N/A';
    };
    const [customerId, setCustomerId] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [customer, setCustomer] = useState<CompanyDTO>({
        name: '',
        shortName: '',
        street: '',
        building: 0,
        apartment: 0,
        zipCode: '',
        city: '',
        nip: 0,
    });
    const [invoices, setInvoices] = useState<InvoiceDTO[]>([]);
    const { selectedProducts } = useSelectedProducts();

    const handleCustomerIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerId(event.target.value);
    };

    const handleCustomerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = await CompanyAPI.getCompanyById(parseInt(customerId, 10));
            setCustomer(data);
        } catch (error) {
            setError('Nie znaleziono takiego użytkownika.');
        }
    };

    const handleCreateInvoice = async () => {
        try {
            const createdProduct = await InvoiceAPI.createInvoice({
                id: companyId,
                name: '',
                companyProduct: newProduct,
            });
        } catch (error) {
            console.error('Error creating invoice:', error);
        }
    };

    const generateInvoice = async (invoiceId: number | undefined) => {
        setError(null);
        try {
            const blob = await InvoiceAPI.generateInvoice(invoiceId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice_${invoiceId}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            setError('Błąd generowania faktury');
        }
    };

    useEffect(() => {
        const fetchInvoices = async () => {
            setError(null);
            try {
                const data = await InvoiceAPI.getSellerInvoices(1);
                setInvoices(data);
            } catch (error) {
                setError('Nie udało się pobrać faktur.');
            }
        };

        fetchInvoices();
    }, [customerId]);

    return (
        <>
            <div>
                <h2>Tworzenie faktury</h2>
            </div>

            <div className="main-container">

                <div className="additional-container">
                    <div className="little-container">
                        <form onSubmit={handleCustomerSubmit}>
                            <div className="input-form">
                                <h3>Dla kogo:</h3>
                                <input
                                    type="number"
                                    id="customerId"
                                    value={customerId}
                                    onChange={handleCustomerIdChange}
                                    required
                                />
                                <button type="submit">OK</button>
                            </div>
                        </form>
                    </div>
                    <div className="little-container">
                        <h3>Lista wystawionych faktur:</h3>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Sprzedawca</th>
                                <th>Klient</th>
                                <th>Kwota netto</th>
                                <th>Kwota VAT</th>
                                <th>Kwota brutto</th>
                                <th>Widok</th>
                            </tr>
                            </thead>
                            <tbody>
                            {invoices.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td>{invoice.symbol}</td>
                                    <td>{invoice.seller?.name}</td>
                                    <td>{invoice.customer?.name}</td>
                                    <td>{invoice.invoicePrice?.netAmount?.toFixed(2)}</td>
                                    <td>{invoice.invoicePrice?.vatAmount?.toFixed(2)}</td>
                                    <td>{invoice.invoicePrice?.brutAmount?.toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => generateInvoice(invoice.id)}>Pobierz</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="additional-container">
                <div className="content-container">
                        <div className="head-container">
                            <center><h2>{customer.name}</h2></center>
                        </div>

                        <div className="middle-container">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Nazwa</th>
                                    <th>Symbol</th>
                                    <th>Numer katalogowy</th>
                                    <th>Cena netto</th>
                                    <th>Jednostka</th>
                                    <th>Stawka VAT</th>
                                    <th>Ilość</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.symbol}</td>
                                        <td>{product.catalogNumber}</td>
                                        <td>{product.netPrice.toFixed(2)}</td>
                                        <td>{product.unit}</td>
                                        <td>{product.taxRate}%</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="bottom-container">
                            <button type="submit">Generuj fakturę</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Invoice;