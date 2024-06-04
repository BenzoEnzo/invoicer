import React, {useEffect, useState} from 'react';
import '../shared/style/form.css';
import '../shared/style/container.css';
import {CompanyDTO} from "../company/model/CompanyDTO";
import CompanyAPI from '../company/service/CompanyAPI';
function Invoice(){
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
                </div>
            </div>
        </div>

        <div className="main-container">

        </div>
        </>
    );
}

export default Invoice;