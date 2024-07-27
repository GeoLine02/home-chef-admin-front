import { ChangeEvent } from "react";
import { ITableColumn } from "../../../types/table";
import DropDown from "../DropDown";
interface IDataFilter {
  columns: ITableColumn[];
  setSearch: (payload: string) => void;
  selectedFilterOption: string | string[];
  setSelectFilterOption: React.Dispatch<
    React.SetStateAction<string | string[]>
  >;
}

const DataFilter = ({
  columns,
  setSearch,
  setSelectFilterOption,
  selectedFilterOption,
}: IDataFilter) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleChange = () => {};

  return (
    <div className="flex gap-2 items-center">
      <div className="flex items-center gap-2">
        <h1>Filter by:</h1>
        <DropDown
          options={columns}
          onChange={handleChange}
          selected={selectedFilterOption}
          setSelected={setSelectFilterOption}
          multiple={false}
        />
      </div>

      <div>
        <input
          className="outline-none bg-light_background_color p-2 rounded-md border-2 border-border_color"
          onChange={handleSearch}
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default DataFilter;
