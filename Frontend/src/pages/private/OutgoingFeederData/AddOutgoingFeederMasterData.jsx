import FormPanel from "../../../component/FormPanel";
import Header from "../../../component/Header";

import {
  label,
  select,
  btn,
  input,
  btnSuccess,
  btnGrey,
} from "../../../utils/tailwindClasses";

function AddOutgoingFeederMasterData() {
  return (
    <>
      <Header
        title="Add Distribution Outgoing Feeder Details"
        action={{
          button: "Outgoing Feeder List",
          path: "/outgoingFeederMaterData",
        }}
      />

      <FormPanel>
        <div className="col-span-1">
          <div className="relative z-0 w-full mb-5 group">
            <label className={label}>Division</label>
            <select className={select} defaultValue="">
              <option>Select Division</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Distribution Sub-Station Name</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative z-0 w-full group">
            <input className={input} placeholder=" " />
            <label className={label}>Feeder Name</label>
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
export default AddOutgoingFeederMasterData;
