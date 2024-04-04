import Header from "../../../component/Header";
import Input from "../../../component/Input";
import Button from "../../../component/Button";

function AddZone() {
  return (
    <>
      <Header
        title="Add Zone"
        action={{
          button: "Zone List",
          path: "/zone",
        }}
      />

      <div
        className="mt-10 max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto"
      >
        <div className="relative z-0 w-full mb-5 group">
          <Input label="Zone Name" />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <Input label="Zone Code" />
        </div>
        <Button title={"Save"} />
      </div>
    </>
  );
}
export default AddZone;
