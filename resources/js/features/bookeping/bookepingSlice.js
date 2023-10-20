import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
    startDate:moment().startOf("month").format("DD-MM-YYYY"),
    endDate:moment().endOf("month").format("DD-MM-YYYY"),
    userId:0
};

export const bookeping = createSlice({
    name: "product",
    initialState,
    reducers: {
        setStartDate : (state,action) => {
            state.startDate = action.payload
        },
        setEndDate : (state,action) => {
            state.endDate = action.payload
        },
        setUserId:(state,action) =>{
            state.userId = action.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const {setStartDate,setEndDate,setUserId} = bookeping.actions;

export default bookeping.reducer;
