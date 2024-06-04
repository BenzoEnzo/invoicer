import React, {useEffect, useState} from 'react';
import CompanyAPI from '../company/service/CompanyAPI';
import {ProductDTO} from './model/ProductDTO';
import '../shared/style/table.css';
import '../shared/style/form.css';
import '../shared/style/alert.css';
import {Check2, PlusCircle, Trash} from "react-bootstrap-icons";
import ProductAPI from "./service/ProductAPI";
import Unit from "./model/Unit";
import TaxRate from "./model/TaxRate";


function Product({ companyId }: { companyId: number }) {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [alert, setAlert] = useState(false);
    const [newProduct, setNewProduct] = useState<ProductDTO>({
        name: '',
        symbol: '',
        catalogNumber: 0,
        netPrice: 0,
        unit: Unit.CENTIMETER,
        taxRate: TaxRate.TAX_RATE_23,
    });


    const handleProductInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;


        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]:
                name === "catalogNumber" || name === "netPrice"
                    ? parseFloat(value as string)
                    : value,
        }));
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await CompanyAPI.getCompanyProducts(companyId);
                setProducts(data);
            } catch (err) {
                setError('Wystąpił błąd podczas pobierania produktów.');
            }
        };

        fetchProducts();
    }, [companyId]);

    const isEditingMode = () => {
        setEditMode(true);
    };


    const handleAddProduct = async () => {
        try {
            const createdProduct = await ProductAPI.createProduct({
                id: companyId, // Pass companyId from the Product component's props
                name: '',
                companyProduct: newProduct,
            })
            setProducts(prevProducts => [...prevProducts, createdProduct.companyProduct]);
            setAlert(true);
            setEditMode(false);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div>

            <div><h2>Produkty firmy</h2>
             <button onClick={isEditingMode}>Dodaj produkt <PlusCircle className="ml-2" /></button>
            </div>

            <div>
                {alert && (
                    <div className="alert alert-success" role="alert">
                        Dodano produkt !
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>



            <table className="table"> {/* Use the 'table' class */}
                <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Symbol</th>
                    <th>Numer katalogowy</th>
                    <th>Cena netto</th>
                    <th>Jednostka</th>
                    <th>Stawka VAT</th>
                    <th>Akcja</th>
                </tr>
                </thead>
                <tbody>
                {editMode && (
                    <tr>
                        <td><input type="text" name="name" value={newProduct.name}
                                   onChange={handleProductInputChange}/></td>
                        <td><input type="text" name="symbol" value={newProduct.symbol}
                                   onChange={handleProductInputChange}/></td>
                        <td><input type="text" name="catalogNumber" value={newProduct.catalogNumber}
                                   onChange={handleProductInputChange}/></td>
                        <td><input type="number" name="netPrice" value={newProduct.netPrice}
                                   onChange={handleProductInputChange}/></td>
                        <td>
                            <select
                                name="unit"
                                value={newProduct.unit}
                                onChange={handleProductInputChange}
                            >
                                {Object.values(Unit).map((unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <select
                                name="taxRate"
                                value={newProduct.taxRate}
                                onChange={handleProductInputChange}
                            >
                                {Object.values(TaxRate).map((taxRate) => (
                                    <option key={taxRate} value={taxRate}>
                                        {taxRate}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <button onClick={handleAddProduct}>
                                <Check2 className="ml-2"/>
                            </button>
                        </td>
                    </tr>
                )}
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.symbol}</td>
                        <td>{product.catalogNumber}</td>
                        <td>{product.netPrice.toFixed(2)}</td>
                        <td>{product.unit}</td>
                        <td>{product.taxRate}%</td>
                        <td><Trash className="ml-2"/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Product;