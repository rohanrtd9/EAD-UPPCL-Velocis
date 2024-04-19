function Error404() {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 68px)" }}
    >
      <div className="p-6 bg-gray-300 rounded-lg shadow w-2/3 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Not Found
        </h1>
        <p className="text-lg text-gray-600">
          The page you're looking for does not exist.
        </p>
      </div>
    </div>
  );
}
export default Error404;
