import React, {useState} from "react";
import DataTable from 'react-data-table-component';
import type { DataRow} from "../../types/index";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";


interface DataTableProps {
  data: DataRow[];
  totalRows: number;
}

const columns = [
    {
        name : 'Number',
        selector: (row: DataRow) => row.number,
        sortable: true,
    },
    {
        name : 'Mod350',
        selector: (row: DataRow) => row.mod350,
        sortable : true
    },
    {
        name: 'Mod8000',
        selector: (row: DataRow) => row.mod8000,
        sortable: true,

    },
    {
        name : 'Mod20002',
        selector: (row: DataRow) => row.mod20002,
        sortable: true
    }

]


const DataTableComponent : React.FC<DataTableProps> = ({data, totalRows}) => {
    // const filters = useSelector((state: RootState) => state.filters);
    // const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState<DataRow[]>(data);
    
    return (
        <div>
            <DataTable
                columns = {columns}
                data={tableData}
                pagination
                selectableRows
                paginationServer
                paginationTotalRows = {100}
                // onChangePage={(newPage) => setPage(newPage)}
                paginationPerPage={100}
                paginationRowsPerPageOptions={[100]}
                fixedHeader
                fixedHeaderScrollHeight="400px"
                highlightOnHover
                responsive
            />
        </div>
    )
}

export default DataTableComponent