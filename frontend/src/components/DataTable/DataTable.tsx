import React, {useState} from "react";
import DataTable from 'react-data-table-component';
import  type { TableColumn } from "react-data-table-component";

import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface DataRow {
    number: number;
	mod350: number;
	mod8000: number;
	mod20002: number;
}

const columns: TableColumn<DataRow>[] = [
    {
        name : 'Number',
        selector:  row=> row.number,
        sortable: true,
    },
    {
        name : 'Mod350',
        selector: row => row.mod350,
        sortable : true
    },
    {
        name: 'Mod8000',
        selector: row => row.mod8000,
        sortable: true,

    },
    {
        name : 'Mod20002',
        selector: row => row.mod20002,
        sortable: true
    }

]

const data = [
  	{
		number: 454,
        mod350: 104,
        mod8000: 454,
        mod20002: 454,
	},
	{
		number: 1155,
        mod350: 105,
        mod8000: 1155,
        mod20002: 1155,
	},
]


const DataTableComponent : React.FC = () => {
    // const filters = useSelector((state: RootState) => state.filters);
    // const [page, setPage] = useState(1);
    // const [tableData, setTableData] = useState<DataRow[]>(data);
    
    return (
        <div>
            <DataTable
                columns = {columns}
                data={data}
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
                striped
            />
        </div>
    )
}

export default DataTableComponent