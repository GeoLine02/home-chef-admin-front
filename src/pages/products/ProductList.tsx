import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Table from "../../components/ui/table/Table";
import { AppDispatch, RootState } from "../../store/store";
import { ITableAction, ITableData } from "../../types/table";
import ConfirmationModal from "../../components/shared/ConfirmationModal";
import {
  deleteProduct,
  fetchProductList,
  toggleConfirmationModal,
  selectProductId,
  setSearch,
} from "../../store/features/productSlice";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [page, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | string[]>(
    "" || []
  );

  const limit = useSelector(
    (state: RootState) => state.tableReducer.dataPerPage
  );

  const productData = useSelector(
    (state: RootState) => state.productReducer.productList
  );
  const search = useSelector((state: RootState) => state.productReducer.search);

  const isModalOpen = useSelector(
    (state: RootState) => state.productReducer.toggleConfirmationModal
  );

  const selectedProductId = useSelector(
    (state: RootState) => state.productReducer.selectProductId
  );

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "productName",
      header: "Name",
    },
    {
      accessorKey: "productPhoto",
      header: "Image",
    },
    {
      accessorKey: "productComposition",
      header: "Composition",
    },
    {
      accessorKey: "productDescription",
      header: "Description",
    },
    {
      accessorKey: "productPrice",
      header: "Price",
    },
    {
      accessorKey: "restaurantID",
      header: "restaurantID",
    },
    {
      accessorKey: "weight",
      header: "weight",
    },
  ];

  const handleToggleDeleteConfirmation = (id: string) => {
    dispatch(toggleConfirmationModal());
    dispatch(selectProductId(id));
  };

  const actions: ITableAction[] = [
    {
      name: "edit",
      icon: <BsPencil size={16} />,
      handler: (id: string) => {
        navigate(`/products/update/${id}`);
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
    dispatch(fetchProductList({ page, limit, filterBy, search }));
  }, [page, limit, search, dispatch, selectedOption]);

  const handleSearch = (payload: string) => {
    dispatch(setSearch(payload));
  };

  const handleDeleteRestaurant = () => {
    dispatch(deleteProduct(selectedProductId as string));
    dispatch(toggleConfirmationModal());
  };

  return (
    <div>
      <Table
        columns={columns}
        data={productData as ITableData}
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

export default ProductList;
