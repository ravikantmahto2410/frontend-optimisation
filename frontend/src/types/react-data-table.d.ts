import { TableProps } from 'react-data-table-component';

declare module 'react-data-table-component' {
  interface TableProps<T> {
    currentPage?: number;
  }
}