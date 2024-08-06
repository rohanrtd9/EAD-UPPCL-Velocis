import Header from "../../../component/Header";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../component/Table";

function IncomingFeederMasterData() {
  return (
    <>
      <Header
        title="Distribution Incoming Feeder Master Data"
        action={{
          button: "Add Incoming Feeder",
          path: "/AddIncomingFeederMasterData",
        }}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>S.No.</Th>
            <Th>Division</Th>
            <Th>Distribution Sub-Station Name</Th>
            <Th>Feeder Name</Th>
            <Th>Feeder Voltage</Th>
            <Th>Action</Th>
            <Th>Active / InActive</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>VIKAS NAGAR</Td>
            <Td>SINGHPUR</Td>
            <Td>INC-2</Td>
            <Td>11</Td>
            <Td flex={true}>
              <TrashIcon className="h-5 mt-3 w-5" />
              <PencilSquareIcon className="h-5 mt-3 w-5 ms-2" />
            </Td>
            <Td>ACTIVE</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}
export default IncomingFeederMasterData;
