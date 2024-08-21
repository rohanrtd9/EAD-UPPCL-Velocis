import Header from "../../../../component/Header";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";

function FeederBayDataList() {
  return (
    <>
      <Header
        title="Feeder/Bay-Wise List"
        action={{
          button: "Add Feeder/Bay",
          path: "/AddFeederBayData",
        }}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>S.No.</Th>
            <Th>District</Th>
            <Th>Zone</Th>
            <Th>Circle</Th>
            <Th>Division</Th>
            <Th>Name of Substation</Th>
            <Th>Voltage Level of Feeder/Bay</Th>
            <Th>Name Of Feeder/Bay Of Substation</Th>
            <Th>Interface Type</Th>
            <Th>Trasaction Type</Th>
            <Th>Discom</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>Prayagraj</Td>
            <Td>SOUTH EAST</Td>
            <Td>ETC Prayagraj-1</Td>
            <Td>ETD Prayagraj-1</Td>
            <Td>132 KV JHUNSI</Td>
            <Td>33</Td>
            <Td>63 MVA T/F APEX Main</Td>
            <Td>T-T</Td>
            <Td>Intra State</Td>
            <Td>With In Zone</Td>
            <Td flex={true}>
              <PencilSquareIcon className="h-5 mt-3 w-5 ms-2" />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}
export default FeederBayDataList;
