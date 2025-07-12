import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { FilterOption, FilterState } from "../types/index.ts";
import type { RootState } from "../store/store.ts";
import type { DataRow } from "../types/index.ts";
import axios from 'axios'

interface FilterStateWithData extends FilterState {
  data: DataRow[];
  totalRows: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: FilterStateWithData = {
    number: [],
    mod350: [],
    mod8000: [],
    mod20002: [],
    data: [],
    totalRows: 0,
    loading: false,
    error: null,
    currentPage: 1,
};


export const fetchData = createAsyncThunk(
  'filters/fetchData',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/data/filterdata?page=${page}&limit=100`);
      return response.data.data; // { data, totalRows, page, limit }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);



export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers(builder){
        builder
        .addCase(fetchData.pending,(state)=>{
            state.loading = true
            state.error = null;
        })
        .addCase(fetchData.fulfilled,(state,action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.totalRows = action.payload.totalRows;
        })
        .addCase(fetchData.rejected,(state,action) => {
            state.loading = false
            state.error = action.payload as string;
            
        })
    }
})

export const { setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer