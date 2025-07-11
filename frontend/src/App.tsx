
import './App.css'
import DataTableComponent from './components/DataTable/DataTable'
import FilterDropdown from './components/Filters/FilterDropDown';
import type { DataRow,FilterState } from './types/index';
import React,{useState, useMemo, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import  type { RootState } from './store/store';
import { useSelector } from 'react-redux';

import { fetchData, fetchFilterOptions } from './utils/dataUtils';
import ErrorBoundary from './components/common/Common/Common';
import { setFilter } from './features/filterSlice';

const App: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [totalRows, setTotalRows] = useState(0); // Adjust based on backend
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);

        const initialFilters: FilterState = {
          number: [],
          mod350: [],
          mod8000: [],
          mod20002: [],
        };
        const { data, totalRows } = await fetchData(1, initialFilters);
        
        setData(data);
        setTotalRows(totalRows);
        const filterColumns: (keyof FilterState)[] = ['number','mod350','mod8000','mod20002'];
        for(const column of filterColumns){
          if (filters[column].length === 0) {
            const options = await fetchFilterOptions(column, initialFilters);
            dispatch(setFilter({ column, options }));
          }
        }
      } catch(err){
        setError('Failed to load InitialData')
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  },[dispatch,filters]);

  useEffect(() => {
    setLoading(true);
    if(!loading){
      fetchData(1, filters)
      .then(({data, totalRows}) => {
        setData(data);
        setTotalRows(totalRows);
         setError(null);
      })
      .catch(() => setError('Failed to fetch data'))
      .finally(() => setLoading(false))
    }
  },[filters])

  const filterColumns: (keyof FilterState)[] = ['number','mod350', 'mod8000', 'mod20002'];

  const filterOptions = useMemo(() => {
    return filterColumns.map((column) => ({
      column,
      options: filters[column],
    }));
  }, [filters]);

  if(error){
    return <div className='p-4 text-red-600'>{error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {loading && <div className="p-4 text-blue-600">Loading...</div>}
      <ErrorBoundary>
        <div className="flex flex-wrap gap-4 mb-4">
        
          {filterOptions.map(({ column, options }) => (
            <FilterDropdown key={column} column={column} options={options} 
            />
          ))}
        </div>
      </ErrorBoundary>
      <ErrorBoundary>
          <DataTableComponent data={data} totalRows={totalRows}/>
      </ErrorBoundary>
      
    </div>
  )
}

export default App
