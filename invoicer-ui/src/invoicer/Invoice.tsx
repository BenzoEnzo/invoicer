import React, {useEffect, useState} from 'react';
import '../shared/style/form.css';
import '../shared/style/container.css';
import '../shared/style/table.css';
import {CompanyDTO} from "../company/model/CompanyDTO";
import CompanyAPI from '../company/service/CompanyAPI';
import { useSelectedProducts } from './service/SelectProductState';
function Invoice() {
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
            setError('Nie znaleziono takiego uzytkownika.');
        }
    };

    return (
        <>
            <div>
                <h2>Tworzenie faktury</h2>
            </div>

            <div className="main-container">
                <div className="additional-container">
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
                                    <th>Ilosc</th>
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
                            <button type="submit">Generuj fakture</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Invoice;