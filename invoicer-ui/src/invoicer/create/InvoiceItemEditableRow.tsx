import {InvoiceItemDTO} from "../model/InvoiceDTO";
import {Trash} from "react-bootstrap-icons";
import React, {useCallback, useEffect, useState} from "react";
import {ProductDTO} from "../../product/model/ProductDTO";
import ProductSelect from "../ProductSelect";
import {isNullOrUndefined} from "node:util";
import invoice from "../Invoice";
import {handleInputChange} from "react-select/dist/declarations/src/utils";

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
            product: product,
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
            copy[props.index] = invoiceItem;
            return copy;
        })
    }, [invoiceItem, setInvoiceItem, props.setInvoiceItems, props.index]);

    useEffect(()=> {
        if (invoiceItem.partialPrice && invoiceItem.discount && invoiceItem.quantity) {
            setSumPrice(() => {
                console.log(invoiceItem.partialPrice);
                console.log(invoiceItem.quantity);
                console.log(invoiceItem.discount !== null && invoiceItem.discount !== undefined);
                if (invoiceItem.partialPrice && invoiceItem.quantity && invoiceItem.discount !== null && invoiceItem.discount !== undefined) {
                    return invoiceItem.partialPrice * (1-invoiceItem.discount/100) * invoiceItem.quantity
                }
                return 0;
            })
        }
    },[invoiceItem.partialPrice, invoiceItem.discount, invoiceItem.quantity])

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInvoiceItem((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    },[invoiceItem, setInvoiceItem])

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
                    // onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    name="quantity"
                    value={invoiceItem.quantity}
                    min={1}
                    // onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    name="quantity"
                    value={invoiceItem.discount}
                    // onChange={handleInputChange}
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