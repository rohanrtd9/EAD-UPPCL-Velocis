import FormPanel from "../../../../component/FormPanel";
import Header from "../../../../component/Header";
import { btn, input, label, select } from "../../../../utils/tailwindClasses";

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

      <FormPanel>
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
      </FormPanel>
    </>
  );
}
export default AddDistrict;
