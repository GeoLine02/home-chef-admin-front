import { ChangeEvent, useState } from "react";
import { ITableColumn } from "../../../types/table";
import DropDown from "../DropDown";

interface IDataFilter {
  columns: ITableColumn[];
}

const DataFilter = ({ columns }: IDataFilter) => {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<"Nothing" | string>(
    "nothing"
  );
  const [search, setSearch] = useState<string>("");
  console.log(search);
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setToggleFilter(!toggleFilter);
  };

  const handleToggleFilter = () => {
    setToggleFilter(!toggleFilter);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="flex items-center gap-2">
        <h1>Filter by:</h1>
        <DropDown
          options={columns}
          handleSelectOption={handleSelectOption}
          handleToggleDropDown={handleToggleFilter}
          selectedOption={selectedOption}
          isDropDownOpen={toggleFilter}
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
