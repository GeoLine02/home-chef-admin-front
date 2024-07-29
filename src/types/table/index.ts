import { ReactNode } from "react";

export interface ITableColumn {
  accessorKey: string;
  header: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (row: any) => React.ReactDOM;
}

interface ITablePagination {
  limit: number;
  page: number;
  totalPages: number;
  totalRecords: number;
}

export interface ITableData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  pagination: ITablePagination;
}

export interface ITableAction {
  icon: ReactNode;
  name: string;
  handler: (id: string) => void;
}
