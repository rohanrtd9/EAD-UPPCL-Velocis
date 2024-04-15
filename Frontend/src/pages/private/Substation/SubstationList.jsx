import Header from "../../../component/Header";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../component/Table";

const SubstationList = () => {
  return (
    <>
      <Header
        title="Substations"
        action={{
          button: "Add Substation",
          path: "/AddSubstation",
        }}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>Distribution Sub-Station Name</Th>
            <Th>Distribution Sub-Station Code</Th>
            <Th>Voltage of Unit Sub-Station</Th>
            <Th>Junior Engineer Name</Th>
            <Th>Junior Engineer Mobile No.</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>SARSAUL_24842</Td>
            <Td>24842</Td>
            <Td>33</Td>
            <Td>Rajan Kumar</Td>
            <Td>9999999999</Td>
            <Td flex={true}>
              <TrashIcon className="h-5 w-5" />
              <PencilSquareIcon className="h-5 w-5 ms-2" />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default SubstationList;
