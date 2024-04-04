import uppclLogo from "./../../assets/logo.jpeg";
function Dashboard() {
  return (
    <div className="min-h-full flex justify-center items-center">
      <div className="text-center">
        <div
          class="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <img className="mx-auto w-60" src={uppclLogo} alt="logo" />
          <h1 className="text-3xl font-bold mt-4">
            Feeder/Bay-Wise Energy Monitoring
          </h1>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
