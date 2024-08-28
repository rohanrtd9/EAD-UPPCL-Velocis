import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import {
  btn,
  input,
  label,
  select,
  removebtn,
} from "../../../../utils/tailwindClasses";

function AddDivision() {
  return (
    <>
      <Header
        title="Add Incoming Feeder Master Data"
        action={{
          button: "Incoming Feeder List",
          path: "/IncomingFeederMasterData",
        }}
      />
      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Division Name</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Distribution Sub-Station Name</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Feeder Name</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
              <option>INC-1</option>
              <option>INC-2</option>
              <option>INC-3</option>
              <option>INC-4</option>
              <option>INC-5</option>
              <option>INC-6</option>
              <option>INC-7</option>
              <option>INC-8</option>
              <option>INC-9</option>
              <option>INC-10</option>
              <option>INC-11</option>
              <option>INC-12</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <label className={label}>Feeder Voltage</label>
            <select className={select} defaultValue="">
              <option>--Select--</option>
            </select>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Meter (Make & Type)</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Meter (SL.No)</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Overall MF</label>
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
export default AddDivision;
