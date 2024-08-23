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
      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Discom</label>
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
        <div className="col-span-3 justify-between space-x-4">
          <button className={btn + " w-1/5"}>Submit</button>
          <button className={removebtn + " bg-red-500 w-1/5"}>Reset</button>
        </div>
      </FormPanel>
    </>
  );
}
export default AddZone;
