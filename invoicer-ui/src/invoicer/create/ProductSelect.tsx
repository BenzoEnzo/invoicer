import {ProductDTO} from "../../product/model/ProductDTO";
import Select from "react-select";
import React, {useCallback, useState} from "react";
import {toast} from "react-toastify";
import update = toast.update;

interface ProductSelectProps{
    products: ProductDTO[],
    updateProduct: (product: ProductDTO, isNew: boolean) => void
}

function ProductSelect(props: ProductSelectProps) {
    const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(null);
    const [isNew, setIsNew] = useState(true)

    const updateProductHere = useCallback((option: ProductDTO | null) => {
        props.updateProduct(option as ProductDTO, isNew);
        if (!selectedProduct) {
            setIsNew(false);
        }
        setSelectedProduct(option);

    }, [selectedProduct, setSelectedProduct, isNew, setIsNew, props.updateProduct]);

    return (
        <>
            <td>
                <Select
                    value={selectedProduct}
                    onChange={(option: ProductDTO | null) => updateProductHere(option)}
                    options={props.products}
                    getOptionLabel={(option: ProductDTO) => option.name}
                    getOptionValue={(option: ProductDTO) => option.id ? option.id.toString() : ''}
                    isSearchable
                    placeholder="Select a product"
                />
            </td>
            <td>
                <Select
                    value={selectedProduct}
                    onChange={(option: ProductDTO | null) => updateProductHere(option)}
                    options={props.products}
                    getOptionLabel={(option: ProductDTO) => option.symbol}
                    getOptionValue={(option: ProductDTO) => option.id ? option.id.toString() : ''}
                    isSearchable
                    placeholder="Select a product"
                />
            </td>
            <td>
                <Select
                    value={selectedProduct}
                    onChange={(option: ProductDTO | null) => updateProductHere(option)}
                    options={props.products}
                    getOptionLabel={(option: ProductDTO) => option.catalogNumber.toString()}
                    getOptionValue={(option: ProductDTO) => option.id ? option.id.toString() : ''}
                    isSearchable
                    placeholder="Select a product"
                />
            </td>
        </>
    )
}

export default ProductSelect;