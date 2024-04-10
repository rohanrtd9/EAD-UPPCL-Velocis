import Header from "../../../component/Header";
import Input from "../../../component/Input";
import Button from "../../../component/Button";
import { btn, input, label } from "../../../utils/tailwindClasses";

function AddDistrict() {
  return (
    <>
      <Header
        title="Add District"
        action={{
          button: "District List",
          path: "/district",
        }}
      />

      <div className="mt-5 w-full p-6 bg-gray-200 border border-gray-200 rounded-lg shadow grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>District Name</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>District Code</label>
          </div>
        </div>
        <div className="col-span-3 flex justify-between">
          <button className={btn + " w-1/5"}>Submit</button>
        </div>
      </div>
    </>
  );
}
export default AddDistrict;
