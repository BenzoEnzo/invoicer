import React, {useEffect, useState} from 'react';
import '../shared/style/form.css';
import '../shared/style/container.css';
import '../shared/style/table.css';
import {CompanyDTO} from "../company/model/CompanyDTO";
import InvoiceAPI from '../invoicer/service/InvoiceAPI';
import {useSelectedProducts} from './service/SelectProductState';
import {InvoiceDTO, InvoiceItemDTO} from './model/InvoiceDTO';
import InvoicesTable from "./InvoicesTable";

function Invoice({sellerId} : {sellerId:number}) {
    const [quantityPrices, setQuantityPrices] = useState<number[]>(Array(selectedProducts.length).fill(0));

    const handleQuantityPriceChange = (index: number, value: string) => {
        const newQuantityPrices = [...quantityPrices];
        newQuantityPrices[index] = parseInt(value, 10) || 0;
        setQuantityPrices(newQuantityPrices);
    };

    const generateInvoice = async (invoiceId: number | undefined) => {
        try {
            const blob = await InvoiceAPI.generateInvoice(invoiceId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice_${invoiceId}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {

        }
    };

    return (
        <>
            <div>
                <h2>Faktury</h2>
            </div>
            <div className="main-container">
                <div className="additional-container">
                    <h3>Lista wystawionych faktur:</h3>
                    <InvoicesTable sellerId={sellerId}/>
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
                </div>
            </div>
        </>
    );
}

export default Invoice;