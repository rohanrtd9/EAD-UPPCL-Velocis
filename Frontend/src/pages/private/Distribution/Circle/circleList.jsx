import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Header from "../../../../component/Header";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";

function CircleList() {
  return (
    <>
      <Header
        title="Circle (Distribution)"
        action={{
          button: "Add Circle",
          path: "/addCircle",
        }}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>S.No.</Th>
            <Th>Zone</Th>
            <Th>Circle</Th>
            <Th>Circle Code</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>Purvanchal</Td>
            <Td>UPPCL-PVL</Td>
            <Td>UPPCL-PVL</Td>
            <Td flex={true}>
              <TrashIcon className="h-5 w-5" />
              <PencilSquareIcon className="h-5 w-5 ms-2" />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}
export default CircleList;
