import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { FilterOption, FilterState } from "../types/index.ts";



const initialState: FilterState = {
    mod350:[],
    mod8000: [],
    mod20002: [],
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter: (
            state,
            action: PayloadAction<{ column: keyof FilterState; options: FilterOption[] }>) => {
            state[action.payload.column] = action.payload.options;
        },
    },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer