import {PlusCircle} from "react-bootstrap-icons";
import Unit from "./model/Unit";
import TaxRate from "./model/TaxRate";
import React, {useCallback, useEffect, useState} from "react";
import {ProductDTO} from "./model/ProductDTO";
import ProductRow from "./ProductRow";
import ProductAPI from "./service/ProductAPI";
import ProductEditRow from "./ProductEditRow";

interface ProductsTableProps {
    companyId: number,
    toEdit: boolean
}

function ProductsTable(props: ProductsTableProps) {
    const [creationMode, setCreationMode] = useState(false);

    const emptyProduct: ProductDTO = {
        name: '',
        symbol: '',
        catalogNumber: 0,
        netPrice: 0,
        unit: Unit.CENTIMETER,
        taxRate: TaxRate.TAX_RATE_23,
        companyInfo: { id: props.companyId }
    };

    const [newProduct, setNewProduct] = useState<ProductDTO>(emptyProduct);

    const [productToEdit, setProductToEdit] = useState<ProductDTO>(emptyProduct)

    const [products, setProducts] = useState<ProductDTO[]>([]);

    const resetNewProduct = useCallback(() => {
        setNewProduct(emptyProduct);
        setCreationMode(false);
    }, [setNewProduct, emptyProduct]);

    const resetProductToEdit = useCallback(() => {
        setProductToEdit(emptyProduct);
    },[setProductToEdit, emptyProduct]);

    const updateCreationMode = useCallback((state: boolean) => {
        setCreationMode(state);
        if (state) {
            resetProductToEdit();
        } else{
            resetNewProduct();
        }
    }, [setCreationMode, resetProductToEdit]);

    const updateProductToUpdate = useCallback((product: ProductDTO) => {
        setProductToEdit(product);
        updateCreationMode(false);
    },[])

    useEffect(() => {
        fetchProducts();
    }, [props.companyId])

    function fetchProducts() {
        ProductAPI.getCompanyProducts(props.companyId)
            .then(fetchedProducts => setProducts(fetchedProducts))
            .catch(() => setProducts([]));
    }

    return (
        <>
        <button onClick={() => updateCreationMode(!creationMode)}>Dodaj produkt <PlusCircle className="ml-2"/></button>
            <table className="table">
                <thead>
                <tr>
                <th>Nazwa</th>
                        <th>Symbol</th>
                        <th>Numer katalogowy</th>
                        <th>Cena netto</th>
                        <th>Jednostka</th>
                        <th>Stawka VAT</th>
                        <th>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(creationMode && !productToEdit.id) && (
                        <ProductEditRow
                            product={newProduct}
                            setProduct={setNewProduct}
                            updateProducts={setProducts}
                            resetProduct={resetNewProduct}/>
                    )}
                    {products.map((product) => (
                        <>
                            {productToEdit && product.id === productToEdit.id ? (
                                <ProductEditRow
                                    product={productToEdit}
                                    setProduct={setProductToEdit}
                                    updateProducts={setProducts}
                                    resetProduct={resetProductToEdit}
                                    invalidateProducts={fetchProducts}
                                />
                            ) : (
                                <ProductRow
                                    product={product}
                                    updateProductToUpdate={updateProductToUpdate}
                                    invalidateProducts={fetchProducts}
                                />
                            )}
                        </>
                    ))}
                    </tbody>
                </table>
        </>
    );
}

export default ProductsTable;