import React from "react";
import type { FilterOption, FilterState } from "../../types/index";
import Select from 'react-select'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setFilters } from "../../features/filterSlice";

interface FilterDropdownProps {
    column: keyof FilterState;
    options: FilterOption[];
    label:string
    
}
const FilterDropdown : React.FC<FilterDropdownProps> = ({column,options,label}) => {
    const dispatch = useAppDispatch()
    const selectedValues = useAppSelector((state) => state.filters[column]);

    const handleChange = (selectedOptions: FilterOption[] | null) => {
        dispatch(setFilters({
            column,
            values: selectedOptions || []
        }));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <Select
                isMulti
                options={options}
                value={selectedValues}
                onChange={handleChange}
                placeholder={`Select ${label}...`}
                classNamePrefix="select"
                className="basic-multi-select"
                getOptionLabel={(option) => option.label || option.value.toString()}
                getOptionValue={(option) => option.value.toString()}
                
            />
        </div>
    )
}

export default FilterDropdown;