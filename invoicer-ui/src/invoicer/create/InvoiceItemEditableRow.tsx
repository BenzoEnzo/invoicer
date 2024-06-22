import {InvoiceItemDTO} from "../model/InvoiceDTO";
import {Trash} from "react-bootstrap-icons";
import React, {useCallback, useEffect, useState} from "react";
import {ProductDTO} from "../../product/model/ProductDTO";
import ProductSelect from "./ProductSelect";
import {countPrices, Price} from "../InvoiceItemPriceUtils";

interface InvoiceItemEditableRowProps {
    products: ProductDTO[],
    item: InvoiceItemDTO,
    setInvoiceItems: React.Dispatch<React.SetStateAction<InvoiceItemDTO[]>>;
    index: number;
}

function InvoiceItemEditableRow(props: InvoiceItemEditableRowProps) {
    const [invoiceItem, setInvoiceItem] = useState(props.item)
    const [price, setPrice] = useState<Price | null>(null)

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

    const removeItem = useCallback(() => {
        props.setInvoiceItems((prevState) => {
            let copy = [...prevState];
            delete copy[props.index];
            return copy;
        })
    }, [invoiceItem, props.setInvoiceItems]);

    useEffect(() => {
        if (invoiceItem.archivalProduct){
            setPrice(countPrices(props.item))
        }
    },[props.item])

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
            <td>{price?.netPrice}</td>
            <td>{price?.brutPrice}</td>
            <td>
                {invoiceItem.archivalProduct &&
                    <button onClick={() => removeItem()}>
                        <Trash className="ml-2"/>
                    </button>
                }
            </td>
        </tr>
    )
}

export default InvoiceItemEditableRow;