import { createContext, useState } from "react";

export const ProductPageContext = createContext(null);

function ProductPageProvider({ children }) {
    const [page, setPage] = useState(1);
    
    return (
        <ProductPageContext.Provider value={{ page, setPage }}>
            {children}
        </ProductPageContext.Provider>
    );
}

export default ProductPageProvider;
