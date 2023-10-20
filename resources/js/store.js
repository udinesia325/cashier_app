import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import bookepingReducer from "./features/bookeping/bookepingSlice";
import productReducer from "./features/product/ProductSlice";
import transactionReducer from "./features/transaction/transactionSlice";
import { categoryApi } from "./services/categoryApi";
import { productApi } from "./services/productApi";

export const store = configureStore({
    reducer: {
        product: productReducer,
        transaction: transactionReducer,
        bookeping:bookepingReducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productApi.middleware,
            categoryApi.middleware,
        ),
});

setupListeners(store.dispatch);
