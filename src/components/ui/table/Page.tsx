import { SetStateAction } from "react";

interface IpageProps {
  totalPages: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}

const Page = ({ totalPages, setCurrentPage }: IpageProps) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
