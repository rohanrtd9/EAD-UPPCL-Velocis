import Table, { Tbody, Td, Th, Thead, Tr } from "../../../component/Table";
import Header from "./../../../component/Header";

function MasterSubstationWithBayPoint() {
  return (
    <>
      <Header
        title="Master Substation With BayPoint"
        action={{
          button: "",
          path: "/addDistrict",
        }}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>S.No.</Th>
            <Th>Discom</Th>
            <Th>Zone</Th>
            <Th>Circle</Th>
            <Th>Division</Th>
            <Th>Distribution Sub-station Name</Th>
            <Th>Distribution Sub-station Code</Th>
            <Th>Voltage level of Sub-station</Th>
            <Th>T-D Point Name (Transmission Bay)</Th>
            <Th>Primary substations (Transmission)</Th>
            <Th>Junior Engineer Name</Th>
            <Th>Junior Engineer Mobile Number</Th>
            <Th>Mapped EDD</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>POORVANCHAL</Td>
            <Td>PRAYAGRAJ-II</Td>
            <Td>EDC I PRAYAGRAJ</Td>
            <Td>EDD I PRAYAGRAJ</Td>
            <Td>BHODI</Td>
            <Td></Td>
            <Td>33</Td>
            <Td></Td>
            <Td></Td>
            <Td>PRMOD KUSHWAHA</Td>
            <Td>9193304450</Td>
            <Td>EDD I PRAYAGRAJ</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}
export default MasterSubstationWithBayPoint;
