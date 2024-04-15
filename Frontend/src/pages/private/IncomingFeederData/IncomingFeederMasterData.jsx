import Header from "../../../component/Header";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../component/Table";

function IncomingFeederMasterData() {
  return (
    <>
      <Header
        title="Incoming Feeder Master Data"
        action={{
          button: "",
          path: "/substations",
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
            <Td>Active</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}
export default IncomingFeederMasterData;
