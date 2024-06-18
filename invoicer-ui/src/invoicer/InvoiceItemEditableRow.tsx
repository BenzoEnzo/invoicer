import {InvoiceItemDTO} from "./model/InvoiceDTO";
import {Trash} from "react-bootstrap-icons";
import React, {useCallback, useEffect, useState} from "react";
import {ProductDTO} from "../product/model/ProductDTO";
import ProductSelect from "./ProductSelect";

interface InvoiceItemEditableRowProps {
    products: ProductDTO[],
    item: InvoiceItemDTO,
    setInvoiceItems: React.Dispatch<React.SetStateAction<InvoiceItemDTO[]>>;
    index: number;
}

function InvoiceItemEditableRow(props: InvoiceItemEditableRowProps) {
    const [invoiceItem, setInvoiceItem] = useState(props.item)
    const [sumPrice, setSumPrice] = useState<number>()

    const updateProduct = useCallback((product: ProductDTO, isNew: boolean) => {
        let updatedItem: InvoiceItemDTO = {...invoiceItem};
        updatedItem.partialPrice = product.netPrice;
        updatedItem.product = product;
        if(isNew) {
            updatedItem.discount = 0;
            updatedItem.quantity = 1;
        }
        setInvoiceItem(updatedItem);
        props.setInvoiceItems((prevState) => {
            let copy = [...prevState];
            console.log("copy", copy)
            if (isNew) {
                copy.push({});
            }
            copy[props.index] = invoiceItem;
            console.log("copy2", copy)
            return copy;
        })
    }, [invoiceItem, setInvoiceItem, props.setInvoiceItems, props.index]);

    const onChange = useCallback((e) => {
        setInvoiceItem((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    },[invoiceItem, setInvoiceItem])

    useEffect(()=> {
        if (invoiceItem.partialPrice && invoiceItem.discount && invoiceItem.quantity) {
            setSumPrice(() => {
                if (invoiceItem.partialPrice && invoiceItem.discount && invoiceItem.quantity) {
                    return invoiceItem.partialPrice * (1-invoiceItem.discount/100) * invoiceItem.quantity
                }
                return 0;
            })
        }
    },[invoiceItem.partialPrice, invoiceItem.discount, invoiceItem.quantity])

    return (
        <tr>
            <ProductSelect products={props.products} updateProduct={updateProduct}/>
            <td>{invoiceItem.product?.unit}</td>
            <td>{invoiceItem.product?.taxRate}%</td>
            <td>
                <input
                    type="number"
                    name="partialPrice"
                    value={invoiceItem.partialPrice}
                    // onChange={handleProductInputChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    name="quantity"
                    value={invoiceItem.quantity}
                    min={1}
                    // onChange={handleProductInputChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    name="quantity"
                    value={invoiceItem.discount}
                    // onChange={handleProductInputChange}
                />
            </td>
            <td>
                <button onClick={() => {}}>
                    <Trash className="ml-2"/>
                </button>
            </td>
        </tr>
    )
}

export default InvoiceItemEditableRow;