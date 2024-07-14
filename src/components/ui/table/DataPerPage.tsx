import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { setDataPerPageAction } from "../../../store/features/tableSlice";

interface IDataPerPageProps {
  dataPerPage: number;
}

const DataPerPage = ({ dataPerPage }: IDataPerPageProps) => {
  const [collapseManu, setCollapsMenu] = useState<boolean>(false);

  const options = [1, 3, 5];
  const dispatch = useDispatch<AppDispatch>();

  const handleChooseOption = (option: number) => {
    dispatch(setDataPerPageAction(option));
    setCollapsMenu(false);
  };

  return (
    <div className="bg-light_background_color  rounded-md w-fit p-2 relative border-2 border-border_color">
      <button
        onClick={() => {
          setCollapsMenu(!collapseManu);
        }}
      >{`${dataPerPage} per/page`}</button>
      {collapseManu && (
        <ul className="absolute left-0 bg-light_background_color w-full text-center rounded-b-md ">
          {options.map((option) => (
            <li
              key={option}
              className="py-1 cursor-pointer w-full hover:bg-dark_backgorund_color"
              onClick={() => {
                handleChooseOption(option);
              }}
            >
              {`${option} per/page`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DataPerPage;
