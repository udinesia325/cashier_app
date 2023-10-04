import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    table_name: "",
    products: [],
    total: 0,
};

export const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        setTableName: (state, action) => {
            state.table_name = action.payload;
        },
        addProduct: (state, action) => {
            // jika sudah ada product maka naikkan increment nya
            const index = state.products.findIndex(
                (prod) => prod.id == action.payload.id
            );
            if(index != -1) {
                state.products[index].qty++;
                state.total += state.products[index].price;
                return 
            } 
            state.products = [
                ...state.products,
                { ...action.payload, qty: 1, subtotal: action.payload.price },
            ];
            state.total += action.payload.price;
        },
        deleteProduct: (state, action) => {
            const filtered = state.products.filter(
                (prod) => prod.id != action.payload.id
            );
            state.products = [...filtered];
            let total = filtered.reduce(
                (acc, curr) => acc + curr.price * curr.qty,
                0
            );
            state.total = total;
        },
        incrementQty: (state, action) => {
            const index = state.products.findIndex(
                (prod) => prod.id == action.payload
            );
            state.products[index].qty++;
            state.total += state.products[index].price;
        },
        decrementQty: (state, action) => {
            const index = state.products.findIndex(
                (prod) => prod.id == action.payload
            );
            // jika sudah tinggal 1 maka jangan di kurangi
            if(state.products[index].qty == 1) return 
            state.products[index].qty--;
            state.total -= state.products[index].price;
        },
        reset: () => {
            state = initialState;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addProduct,
    decrementQty,
    deleteProduct,
    incrementQty,
    reset,
    setTableName,
} = transactionSlice.actions;

export default transactionSlice.reducer;
