import { useDispatch } from "react-redux";
import ConfirmationModal from "../../components/shared/ConfirmationModal";
import { AppDispatch } from "../../store/store";
import { toggleConfirmationModal } from "../../store/features/restaurantSlice";

const RestaurantDeleteModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAccept = () => {};

  const handleDecline = () => {
    dispatch(toggleConfirmationModal());
  };

  return (
    <div>
      <ConfirmationModal
        acceptHandler={handleAccept}
        declineHandler={handleDecline}
      >
        Are you sure you want to delete this restaurant. It will be permanently
        deleted?
      </ConfirmationModal>
    </div>
  );
};

export default RestaurantDeleteModal;
