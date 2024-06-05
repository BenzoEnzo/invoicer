import './style/company-details.css';
import React, { useState } from 'react';
import '../shared/style/form.css';
import Product from "../product/Product";
import Invoice from "../invoicer/Invoice";
import {CompanyDTO} from "./model/CompanyDTO";
import { SelectedProductsProvider } from '../invoicer/service/SelectProductState'


function CompanyDetails({ companyDetailData, companyId }: { companyDetailData: CompanyDTO | null, companyId: number }){
    const [activeMenuItem, setActiveMenuItem] = useState('Dane');
    const [isLoading, setIsLoading] = useState(false);
    const handleMenuItemClick = (item: string) => {
        setActiveMenuItem(item);
    };
    return (
        <div className="company-details-container">
            <div className="menu">
                <div className={`menu-item ${activeMenuItem === 'Dane' ? 'active' : ''}`}
                     onClick={() => handleMenuItemClick('Dane')}>
                    Dane
                </div>
                <div className={`menu-item ${activeMenuItem === 'Produkty' ? 'active' : ''}`}
                     onClick={() => handleMenuItemClick('Produkty')}>
                    Produkty
                </div>
                <div className={`menu-item ${activeMenuItem === 'Faktury' ? 'active' : ''}`}
                     onClick={() => handleMenuItemClick('Faktury')}>
                   Faktury
                </div>
            </div>
                <div className="content">
                    <SelectedProductsProvider>
                    {activeMenuItem === 'Produkty' && <Product companyId={companyId}/>}
                    {activeMenuItem === 'Faktury' && <Invoice/> }
                    </SelectedProductsProvider>
                    {activeMenuItem === 'Dane' && companyDetailData != null && (
                        <>                   <h2>Dane prywatne</h2>
                        <div className="content">
                            <div className="input-form">
                                <div className="form-group">
                                    <label htmlFor="name">Nazwa:</label>
                                    <input type="text" id="name" value={companyDetailData.name} readOnly/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="shortName">Skrócona nazwa:</label>
                                    <input type="text" id="shortName" value={companyDetailData.shortName} readOnly/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">Adres:</label>
                                    <div className="address-group">
                                        <input type="text" id="street" value={companyDetailData.street} readOnly/>
                                        <input type="text" id="building" value={companyDetailData.building} readOnly/>
                                        {companyDetailData.apartment !== 0 && (
                                            <input type="text" id="apartment" value={companyDetailData.apartment}
                                                   readOnly/>
                                        )}
                                    </div>

                                    <div className="city-zip-group">
                                        <input type="text" id="zipCode" value={companyDetailData.zipCode} readOnly/>
                                        <input type="text" id="city" value={companyDetailData.city} readOnly/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="nip">NIP:</label>
                                    <input type="number" id="nip" value={companyDetailData.nip} readOnly/>
                                </div>
                            </div>

                        </div>
                        </>
                    )}
                </div>
            </div>
    );
}

export default CompanyDetails;