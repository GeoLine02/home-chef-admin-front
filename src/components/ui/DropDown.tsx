/* eslint-disable @typescript-eslint/no-explicit-any */

interface IDropDownProps {
  handleSelectOption: (option: string) => void;
  handleToggleDropDown: () => void;
  isDropDownOpen: boolean;
  options: any[];
  selectedOption: string;
}

const DropDown = ({
  options,
  selectedOption,
  isDropDownOpen,
  handleSelectOption,
  handleToggleDropDown,
}: IDropDownProps) => {
  return (
    <div className="bg-light_background_color  rounded-md w-fit p-2 relative border-2 border-border_color hover:bg-dark_backgorund_color">
      <button onClick={handleToggleDropDown}>{selectedOption}</button>
      <ul className="absolute left-0 bg-light_background_color w-full text-center rounded-b-md">
        {isDropDownOpen &&
          options.map((option: any, index: number) => (
            <li
              className="py-1 cursor-pointer w-full hover:bg-dark_backgorund_color"
              onClick={() => handleSelectOption(option.accessorKey)}
              key={index}
            >
              {option.accessorKey}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DropDown;
