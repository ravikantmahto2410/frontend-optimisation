import React from "react";
import type { FilterOption, FilterState } from "../../types/index";
import Select from 'react-select'


interface FilterDropdownProps {
    column: keyof FilterState;
    options: FilterOption[];
    
}
const FilterDropdown : React.FC<FilterDropdownProps> = () => {

    return (
        <div>
            
            <Select
                isMulti
                classNamePrefix="select"
                className="basic-multi-select"
                
            />
        </div>
    )
}

export default FilterDropdown;
