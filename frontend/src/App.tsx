
import './App.css'
import DataTableComponent from './components/DataTable/DataTable'
import FilterDropdown from './components/Filters/FilterDropDown';
import type { DataRow,FilterState } from './types/index';
import React,{useState, useMemo, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import  type { RootState } from './store/store';
import { useSelector } from 'react-redux';
import { Placeholder } from 'react-select/animated';
import { useAppDispatch,useAppSelector } from './app/hooks';
import { fetchFilterOptions,clearFilters } from './features/filterSlice';

const App: React.FC = () => {

  
  const dispatch = useAppDispatch();
  const { filterOptions, loading } = useAppSelector((state) => state.filters);


  const filterColumns: (keyof FilterState)[] = ['number','mod350', 'mod8000', 'mod20002'];

  const columnLabels: Record<keyof FilterState, string> = {
        number: 'Number',
        mod350: 'Mod 350',
        mod8000: 'Mod 8000',
        mod20002: 'Mod 20002'
    };
  useEffect(() => {
        dispatch(fetchFilterOptions());
  }, [dispatch]);

    const handleClearFilters = () => {
        dispatch(clearFilters());
  };

  return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Dashboard
                </h1>

                {/* Filter Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
                        <button
                            onClick={handleClearFilters}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filterColumns.map((column) => (
                            <FilterDropdown
                                key={column}
                                column={column}
                                options={filterOptions[column]}
                                label={columnLabels[column]}
                            />
                        ))}
                    </div>
                </div>

                {/* Data Table Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Table</h2>
                    <DataTableComponent />
                </div>
            </div>
        </div>
    );
}

export default App