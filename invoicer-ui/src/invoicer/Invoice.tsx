import React, { useEffect, useState } from 'react';
import '../shared/style/form.css';
import '../shared/style/container.css';
import '../shared/style/table.css';
import { CompanyDTO } from "../company/model/CompanyDTO";
import CompanyAPI from '../company/service/CompanyAPI';
import InvoiceAPI from '../invoicer/service/InvoiceAPI';
import { useSelectedProducts } from './service/SelectProductState';
import { InvoiceDTO, InvoiceItemDTO, InvoicePriceDTO } from './model/InvoiceDTO';
import { format } from 'date-fns';
import ProductAPI from "../product/service/ProductAPI";

function Invoice({sellerId} : {sellerId:number}) {
    const [customerId, setCustomerId] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [quantityProducts, setQuantityProducts] = useState<{ [key: number]: number }>({});
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
    const [quantityPrices, setQuantityPrices] = useState<number[]>(Array(selectedProducts.length).fill(0));
    const handleCustomerIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerId(event.target.value);
    };

    const handleQuantityChange = (id: number, value: string) => {
        setQuantityProducts(prevState => ({
            ...prevState,
            [id]: parseInt(value, 10) || 0
        }));

    };


    const handleCreateInvoice = async() => {

        const invoiceItems = selectedProducts.map((selectedItem, index) => {
            const quantity = quantityPrices[index]
            const invoiceItem: InvoiceItemDTO = {
                invoicePosition: index + 1,
                quantity: quantity,
                discount: 0,
                product: selectedItem
            };

            return invoiceItem;
        });
        try {
            const invoice: InvoiceDTO = {
                symbol: 'INV123',
                creationDate: new Date(),
                saleDate: new Date(),
                paymentDate: new Date(),
                seller: {
                    id: sellerId
                },
                customer: customer,
                invoicePrice: {
                    netAmount: 0,
                    vatAmount: 0,
                    brutAmount: 0,
                    invoiceItems: invoiceItems
                }
            };

            // Wywołanie funkcji createInvoice
            const createdInvoice = await InvoiceAPI.createInvoice(invoice);
            console.log('Stworzono fakturę:', createdInvoice);
            // Aktualizacja stanu faktur po stworzeniu nowej
            setInvoices((prevInvoices) => [...prevInvoices, createdInvoice]);
        } catch (error) {
            console.error('Error creating invoice:', error);
        }
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

    const handleQuantityPriceChange = (index: number, value: string) => {
        const newQuantityPrices = [...quantityPrices];
        newQuantityPrices[index] = parseInt(value, 10) || 0;
        setQuantityPrices(newQuantityPrices);
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
                const data = await InvoiceAPI.getSellerInvoices(sellerId);
                setInvoices(data);
            } catch (error) {
                setError('Nie udało się pobrać faktur.');
            }
        };
        fetchInvoices();
    }, [customerId, selectedProducts, quantityProducts]);

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
                                {selectedProducts.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.symbol}</td>
                                        <td>{product.catalogNumber}</td>
                                        <td>{product.netPrice.toFixed(2)}</td>
                                        <td>{product.unit}</td>
                                        <td>{product.taxRate}%</td>
                                        <td>
                                            <input
                                                type="text"
                                                id={`quantityPrice-${product.id}`}
                                                value={quantityPrices[index]}
                                                onChange={(e) => handleQuantityPriceChange(index, e.target.value)}
                                                required
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                    <div className="bottom-container">
                    <button type="submit" onClick={() => handleCreateInvoice()}>Generuj fakturę</button>
                    </div>

                </div>
                </div>
            </div>
        </>
    );
}

export default Invoice;