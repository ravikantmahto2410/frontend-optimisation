export interface DataRow {
      number: number;
    mod350: number;
    mod8000: number;
    mod20002: number;
}


export interface FilterOption {
  name: string;
  value: number;
}

export interface FilterState {
    number: FilterOption[]
    mod350: FilterOption[];
    mod8000: FilterOption[];
    mod20002: FilterOption[];
}
