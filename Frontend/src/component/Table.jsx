export default function Table({ children }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        border="1"
        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-f7f7f7"
        style={{ borderColor: "#f7f7f7" }}
      >
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

export function Th({ children, rowSpan, colSpan }) {
  return (
    <th
      className="px-3 py-2 border border-f7f7f7" // Reduced padding, border color applied
      style={{ borderColor: "#f7f7f7" }}
      {...(rowSpan && { rowSpan })}
      {...(colSpan && { colSpan })}
    >
      {children}
    </th>
  );
}

export function Tbody({ children }) {
  return <tbody>{children}</tbody>;
}

export function Td({ children, flex, colspan }) {
  return (
    <td
      className={
        flex
          ? "flex px-3 py-2 border border-f7f7f7"
          : "px-3 py-2 border border-f7f7f7"
      } // Reduced padding, border color applied
      style={{ borderColor: "#f7f7f7" }}
      colSpan={colspan ? colspan : 1}
    >
      {children}
    </td>
  );
}
