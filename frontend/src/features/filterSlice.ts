import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { FilterOption, FilterState } from "../types/index.ts";
import type { RootState } from "../store/store.ts";
import type { DataRow } from "../types/index.ts";
import axios from 'axios'
import type { ApiResponse } from "../types/index.ts";
import  type{ FilterPayload } from "../types/index.ts";

interface FilterStateWithData extends FilterState {
  data: DataRow[];
  totalRows: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  filterOptions: FilterState;
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
    filterOptions: {
        number: [],
        mod350: [],
        mod8000: [],
        mod20002: [],
    },
};


export const fetchData = createAsyncThunk(
  'filters/fetchData',
  async (params:{page: number;filters?:FilterState}, { rejectWithValue }) => {
    try {
        const queryParams = new URLSearchParams(); 
        queryParams.append('page', params.page.toString());
        queryParams.append('limit', '100');

        if (params.filters) {
            (Object.entries(params.filters) as [string, FilterOption[]][]).forEach(([key, values]) => {
                if (values.length > 0) {
                    const filterValues = values.map(v => v.value).join(',');
                    queryParams.append(key, filterValues);
                }
            });
        }

        const response = await axios.get(`http://localhost:8000/api/v1/data/filterdata?${queryParams}`);
        return response.data.data as ApiResponse;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchFilterOptions = createAsyncThunk(
    'filters/fetchFilterOptions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/data/all-filter-options');
            return response.data.data;
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
        setFilters: (state, action: PayloadAction<FilterPayload>) => {
            const { column, values } = action.payload;
            state[column] = values;
            state.currentPage = 1; 
        },
        clearFilters: (state) => {
            state.number = [];
            state.mod350 = [];
            state.mod8000 = [];
            state.mod20002 = [];
            state.currentPage = 1;
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
        .addCase(fetchFilterOptions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilterOptions.fulfilled, (state, action) => {
                state.loading = false;
                state.filterOptions = action.payload;
            })
            .addCase(fetchFilterOptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export const { setCurrentPage,setFilters, clearFilters } = filterSlice.actions;

export default filterSlice.reducer