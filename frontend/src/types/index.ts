export interface DataRow {
      number: number;
    mod350: number;
    mod8000: number;
    mod20002: number;
}


export interface FilterOption {
  value: number;
  label: string;
}

export interface FilterState {
    number: FilterOption[]
    mod350: FilterOption[];
    mod8000: FilterOption[];
    mod20002: FilterOption[];
}


export interface ApiResponse {
    data: DataRow[];
    totalRows: number;
    page: number;
    limit: number;
}

export interface FilterPayload {
    column: keyof FilterState;
    values: FilterOption[];
}