import uppclLogo from "./../../../../src/assets/logo.jpeg";
function TransMisstionDashboard() {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 68px)" }}
    >
      <div className="p-6 bg-gray-300 rounded-lg shadow w-2/3 text-center">
        <img className="mx-auto w-60" src={uppclLogo} alt="logo" />
        <h1 className="text-3xl font-bold mt-4">
          Feeder/Bay-Wise Energy Monitoring (Transmission)
        </h1>
      </div>
    </div>
  );
}
export default TransMisstionDashboard;
