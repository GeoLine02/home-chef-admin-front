import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface IConfirmationModalProps {
  children: ReactNode;
  acceptHandler: () => void;
  declineHandler: () => void;
}

const ConfirmationModal = ({
  children,
  acceptHandler,
  declineHandler,
}: IConfirmationModalProps) => {
  return createPortal(
    <div className="w-screen h-screen fixed top-0 left-0">
      <div className="w-72 md:max-w-md p-2 rounded-md bg-green-900">
        <div className="text-xl font-medium text-white">{children}</div>
        <div className="flex justify-between items-center">
          <button
            onClick={acceptHandler}
            className="bg-green-500 py-1 px-2 text-white rounded-md"
          >
            accept
          </button>
          <button
            onClick={declineHandler}
            className="bg-red-500 py-1 px-2 text-white rounded-md"
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
