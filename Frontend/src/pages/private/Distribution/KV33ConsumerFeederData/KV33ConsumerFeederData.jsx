import Header from "../../../../component/Header";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../../../component/Table";
function KV33ConsumerFeederData() {
  return (
    <>
      <Header
        title="33KV & Above Consumer Feeder Master"
        action={{
          button: "Add 33 KV Consumer",
          path: "/AddKV33ConsumerFeederData",
        }}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>Division</Th>
            <Th>33KV & Above Consumer Feeder</Th>
            <Th>Feeder Code</Th>
            <Th>Category</Th>
            <Th>Feeder Voltage</Th>
            <Th>Active / InActive</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>PHOOL BAGH</Td>
            <Td>33 KV BSNL </Td>
            <Td>NA</Td>
            <Td>TAPPED(WITH DISTRIBUTION SUBSTATION FEEDER)</Td>
            <Td>33</Td>
            <Td>Active</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}
export default KV33ConsumerFeederData;
