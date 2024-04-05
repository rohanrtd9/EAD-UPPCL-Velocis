import Header from "../../../component/Header";
import Input from "../../../component/Input";
import Button from "../../../component/Button";

function AddDivision() {
  return (
    <>
      <Header
        title="Add Division"
        action={{
          button: "Division List",
          path: "/division",
        }}
      />

      <div
        className="mt-10 max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto"
      >
        <div className="relative z-0 w-full mb-5 group">
          <Input label="Discom Name" />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <Input label="Zone (Distribustion) Name" />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <Input label="Circle (Distribustion) Name" />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <Input label="Division (Distribustion) Name" />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <Input label="Division Code" />
        </div>

        <Button title={"Save"} />
      </div>
    </>
  );
}
export default AddDivision;
