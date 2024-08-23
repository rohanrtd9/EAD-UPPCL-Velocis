import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import { discom } from "../../../../utils/constant";
import {
  btn,
  input,
  label,
  select,
  removebtn,
} from "../../../../utils/tailwindClasses";

function AddCircle() {
  return (
    <>
      <Header
        title="Add Circle"
        action={{
          button: "Circle List",
          path: "/circle",
        }}
      />
      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Discom Name</label>
            <select className={select} defaultValue="">
              <option>Select a Discom</option>
              {discom.map((dis) => (
                <option key={dis.id}>{dis.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Zone (Distribution)</label>
            <select className={select} defaultValue="">
              <option>Select Zone</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Circle Name</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Circle Code</label>
          </div>
        </div>
        <div className="col-span-3 justify-between space-x-4">
          <button className={btn + " w-1/5"}>Submit</button>
          <button className={removebtn + " bg-red-500 w-1/5"}>Reset</button>
        </div>
      </FormPanel>
    </>
  );
}
export default AddCircle;
