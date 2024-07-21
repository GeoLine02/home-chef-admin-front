import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface IDropDownProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[];
  selected: string | string[];
  setSelected: React.Dispatch<React.SetStateAction<string | string[]>>;
  multiple?: boolean;
  onChange: (selected: string | string[]) => void;
}

const DropDown = ({
  options,
  multiple = false,
  onChange,
  selected,
  setSelected,
}: IDropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    if (multiple) {
      setSelected((prevSelected) => {
        const newSelected = Array.isArray(prevSelected)
          ? [...prevSelected]
          : [];
        if (newSelected.includes(value)) {
          return newSelected.filter((item) => item !== value);
        } else {
          return [...newSelected, value];
        }
      });
    } else {
      setSelected(value);
    }
  };

  const handleDelete = (value: string) => {
    if (multiple && Array.isArray(selected)) {
      setSelected(selected.filter((item) => item !== value));
    }
  };

  const handleChange = () => {
    onChange(selected);
  };

  useEffect(() => {
    handleChange();
  }, [selected]);
  return (
    <div className="relative">
      <div className="border-2 border-border_color bg-dark_backgorund_color text-black rounded-md p-2 flex items-center justify-between">
        {multiple && Array.isArray(selected) && (
          <div className="flex items-center flex-wrap">
            <h3 className="font-medium whitespace-nowrap">Selected Items:</h3>
            {selected.map((item) => {
              const option = options.find((opt) => opt.accessorKey === item);
              return option ? (
                <div
                  className="rounded-md bg-light_background_color w-fit mx-2 p-1 flex items-center gap-1 my-1"
                  key={item}
                >
                  <span>{option.header}</span>
                  <button onClick={() => handleDelete(item)}>
                    <TiDelete color="red" size={20} />
                  </button>
                </div>
              ) : null;
            })}
          </div>
        )}
        {!multiple && (
          <div>
            <h3>{selected}</h3>
          </div>
        )}
        <div className="cursor-pointer">
          {isOpen && <IoIosArrowUp onClick={handleToggle} size={20} />}
          {!isOpen && <IoIosArrowDown onClick={handleToggle} size={20} />}
        </div>
      </div>
      {isOpen && (
        <div className="border-border_color border-2 rounded-b-lg bg-dark_backgorund_color w-full absolute z-50 bot-0 left-0">
          {options.map((item) => (
            <div className="flex gap-1 w-full pb-2" key={item.accessorKey}>
              <input
                className="px-2 py-1 bg-light_background_color text-black"
                type={multiple ? "checkbox" : "radio"}
                id={item.accessorKey}
                name="dropdown"
                value={item.accessorKey}
                checked={
                  Array.isArray(selected)
                    ? selected.includes(item.accessorKey)
                    : selected === item.accessorKey
                }
                onChange={() => handleSelect(item.accessorKey)}
              />
              <label className="text-black" htmlFor={item.accessorKey}>
                {item.header}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
