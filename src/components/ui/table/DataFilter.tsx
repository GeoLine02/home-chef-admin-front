import { ChangeEvent, useState } from "react";
import { ITableColumn } from "../../../types/table";
import DropDown from "../DropDown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setSelectedOption } from "../../../store/features/restaurantSlice";

interface IDataFilter {
  columns: ITableColumn[];
  setSearch: (payload: string) => void;
}

const DataFilter = ({ columns, setSearch }: IDataFilter) => {
  const dispatch = useDispatch<AppDispatch>();
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);

  const selectedOption = useSelector(
    (state: RootState) => state.restaurantReducer.filterOptions
  );

  const handleSelectOption = (option: string) => {
    dispatch(setSelectedOption(option));
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
