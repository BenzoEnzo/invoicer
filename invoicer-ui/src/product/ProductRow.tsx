import {ProductDTO} from "./model/ProductDTO";
import {Check2, Pen, Trash} from "react-bootstrap-icons";
import React from "react";

interface ProductRowProps{
    product: ProductDTO,
    updateProductToUpdate: (product: ProductDTO) => void,
}

function ProductRow(props: ProductRowProps) {
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
                <button onClick={() => {}}>
                    <Trash className="ml-2"/>
                </button>
            </td>
        </tr>
    )
}

export default ProductRow;