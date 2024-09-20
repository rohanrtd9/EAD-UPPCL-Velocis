import { TERipple } from "tw-elements-react";

function Button({ title }) {
  return (
    <TERipple rippleColor="light" className="w-full">
      <button
        type="button"
        className="inline-block rounded-lg bg-green-500 px-8 py-3 text-sm font-semibold text-white shadow-md transition duration-200 ease-in-out hover:bg-green-600 hover:shadow-lg focus:bg-green-700 focus:shadow-lg active:bg-green-800 active:shadow-inner focus:outline-none"
      >
        {title}
      </button>
    </TERipple>
  );
}

export default Button;
