import React, {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';
import  type { TableColumn } from "react-data-table-component";
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
    const dispatch = useDispatch()
    const {data, totalRows, loading, error, currentPage} = useSelector((state: RootState) => state.filters);

    useEffect(() => {
        dispatch(fetchData(currentPage));
    }, [currentPage, dispatch]);

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
                onChangePage={(page) => dispatch(setCurrentPage(page))}
                paginationPerPage={100}
                paginationRowsPerPageOptions={[100]}
                currentPage={currentPage}
                progressPending={loading}
                fixedHeader
                fixedHeaderScrollHeight="400px"
                highlightOnHover
                responsive
                striped
            />
        </div>
    )
}

export default DataTableComponent