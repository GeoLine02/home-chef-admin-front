import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/ui/table/Table";
import { AppDispatch, RootState } from "../../store/store";
import {
  deleteRestaurant,
  fetchRestaurantList,
  selectRestaurantID,
  setSearch,
  toggleConfirmationModal,
} from "../../store/features/restaurantSlice";
import { useState, useEffect } from "react";
import { ITableAction, ITableData } from "../../types/table";
import { BsPencil } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmationModal from "../../components/shared/ConfirmationModal";
import { useNavigate } from "react-router-dom";

const RestaurantList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [page, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | string[]>(
    "" || []
  );

  const limit = useSelector(
    (state: RootState) => state.tableReducer.dataPerPage
  );

  const restaurantData = useSelector(
    (state: RootState) => state.restaurantReducer.restaurantList
  );
  const search = useSelector(
    (state: RootState) => state.restaurantReducer.search
  );

  const isModalOpen = useSelector(
    (state: RootState) => state.restaurantReducer.toggleConfirmationModal
  );

  const selectedRestaurantID = useSelector(
    (state: RootState) => state.restaurantReducer.selectRestaurantID
  );

  const columns = [
    {
      accessorKey: "id",
      header: "id",
    },
    {
      accessorKey: "img",
      header: "image",
    },
    {
      accessorKey: "name",
      header: "name",
    },
    {
      accessorKey: "email",
      header: "email",
    },
  ];

  const handleToggleDeleteConfirmation = (id: string) => {
    dispatch(toggleConfirmationModal());
    dispatch(selectRestaurantID(id));
  };

  const actions: ITableAction[] = [
    {
      name: "edit",
      icon: <BsPencil size={16} />,
      handler: (id: string) => {
        navigate(`/restaurants/update/${id}`);
      },
    },
    {
      name: "delete",
      icon: <FaTrashAlt size={16} />,
      handler: handleToggleDeleteConfirmation,
    },
  ];

  useEffect(() => {
    const filterBy = selectedOption;
    dispatch(fetchRestaurantList({ page, limit, filterBy, search }));
  }, [page, limit, search, dispatch, selectedOption]);

  const handleSearch = (payload: string) => {
    dispatch(setSearch(payload));
  };

  const handleDeleteRestaurant = () => {
    dispatch(deleteRestaurant(selectedRestaurantID as string));
    dispatch(toggleConfirmationModal());
  };

  return (
    <div>
      <Table
        columns={columns}
        data={restaurantData as ITableData}
        tableHeader="Restaurants"
        currentPage={page}
        setCurrentPage={setCurrentPage}
        setSearch={handleSearch}
        actions={actions}
        selectedFilterOption={selectedOption}
        setSelectedFilterOption={setSelectedOption}
      />
      {isModalOpen && (
        <ConfirmationModal acceptHandler={handleDeleteRestaurant}>
          Are you sure you want to delete this restaurant. It will be
          permanently deleted?
        </ConfirmationModal>
      )}
    </div>
  );
};

export default RestaurantList;
