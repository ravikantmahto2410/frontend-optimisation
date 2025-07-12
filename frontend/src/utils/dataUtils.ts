// import type { DataRow, FilterOption,FilterState } from "../types";

// export const fetchData = async(
//     page: number = 1,
//     filters: FilterState
// ): Promise<{data: DataRow[];totalRows: number}> => {
//     const query = new URLSearchParams({ page: page.toString(), limit: '100' });
//     Object.entries(filters).forEach(([column, options]:[string,FilterOption[]]) => {
//         if (options.length > 0) {
//         query.append(column, options.map((opt) => opt.value).join(','));
//         }
//     });
//     const response = await fetch(`http://localhost:8000/api/v1/data/filterdata?${query}`);
//     if(!response.ok) throw new Error('Failed to fetch data');
//     const result = await response.json();
//     return { data: result.data.data, totalRows: result.data.totalRows };
// };

// export const fetchFilterOptions = async (
//     column: keyof DataRow,
//     filters: FilterState
    

// ): Promise<FilterOption[]> => {
//     const query = new URLSearchParams({column: column.toString() });
//     Object.entries(filters).forEach(([col, options]:[string,FilterOption[]]) => {
//         if(col !== column && options.length > 0){
//             query.append(col, options.map((opt) => opt.value).join(','));

//         }
//     });

//     const response = await fetch(`http://localhost:8000/api/v1/data/filter-options?${query}`);
//     if(!response.ok) throw new Error('Failed to fetch the filter options');
//     const result = await response.json();
//     return result.data;
// }