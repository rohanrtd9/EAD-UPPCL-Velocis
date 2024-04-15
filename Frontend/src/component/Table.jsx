export default function Table({ children }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  );
}
export function Thead({ children }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      {children}
    </thead>
  );
}
export function Tr({ children }) {
  return <tr>{children}</tr>;
}
export function Th({ children }) {
  return <th className="px-6 py-3">{children}</th>;
}
export function Tbody({ children }) {
  return <tbody>{children}</tbody>;
}
export function Td({ children, flex, colspan }) {
  return (
    <td
      className={flex ? "flex px-6 py-4" : " px-6 py-4"}
      colSpan={colspan ? colspan : 1}
    >
      {children}
    </td>
  );
}
