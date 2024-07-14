import Table from "../components/ui/table/Table";
import { ITableColumn } from "../types/table";

const TablePage = () => {
  const columns: ITableColumn[] = [
    {
      accessorKey: "id",
      header: "id",
    },
    { accessorKey: "name", header: "name" },
    {
      accessorKey: "email",
      header: "email",
    },
    {
      accessorKey: "phone",
      header: "phone",
    },
    {
      accessorKey: "actions",
      header: "",
    },
  ];

  const data = [
    {
      id: 1,
      name: "nika",
      email: "nikatsualdze@gmail.com",
      phone: "123123123",
    },
    {
      id: 2,
      name: "bondo",
      email: "bondoie@gmail.com",
      phone: "12345123123",
    },
    {
      id: 3,
      name: "jondo",
      email: "jondoie@gmail.com",
      phone: "12312113123",
    },
    {
      id: 4,
      name: "nugzara",
      email: "nugo@gmail.com",
      phone: "1231989723123",
    },
    {
      id: 5,
      name: "tamaza",
      email: "tamaza@gmail.com",
      phone: "1231209093123",
    },
  ];

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default TablePage;
