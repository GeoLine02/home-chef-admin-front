import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { toggleConfirmationModal } from "../../store/features/restaurantSlice";

interface IConfirmationModalProps {
  children: ReactNode;
  acceptHandler: () => void;
}

const ConfirmationModal = ({
  children,
  acceptHandler,
}: IConfirmationModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return createPortal(
    <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className=" py-4 px-5 max-w-80 rounded-md bg-green-900">
        <div className="text-xl text-white">{children}</div>
        <div className="flex justify-around items-center mt-6">
          <button
            onClick={acceptHandler}
            className="bg-green-500 py-1 px-3 text-white rounded-md"
          >
            accept
          </button>
          <button
            onClick={() => {
              dispatch(toggleConfirmationModal());
            }}
            className="bg-red-500 py-1 px-3 text-white rounded-md"
          >
            decline
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("confirmationModal") as HTMLElement
  );
};

export default ConfirmationModal;
