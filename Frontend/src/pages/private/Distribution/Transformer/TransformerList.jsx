import Header from "../../../../component/Header";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";

const TransformerList = () => {
  return (
    <>
      <Header
        title="Transformers"
        action={{
          button: "",
          path: "/AddTransformer",
        }}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>S.No.</Th>
            <Th>T_ID</Th>
            <Th>Distriburation Sub-Station</Th>
            <Th>Transformer Capacity (MVA)</Th>
            <Th>Quantity of Transformer</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Td>1</Td>
          <Td>1</Td>
          <Td>UPPCL-PVL</Td>
          <Td>10 000</Td>
          <Td>1.00</Td>
          <Td flex={true}>
            <TrashIcon className="h-5 w-5" />
            <PencilSquareIcon className="h-5 w-5 ms-2" />
          </Td>
        </Tbody>
      </Table>
    </>
  );
};

export default TransformerList;
