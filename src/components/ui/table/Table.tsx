import { useSelector } from "react-redux";
import Page from "./Page";
import DataPerPage from "./DataPerPage";
import { RootState } from "../../../store/store";
import { ITableAction, ITableColumn, ITableData } from "../../../types/table";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { SetStateAction, useEffect, useState } from "react";
import DataFilter from "./DataFilter";
import DataToPdf from "./DataToPdf";

interface IReusableTableProps {
  columns: ITableColumn[];
  data: ITableData;
  tableHeader: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  setSearch: (payload: string) => void;
  actions: ITableAction[];
  setSelectedFilterOption: React.Dispatch<
    React.SetStateAction<string | string[]>
  >;
  selectedFilterOption: string | string[];
}

const Table = ({
  columns,
  data,
  tableHeader,
  setCurrentPage,
  setSearch,
  actions,
  setSelectedFilterOption,
  selectedFilterOption,
}: IReusableTableProps) => {
  const [rows, setRows] = useState<ITableData | null>(data);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const dataPerPage = useSelector(
    (state: RootState) => state.tableReducer.dataPerPage
  );

  const onDataSort = (entity: string | number, order: "asc" | "desc") => {
    setRows((prevRows: ITableData | null) => {
      if (prevRows === null) {
        return null;
      }
      return {
        ...prevRows,
        data: [...prevRows.data].sort((a, b) => {
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
        }),
      };
    });
  };

  return (
    <div className="w-full px-6">
      <div className="flex justify-between items-center px-6 py-2">
        <div className="flex items-center gap-4">
          <DataToPdf />
          <h1 className="text-2xl text-black">{tableHeader}</h1>
        </div>
        <DataFilter
          columns={columns}
          setSearch={setSearch}
          selectedFilterOption={selectedFilterOption}
          setSelectFilterOption={setSelectedFilterOption}
        />
      </div>
      <div className="overflow-x-auto rounded-2xl border-2 border-border_color">
        <table className="min-w-full divide-y divide-divider_color overflow-y-auto">
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
              <th
                key="action"
                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-light_background_color divide-y divide-divider_color">
            {rows?.data?.map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (row: any, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column: ITableColumn) => (
                    <td
                      key={column.accessorKey}
                      className="px-6 py-4 text-left whitespace-nowrap text-sm text-black"
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.accessorKey]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-black">
                    {actions.map((action) => (
                      <button
                        key={action.name}
                        onClick={() => action.handler(row.id)}
                        className="mr-2"
                      >
                        {action.icon}
                      </button>
                    ))}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-between items-center p-5">
        <Page
          totalPages={data?.pagination?.totalPages}
          setCurrentPage={setCurrentPage}
        />
        <DataPerPage dataPerPage={dataPerPage} />
      </div>
    </div>
  );
};

export default Table;
