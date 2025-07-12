import React, {useEffect} from "react";
import DataTable from 'react-data-table-component';
import  type { TableColumn } from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { DataRow } from "../../types";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useDispatch} from "react-redux";
import { fetchData,setCurrentPage } from "../../features/filterSlice";

const columns: TableColumn<DataRow>[] = [
    { name: 'Number', selector: (row: DataRow) => row.number, sortable: true },
    { name: 'Mod350', selector: (row: DataRow) => row.mod350, sortable: true },
    { name: 'Mod8000', selector: (row: DataRow) => row.mod8000, sortable: true },
    { name: 'Mod20002', selector: (row: DataRow) => row.mod20002, sortable: true },

]

const DataTableComponent : React.FC = () => {
    // const filters = useSelector((state: RootState) => state.filters);
    // const [page, setPage] = useState(1);
    // const [tableData, setTableData] = useState<DataRow[]>(data);
    const dispatch =  useAppDispatch()
    const {data, totalRows, loading, error, currentPage,number, 
        mod350, 
        mod8000, 
        mod20002} = useAppSelector((state: RootState) => state.filters);

    const currentFilters = {
        number,
        mod350,
        mod8000,
        mod20002
    };

    useEffect(() => {
        dispatch(fetchData({ page: currentPage, filters: currentFilters }));
    }, [currentPage,number, mod350, mod8000, mod20002, dispatch]);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    if (error) {
        return <div className="p-4 text-red-600">{error}</div>;
    }
    return (
        <div>
            <DataTable
                columns = {columns}
                data={data}
                pagination
                selectableRows
                paginationServer
                paginationTotalRows = {totalRows}
                onChangePage={handlePageChange}
                paginationPerPage={100}
                paginationRowsPerPageOptions={[100]}
                
                progressPending={loading}
                fixedHeader
                fixedHeaderScrollHeight="400px"
                highlightOnHover
                responsive
                striped
                noDataComponent={
                    <div className="p-4 text-gray-500">
                        No data available
                    </div>
                }
            />
        </div>
    )
}

export default DataTableComponent