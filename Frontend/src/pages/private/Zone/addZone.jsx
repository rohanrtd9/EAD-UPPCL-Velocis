import Header from "../../../component/Header";
import { btn, input, label, select } from "../../../utils/tailwindClasses";

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
      <div className="mt-5 w-full p-6 bg-gray-200 border border-gray-200 rounded-lg shadow grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Discom</label>
            <select className={select} defaultValue="">
              <option>Select a Discom</option>
              <option value="US">Purvanchal</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Zone Name</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Zone Code</label>
          </div>
        </div>
        <div className="col-span-3 flex justify-between">
          <button className={btn + " w-1/5"}>Submit</button>
        </div>
      </div>
    </>
  );
}
export default AddZone;
