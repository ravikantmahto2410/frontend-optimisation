
import './App.css'
import DataTableComponent from './components/DataTable/DataTable'
import FilterDropdown from './components/Filters/FilterDropDown';
import type { DataRow,FilterState } from './types/index';
import React,{useState, useMemo} from 'react';
import { useDispatch } from 'react-redux';
import  type { RootState } from './store/store';
import { useSelector } from 'react-redux';
import { Placeholder } from 'react-select/animated';

const App: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [totalRows, setTotalRows] = useState(1000); // Adjust based on backend
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const filterColumns: (keyof FilterState)[] = ['number','mod350', 'mod8000', 'mod20002'];

  const columnName: string[] = ['number','mod350', 'mod8000', 'mod20002'];

  const filterOptions = useMemo(() => {
    return filterColumns.map((column) => ({
      column,
      options: filters[column],
    }));
  }, [filters]);

  return (
    <div>
      <h1>Dashboard</h1>
      
      <div className="flex flex-wrap gap-4 mb-4">
        
          {filterOptions.map(({ column, options }) => (
            <FilterDropdown key={column} column={column} options={options} 
            />
          ))}
      </div>
      <DataTableComponent data={data} totalRows={totalRows}/>
    </div>
  )
}

export default App