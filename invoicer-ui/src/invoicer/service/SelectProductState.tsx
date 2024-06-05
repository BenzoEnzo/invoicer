import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProductDTO} from "../../product/model/ProductDTO";

interface SelectedProductsContextType {
    selectedProducts: ProductDTO[];
    toggleProduct: (product: ProductDTO) => void;
}

const SelectedProductsContext = createContext<SelectedProductsContextType | undefined>(undefined);

export const useSelectedProducts = () => {
    const context = useContext(SelectedProductsContext);
    if (!context) {
        throw new Error('useSelectedProducts must be used within a SelectedProductsProvider');
    }
    return context;
};

export const SelectedProductsProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProducts, setSelectedProducts] = useState<ProductDTO[]>([]);

    const toggleProduct = (product: ProductDTO) => {
        setSelectedProducts((prevSelectedProducts) => {
            if (prevSelectedProducts.find((p) => p.id === product.id)) {
                return prevSelectedProducts.filter((p) => p.id !== product.id);
            } else {
                return [...prevSelectedProducts, product];
            }
        });
    };

    return (
        <SelectedProductsContext.Provider value={{ selectedProducts, toggleProduct }}>
            {children}
        </SelectedProductsContext.Provider>
    );
};