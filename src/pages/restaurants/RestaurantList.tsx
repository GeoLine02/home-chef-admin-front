import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/ui/table/Table";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchRestaurantList,
  selectRestaurantID,
  setSearch,
  toggleConfirmationModal,
} from "../../store/features/restaurantSlice";
import { useState, useEffect } from "react";
import { ITableAction, ITableData } from "../../types/table";
import { BsPencil } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

const RestaurantList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setCurrentPage] = useState(1);

  const limit = useSelector(
    (state: RootState) => state.tableReducer.dataPerPage
  );
  const filterBy = useSelector(
    (state: RootState) => state.restaurantReducer.filterOptions
  );
  const restaurantData = useSelector(
    (state: RootState) => state.restaurantReducer.restaurantList
  );
  const search = useSelector(
    (state: RootState) => state.restaurantReducer.search
  );

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "img",
      header: "image",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
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
      handler: (id: string) => console.log(`Edit ${id}`),
    },
    {
      name: "delete",
      icon: <FaTrashAlt size={16} />,
      handler: handleToggleDeleteConfirmation,
    },
  ];

  useEffect(() => {
    dispatch(fetchRestaurantList({ page, limit, filterBy, search }));
  }, [page, limit, search, dispatch, filterBy]);

  const handleSearch = (payload: string) => {
    dispatch(setSearch(payload));
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
      />
    </div>
  );
};

export default RestaurantList;
