import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Header from "../../../../component/Header";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";
import { IoAddCircleSharp } from "react-icons/io5";

const SubstationList = () => {
  return (
    <>
      <Header
        title="Substations"
        action={{
          button: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
              }}
            >
              <IoAddCircleSharp
                style={{
                  fontSize: "18px",
                  color: "#DCDCDC",
                  marginRight: "8px",
                }}
              />
              Add Substation
            </div>
          ),
          path: "/AddSubstation",
        }}
      />

      <Table>
        <Thead>
          <Tr>
            <Th>Sr No</Th>
            <Th>Division</Th>
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
            <Td>1</Td>
            <Td>EDD KANPUR</Td>
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
