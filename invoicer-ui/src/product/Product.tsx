import React, {useState} from 'react';
import {ProductDTO} from './model/ProductDTO';
import '../shared/style/table.css';
import '../shared/style/form.css';
import '../shared/style/alert.css';
import ProductsTable from "./ProductsTable";

function Product({ companyId }: { companyId: number }) {

    const [error, setError] = useState<string | null>(null);

    const [alert, setAlert] = useState(false);

    return (
        <div>
            <div>
                <h2>Produkty firmy</h2>
            </div>

            <div>
                {alert && (
                    <div className="alert alert-success" role="alert">
                        Dodano produkt:!
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <ProductsTable companyId={companyId} toEdit={true}/>
        </div>
    );
}

export default Product;