import Header from "../../../component/Header";
import { btn, input, label } from "../../../utils/tailwindClasses";

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
          <input className={input} placeholder=" " />
          <label className={label}>Discom Name</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input className={input} placeholder=" " />
          <label className={label}>Zone (Distribustion) Name</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input className={input} placeholder=" " />
          <label className={label}>Circle (Distribustion) Name</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input className={input} placeholder=" " />
          <label className={label}>Division (Distribustion) Name</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input className={input} placeholder=" " />
          <label className={label}>Division Code</label>
        </div>
        <button className={btn}>Save</button>
      </div>
    </>
  );
}
export default AddDivision;
