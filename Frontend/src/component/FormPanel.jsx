export default function FormPanel({ children }) {
  return (
    <div
      style={{ backgroundColor: "#f7f7f7" }}
      className="mt-2 w-full max-w-4x2 p-8 border border-gray-300 rounded-xl shadow-lg mx-auto grid gap-6 lg:grid-cols-3"
    >
      {children}
    </div>
  );
}
