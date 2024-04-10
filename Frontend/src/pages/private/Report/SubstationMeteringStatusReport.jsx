import Header from "../../../component/Header";
import {
  label,
  select,
  btn,
  btnSuccess,
  btnGrey,
} from "../../../utils/tailwindClasses";

function SubstationMeteringStatusReport() {
  return (
    <>
      <Header
        title="Substation Metering Status Report"
        action={{
          button: "Substations",
          path: "/substations",
        }}
      />

      <div className="mt-10 w-full p-6 bg-gray-200 border border-gray-200 rounded-lg shadow mx-auto grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
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
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Zone</label>
            <select className={select} defaultValue="">
              <option>Select Zone</option>
              <option value="US">Purvanchal</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Circle</label>
            <select className={select} defaultValue="">
              <option>Select Circle</option>
              <option value="US">Purvanchal</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Division</label>
            <select className={select} defaultValue="">
              <option>Select Division</option>
              <option value="US">Purvanchal</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Name of Substation</label>
            <select className={select} defaultValue="">
              <option value="US">Purvanchal</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Month</label>
            <select className={select} defaultValue="">
              <option>Select Month</option>
              <option value="US">Purvanchal</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Year</label>
            <select className={select} defaultValue="">
              <option>Select Year</option>
              <option value="US">Purvanchal</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>

        <div className="col-span-3 flex justify-between">
          <button className={btn + " w-1/5"}>Submit</button>
          <button className={btnSuccess + " w-1/5"}>Export</button>
          <button className={btnGrey + " w-1/5"}>Reset</button>
        </div>
      </div>
    </>
  );
}
export default SubstationMeteringStatusReport;
