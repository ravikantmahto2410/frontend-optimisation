import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { FilterOption, FilterState } from "../types/index.ts";



// const initialState: FilterState = {
//     number:[],
//     mod350:[],
//     mod8000: [],
//     mod20002: [],
// };

export interface dataState{
    data:[] | null,
    loading: boolean,
    error: string | null
}

const initialState: dataState = {
    data : [],
    loading: false,
    error:""
}


const getData = createAsyncThunk('filters', async() => {
     return fetch(`http://localhost:8000/api/v1/data/filterdata?page=1&limit=100`)
    .then(res => res.json())
})

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
        .addCase(getData.pending,(state)=>{
            state.loading = true
        })
        .addCase(getData.fulfilled,(state,action) => {
            state.loading = false
            state.error = null
            state.data=action.payload
        })
        .addCase(getData.rejected,(state,action:PayloadAction<any>) => {
            state.loading = false
            state.error = null
            state.data = []
        })
    }
})


export default filterSlice.reducer