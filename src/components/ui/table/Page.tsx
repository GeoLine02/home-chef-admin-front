import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { setCurrentPageAction } from "../../../store/features/tableSlice";

interface IpageProps {
  totalPages: number;
}

const Page = ({ totalPages }: IpageProps) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const dispatch = useDispatch<AppDispatch>();

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPageAction(page));
  };

  return (
    <div className="flex gap-1">
      {pages.map((page) => (
        <button
          onClick={() => handlePageChange(page)}
          key={page}
          className="bg-dark_backgorund_color text-black w-9 h-9 rounded-sm hover:bg-light_background_color"
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Page;
