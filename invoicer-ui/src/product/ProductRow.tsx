import {ProductDTO} from "./model/ProductDTO";
import {Check2, Pen, Trash} from "react-bootstrap-icons";
import React, {useCallback} from "react";
import axios from "axios";
import ProductAPI from "./service/ProductAPI";
import {toast} from "react-toastify";

interface ProductRowProps{
    product: ProductDTO,
    updateProductToUpdate: (product: ProductDTO) => void,
    invalidateProducts: () => void
}

function ProductRow(props: ProductRowProps) {
    const deleteProduct = useCallback(() => {
        axios.delete(`/api/products/${props.product.id}`)
            .then(() => {
                toast.success("Usunięto produkt");
                props.invalidateProducts();
            })
            .catch(() => toast.error("Wystąpił błąd podczas próby usunięcia produktu!"))
    }, []);

    return (
        <tr key={props.product.id}>
            <td>{props.product.name}</td>
            <td>{props.product.symbol}</td>
            <td>{props.product.catalogNumber}</td>
            <td>{props.product.netPrice.toFixed(2)}</td>
            <td>{props.product.unit}</td>
            <td>{props.product.taxRate}%</td>
            <td>
                <button onClick={() => props.updateProductToUpdate(props.product)}>
                    <Pen className="ml-2"/>
                </button>
                <button onClick={() => deleteProduct()}>
                    <Trash className="ml-2"/>
                </button>
            </td>
        </tr>
    )
}

export default ProductRow;