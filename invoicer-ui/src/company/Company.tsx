import React, { useState } from 'react';
import CompanyAPI from './service/CompanyAPI';
import CompanyDetails from './CompanyDetails';
import { CompanyDTO } from './model/CompanyDTO';
import './style/company.css';
import '../shared/style/form.css';

function Company() {
    const [formData, setFormData] = useState<CompanyDTO>({
        name: '',
        shortName: '',
        street: '',
        building: 0,
        apartment: 0,
        zipCode: '',
        city: '',
        nip: 0,
    });

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [fetchInfo, setFetchInfo] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAccessForm, setShowAccessForm] = useState(false);
    const [accessCompanyId, setAccessCompanyId] = useState('');
    const [companyInfo, setCompanyInfo] = useState<CompanyDTO | null>(null);
    const handleGetAccessClick = () => {
        setShowAccessForm(true);
    };

    const handleRegisterCompanyClick = () => {
        setShowAccessForm(false);
    };

    const handleAccessCompanyIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccessCompanyId(event.target.value);
    };

    const handleAccessSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const data = await CompanyAPI.getCompanyById(parseInt(accessCompanyId, 10));
            setShowAccessForm(false);
            setFetchInfo(true);
            setCompanyInfo(data);
        } catch (error) {
            setError('Wystąpił błąd podczas pobierania danych firmy.');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        try {
            await CompanyAPI.createCompany(formData);
            setRegistrationSuccess(true);
        } catch (error) {
            setError('Wystąpił błąd podczas rejestracji firmy.');
        }
    };

    return (
        <>

        {fetchInfo && (
                <CompanyDetails companyDetailData={companyInfo} companyId={Number(accessCompanyId)}/>
        )}

    <div className="company-container">
            {!fetchInfo && (
                    <div className="form-buttons">
                        <button onClick={handleRegisterCompanyClick} disabled={!showAccessForm}>
                            Zarejestruj firmę
                        </button>
                        <button onClick={handleGetAccessClick} disabled={showAccessForm}>
                            Uzyskaj dostęp
                        </button>
                    </div>
            )}

            {!fetchInfo && showAccessForm ? (
                <div className="input-form">
                    <form onSubmit={handleAccessSubmit}>
                        <div>
                            <label htmlFor="accessCompanyId">ID firmy:</label>
                            <input
                                type="number"
                                id="accessCompanyId"
                                value={accessCompanyId}
                                onChange={handleAccessCompanyIdChange}
                                required
                            />
                        </div>
                        <button type="submit">OK</button>
                    </form>
                </div>
            ) : !fetchInfo && (
                <div className="input-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Nazwa:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="shortName">Skrócona nazwa:</label>
                            <input type="text" id="shortName" name="shortName" value={formData.shortName}
                                   onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="street">Ulica:</label>
                            <input type="text" id="street" name="street" value={formData.street} onChange={handleChange}
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="building">Numer budynku:</label>
                            <input type="number" id="building" name="building" value={formData.building}
                                   onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="apartment">Numer lokalu:</label>
                            <input type="number" id="apartment" name="apartment" value={formData.apartment}
                                   onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="zipCode">Kod pocztowy:</label>
                            <input type="text" id="zipCode" name="zipCode" value={formData.zipCode}
                                   onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="city">Miasto:</label>
                            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange}
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="nip">NIP:</label>
                            <input type="number" id="nip" name="nip" value={formData.nip} onChange={handleChange}
                                   required/>
                        </div>
                        <button type="submit">Zarejestruj firmę</button>
                    </form>
                </div>
            )}

            {registrationSuccess && !error && <p style={{color: 'green'}}>Firma została pomyślnie zarejestrowana!</p>}
            {!fetchInfo && error && <p style={{color: 'red'}}>{error}</p>}
        </div>
        </>

    );
}

export default Company;