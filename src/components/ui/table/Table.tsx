import { useSelector } from "react-redux";
import Page from "./Page";
import DataPerPage from "./DataPerPage";
import { RootState } from "../../../store/store";
import { ITableColumn } from "../../../types/table";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import DataFilter from "./DataFilter";
import DataToPdf from "./DataToPdf";

interface IReusableTableProps {
  columns: ITableColumn[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

const Table = ({ columns, data }: IReusableTableProps) => {
  const [rows, setRows] = useState(data);

  const currentPage = useSelector(
    (state: RootState) => state.tableReducer.currentPage
  );
  const dataPerPage = useSelector(
    (state: RootState) => state.tableReducer.dataPerPage
  );
  const totalPages = Math.ceil(data.length / dataPerPage);

  const currentData = rows.slice(
    (currentPage - 1) * dataPerPage,
    currentPage * dataPerPage
  );

  const onDataSort = (entity: string | number, order: "asc" | "desc") => {
    setRows((prevRows) =>
      [...prevRows].sort((a, b) => {
        if (typeof entity === "number") {
          return order === "asc" ? a - b : b - a;
        } else if (typeof entity === "string") {
          const entityA = a[entity];
          const entityB = b[entity];
          if (entityA < entityB) {
            return order === "asc" ? -1 : 1;
          } else if (entityA > entityB) {
            return order === "asc" ? 1 : -1;
          }
          return 0;
        }
        return 0;
      })
    );
  };

  return (
    <div className="w-full px-6">
      <div className="flex justify-between items-center px-6 py-2">
        <DataToPdf />
        <DataFilter columns={columns} />
      </div>
      <div className="overflow-x-auto rounded-2xl border-2 border-border_color ">
        <table className="min-w-full divide-y divide-divider_color">
          <thead className="bg-dark_backgorund_color">
            <tr>
              {columns.map((column: ITableColumn) => (
                <th
                  key={column.accessorKey}
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                >
                  <div className="flex items-center gap-2">
                    <span>{column.header}</span>
                    {column.accessorKey !== "action" && (
                      <div>
                        <div
                          onClick={() => {
                            onDataSort(column.accessorKey, "asc");
                          }}
                        >
                          <IoIosArrowUp />
                        </div>
                        <div
                          onClick={() => {
                            onDataSort(column.accessorKey, "desc");
                          }}
                        >
                          <IoIosArrowDown />
                        </div>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-light_background_color divide-y divide-divider_color">
            {currentData.map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (row: any, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column: ITableColumn) => (
                    <td
                      key={column.accessorKey}
                      className="px-6 py-4 text-left whitespace-nowrap text-sm text-black"
                    >
                      {row[column.accessorKey]}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-between items-center p-5">
        <Page totalPages={totalPages} />
        <DataPerPage dataPerPage={dataPerPage} />
      </div>
    </div>
  );
};

export default Table;
