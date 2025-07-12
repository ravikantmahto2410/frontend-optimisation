


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
