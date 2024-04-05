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

      <div
        className="mt-10 max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input className={input} placeholder=" " />
          <label className={label}>District</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input className={input} placeholder=" " />
          <label className={label}>District Code</label>
        </div>
        <button className={btn}>Save</button>
      </div>
    </>
  );
}
export default AddDistrict;
