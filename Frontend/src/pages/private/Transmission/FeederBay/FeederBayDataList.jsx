import Header from "../../../../component/Header";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";

function FeederBayDataList() {
  return (
    <>
      <Header
        title="Feeder/Bay-Wise List"
        action={{
          button: "Add Substation",
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
            <Th>Existing Voltage Level Of Substation</Th>
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
            <Td>132-133</Td>

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
