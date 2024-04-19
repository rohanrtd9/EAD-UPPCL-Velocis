export default function FormPanel({ children }) {
  return (
    <div className="mt-10 w-full p-6 bg-gray-200 border border-gray-200 rounded-lg shadow mx-auto grid grid-cols-3 gap-6">
      {children}
    </div>
  );
}
