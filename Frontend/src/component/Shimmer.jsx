import { btn, btnGrey } from "../utils/tailwindClasses";
import Table, { Tbody, Td, Th, Thead, Tr } from "./Table";

function Shimmer() {
  return (
    <>
      <div className="mb-3 bg-gray-200 mt-3">
        <div className="flex justify-between items-center p-4 animate-pulse">
          <span className="h-7 rounded bg-slate-300 w-1/3"></span>
          <div className="flex">
            <button className={btnGrey}>Loading...</button>
            <button className={btn + " ms-2"}>Loading...</button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-3 p-4 border-b border-gray-200">
          <div className="relative py-1 w-1/4 group flex animate-pulse">
            <span className="h-8 rounded bg-slate-300 w-full"></span>
          </div>
          <div className="relative py-1 w-1/4 group animate-pulse">
            <div className="h-8 rounded bg-slate-300 w-full"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse">
        <Table>
          <Thead>
            <Tr>
              <Th>
                <div className="h-6 w-10 bg-gray-300 rounded"></div>
              </Th>
              <Th>
                <div className="h-6 w-10 bg-gray-300 rounded"></div>
              </Th>
              <Th>
                <div className="h-6 w-10 bg-gray-300 rounded"></div>
              </Th>
              <Th>
                <div className="h-6 w-10 bg-gray-300 rounded"></div>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <div className="h-4 w-10 bg-gray-300 rounded"></div>
              </Td>
              <Td>
                <div className="h-4 w-15 bg-gray-300 rounded"></div>
              </Td>
              <Td>
                <div className="h-4 w-15 bg-gray-300 rounded"></div>
              </Td>
              <Td flex={true}>
                <div className="h-4 w-12 bg-gray-300 rounded"></div>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <div className="h-4 w-10 bg-gray-300 rounded"></div>
              </Td>
              <Td>
                <div className="h-4 w-15 bg-gray-300 rounded"></div>
              </Td>
              <Td>
                <div className="h-4 w-15 bg-gray-300 rounded"></div>
              </Td>
              <Td flex={true}>
                <div className="h-4 w-12 bg-gray-300 rounded"></div>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </>
  );
}
export default Shimmer;
