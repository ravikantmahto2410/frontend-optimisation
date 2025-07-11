import React, {useEffect, useMemo, useState} from "react";
import DataTable from 'react-data-table-component';
import type { DataRow, FilterState} from "../../types/index";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { fetchData } from "../../utils/dataUtils";


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

];



const DataTableComponent : React.FC<DataTableProps> = ({data, totalRows}) => {
    const filters = useSelector((state: RootState) => state.filters);
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState<DataRow[]>(data);
    const [tableTotalRows, setTableTotalRows] = useState(totalRows);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true)
        fetchData(page, filters)
            .then(({data, totalRows}) => {
                setTableData(data)
                setTableTotalRows(totalRows)
                setError(null)
            })
            .catch((error) => setError('Failed to fetch table data'))
        .finally(() => setLoading(false));
    },[page, JSON.stringify(filters)])

     const memoizedColumns = useMemo(() => columns, []);
     if (error) {
      return <div className="p-4 text-red-600">{error}</div>;
    }

    
    return (
        <div>
            <DataTable
                
                columns = {memoizedColumns}
                data={tableData}
                pagination
                selectableRows
                paginationServer
                paginationTotalRows = {tableTotalRows}
                onChangePage={(newPage) => setPage(newPage)}
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