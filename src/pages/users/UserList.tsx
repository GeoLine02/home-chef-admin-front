import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ITableAction, ITableData } from "../../types/table";
import { BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Table from "../../components/ui/table/Table";
import { userColumns } from "../../lib/tableColumns";
import { useEffect, useState } from "react";
import {
  deleteUser,
  fetchUserList,
  selectUserID,
  setSearch,
} from "../../store/features/userSlice";
import { toggleConfirmationModal } from "../../store/features/userSlice";
import ConfirmationModal from "../../components/shared/ConfirmationModal";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [page, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | string[]>(
    "" || []
  );
  const limit = useSelector(
    (state: RootState) => state.tableReducer.dataPerPage
  );
  const userList = useSelector(
    (state: RootState) => state.userReducer.userList
  );
  const search = useSelector((state: RootState) => state.userReducer.search);

  const handleToggleConfirmationModal = (id: string) => {
    dispatch(toggleConfirmationModal());
    dispatch(selectUserID(id));
  };

  const selectedUserID = useSelector(
    (state: RootState) => state.userReducer.selectUserID
  );

  const isUserModalOpen = useSelector(
    (state: RootState) => state.userReducer.toggleConfirmationModal
  );

  const handleSearch = (payload: string) => {
    dispatch(setSearch(payload));
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(Number(selectedUserID)));
    dispatch(toggleConfirmationModal());
  };
  const actions: ITableAction[] = [
    {
      name: "edit",
      icon: <BsPencil size={16} />,
      handler: (id: string) => {
        navigate(`/users/update/${id}`);
      },
    },
    {
      name: "delete",
      icon: <FaTrashAlt size={16} />,
      handler: handleToggleConfirmationModal,
    },
  ];

  useEffect(() => {
    const filterBy = selectedOption;
    dispatch(fetchUserList({ page, limit, filterBy, search }));
  }, [page, limit, search, dispatch, selectedOption]);

  return (
    <div>
      <Table
        columns={userColumns}
        data={userList as ITableData}
        actions={actions}
        tableHeader="Users"
        currentPage={page}
        selectedFilterOption={selectedOption}
        setCurrentPage={setCurrentPage}
        setSearch={handleSearch}
        setSelectedFilterOption={setSelectedOption}
      />
      {isUserModalOpen && (
        <ConfirmationModal acceptHandler={handleDeleteUser}>
          Are you sure you want to delete this user? It will be permanently
          deleted.
        </ConfirmationModal>
      )}
    </div>
  );
};

export default UserList;
