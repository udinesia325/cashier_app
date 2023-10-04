import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productReducer from "./features/product/ProductSlice";
import transactionReducer from "./features/transaction/transactionSlice";
import { productApi } from "./services/productApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoryApi } from "./services/categoryApi";

export const store = configureStore({
    reducer: {
        product: productReducer,
        transaction: transactionReducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productApi.middleware,
            categoryApi.middleware
        ),
});

setupListeners(store.dispatch);
