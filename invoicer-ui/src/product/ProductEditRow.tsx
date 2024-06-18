import {ProductDTO} from "./model/ProductDTO";
import {ArrowReturnLeft, Check2, Grid, Pen, Trash, XLg} from "react-bootstrap-icons";
import React, {useCallback} from "react";
import Unit from "./model/Unit";
import TaxRate from "./model/TaxRate";
import ProductAPI from "./service/ProductAPI";
import {toast} from "react-toastify";

interface ProductEditRowProps{
    product: ProductDTO,
    setProduct: React.Dispatch<React.SetStateAction<ProductDTO>>,
    updateProducts: React.Dispatch<React.SetStateAction<ProductDTO[]>>,
    resetProduct: () => void,
    invalidateProducts?: () => void
}

function ProductEditRow(props: ProductEditRowProps) {
    const handleProductInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        props.setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === "catalogNumber" || name === "netPrice"
                ? parseFloat(value as string)
                : name === "taxRate"
                    ? value as keyof typeof TaxRate
                    : value,
        } as ProductDTO));
        console.log("set", props.product)
    };

    const onSubmit = useCallback(() => {
        if(props.product.id) {
            ProductAPI.updateProduct(props.product.id, props.product)
                .then(updatedProduct => {
                    props.updateProducts(prevProducts => prevProducts.map(productToUpdate => {
                        if (productToUpdate.id === props.product.id) {
                            return updatedProduct;
                        }
                        return productToUpdate
                    }));
                    toast.success("Zaktualizowano produkt!");
                })
                .catch(() => toast.error("Nie udało się zaktualizować produktu!"));
        } else {
            ProductAPI.createProduct(props.product)
                .then(createdProduct => {
                    props.updateProducts(prevProducts => [...prevProducts, createdProduct]);
                    toast.success("Utworzono nowy produkt")
                })
                .catch(() => toast.error("Nie udało się utworzyć produktu!"));
        }
        props.resetProduct();
    }, [props.product]);

    const onReject = useCallback(() => {
        if(props.product.id && props.invalidateProducts) {
            props.invalidateProducts();
        }
        props.resetProduct();
    }, [props.product.id, props.resetProduct]);

    return (
        <tr>
            <td>
                <input
                    type="text"
                    name="name"
                    value={props.product.name}
                    onChange={handleProductInputChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="symbol"
                    value={props.product.symbol}
                    onChange={handleProductInputChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="catalogNumber"
                    value={props.product.catalogNumber}
                    onChange={handleProductInputChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    name="netPrice"
                    value={props.product.netPrice}
                    onChange={handleProductInputChange}
                />
            </td>
            <td>
                <select name="unit" value={props.product.unit} onChange={handleProductInputChange}>
                    {Object.values(Unit).map((unit) => (
                        <option key={unit} value={unit}>{unit}</option>
                    ))}
                </select>
            </td>
            <td>
                <select name="taxRate" value={props.product.taxRate} onChange={handleProductInputChange}>
                    {Object.keys(TaxRate)
                        .filter((key) => isNaN(Number(key)))
                        .map((key) => (
                            <option key={key} value={key}>
                                {TaxRate[key as keyof typeof TaxRate]}%
                            </option>
                        ))}
                </select>
            </td>
            <td>
                <button onClick={onSubmit}>
                    <Check2 className="ml-2"/>
                </button>
                <button onClick={onReject}>
                    <XLg className="ml-2"/>
                </button>
            </td>
        </tr>
    )
}

export default ProductEditRow;