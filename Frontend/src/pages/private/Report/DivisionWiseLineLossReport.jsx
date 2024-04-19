import FormPanel from "../../../component/FormPanel";
import Header from "../../../component/Header";
import {
  label,
  select,
  btn,
  btnSuccess,
  btnGrey,
} from "../../../utils/tailwindClasses";

function DivisionWiseLineLossReport() {
  return (
    <>
      <Header
        title="Division Wise Line Loss Report"
        action={{
          button: "Substations",
          path: "/substations",
        }}
      />

      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Energy Account Month</label>
            <select className={select} defaultValue="">
              <option>Select Month</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Year</label>
            <select className={select} defaultValue="">
              <option>Select Year</option>
            </select>
          </div>
        </div>

        <div className="col-span-3 flex justify-between">
          <button className={btn + " w-1/5"}>Submit</button>
          <button className={btnSuccess + " w-1/5"}>Export</button>
          <button className={btnGrey + " w-1/5"}>Reset</button>
        </div>
      </FormPanel>
    </>
  );
}
export default DivisionWiseLineLossReport;
