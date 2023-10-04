import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: [],
    page:1,
    search:""
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct : (state,action) => {
            state.product = [...action.payload]
        },
        setSearch : (state,action) => {
            state.search = action.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const {setProduct,setSearch} = productSlice.actions;

export default productSlice.reducer;
