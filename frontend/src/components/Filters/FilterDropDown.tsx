import React, { useEffect } from "react";
import type { FilterOption, FilterState } from "../../types/index";
import Select, { type MultiValue } from 'react-select'
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../features/filterSlice";
import type { RootState } from "../../store/store";
import { fetchFilterOptions } from "../../utils/dataUtils";
interface FilterDropdownProps {
    column: keyof FilterState;
    options: FilterOption[];
    
}
const FilterDropdown : React.FC<FilterDropdownProps> = ({column, options}) => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);
    const otherFilters = { ...filters, [column]: [] }; // Exclude current column


    useEffect(() => {
      // Only fetch if options are empty
      if (options.length === 0) {
        fetchFilterOptions(column, otherFilters)
          .then((newOptions) => {
            dispatch(setFilter({ column, options: newOptions }));
          })
          .catch((error) => console.error(`Failed to fetch options for ${column}:`, error));
      }
    }, [column, JSON.stringify(otherFilters), dispatch]);

    const handleChange = (selected: MultiValue<FilterOption>) => {
        dispatch(setFilter({column, options: selected as FilterOption[] }));
    };

    

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 capitalize">{column}</label>
            <Select
                isMulti
                options={options}

                onChange={handleChange}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.value.toString()}
                value={filters[column]}
                placeholder={`Select ${column}`}
                className="mt-1"
                
                
            />
        </div>
    )
}

export default FilterDropdown;
