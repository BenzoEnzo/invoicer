import {InvoiceItemDTO} from "../model/InvoiceDTO";
import {Trash} from "react-bootstrap-icons";
import React, {useCallback, useEffect, useState} from "react";
import {ProductDTO} from "../../product/model/ProductDTO";
import ProductSelect from "./ProductSelect";

interface InvoiceItemEditableRowProps {
    products: ProductDTO[],
    item: InvoiceItemDTO,
    setInvoiceItems: React.Dispatch<React.SetStateAction<InvoiceItemDTO[]>>;
    index: number;
}

function InvoiceItemEditableRow(props: InvoiceItemEditableRowProps) {
    const [invoiceItem, setInvoiceItem] = useState(props.item)
    const [sumPrice, setSumPrice] = useState<number>(0)

    const updateProduct = useCallback((product: ProductDTO, isNew: boolean) => {
        let updatedItem: InvoiceItemDTO = {
            ...invoiceItem,
            partialPrice: product.netPrice,
            archivalProduct: product,
        };
        if(isNew) {
            updatedItem.discount = 0;
            updatedItem.quantity = 1;
        }
        setInvoiceItem(updatedItem);
        props.setInvoiceItems((prevState) => {
            let copy = [...prevState];
            if (isNew) {
                copy.push({});
            }
            copy[props.index] = updatedItem;
            return copy;
        })
    }, [invoiceItem, setInvoiceItem, props.setInvoiceItems, props.index]);

    useEffect(() => {
        if (invoiceItem.partialPrice && invoiceItem.quantity) {
            const discount = invoiceItem.discount ?? 0;
            setSumPrice(invoiceItem.partialPrice * (1 - discount / 100) * invoiceItem.quantity);
        }
    }, [invoiceItem]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedItem = {
            ...invoiceItem,
            [name]: value
        }
        setInvoiceItem(updatedItem);
        props.setInvoiceItems((prevState) => {
            let copy = [...prevState];
            copy[props.index] = updatedItem;
            return copy;
        })
    }, [invoiceItem, setInvoiceItem, props.item]);

    return (
        <tr>
            <ProductSelect products={props.products} updateProduct={updateProduct}/>
            <td>{invoiceItem.archivalProduct?.unit}</td>
            <td>{invoiceItem.archivalProduct?.taxRate}%</td>
            <td>
                <input
                    type="number"
                    name="partialPrice"
                    value={invoiceItem.partialPrice}
                    onChange={onChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    name="quantity"
                    value={invoiceItem.quantity}
                    min={1}
                    onChange={onChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    name="discount"
                    value={invoiceItem.discount}
                    onChange={onChange}
                    min={0}
                    max={99}
                />
            </td>
            <td>{sumPrice}</td>
            <td>
                <button onClick={() => {}}>
                    <Trash className="ml-2"/>
                </button>
            </td>
        </tr>
    )
}

export default InvoiceItemEditableRow;