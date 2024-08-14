import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";
import Header from "../../../../component/Header";

function KV33MasterBayPoint() {
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
            <Th>33KV and above Consumer name</Th>
            <Th>Consumer account ID</Th>
            <Th>Voltage level of Consumer</Th>
            <Th>T-D Point Name (Transmission Bay)</Th>
            <Th>Primary substations (Transmission)</Th>
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
            <Td>EDD I PRAYAGRAJ</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}
export default KV33MasterBayPoint;
