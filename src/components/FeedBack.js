import React from "react";
import {
  ConfirmButton,
  DefaultFontStypex,
  DefaultFontStypexLink,
  DefaultFontStypexMuted,
} from "./ComponentList";

export default function FeedBack() {
  return (
    <div className="mx-2">
      <form action="#" className="grid grid-cols-1 gap-y-2 gap-x-3 mb-3 ">
        {/* <h1 class="text-3xl font-bold text-gray-900">Header Details </h1> */}

        <div className="grow flex flex-row  gap-x-3">
          <div className="w-full">
            <p className={DefaultFontStypex}>Proration Type</p>
            <div className=" w-full  grow flex flex-row    appearance-none rounded-md border border-gray-200 bg-gray-50 px-2 py-1   placeholder-gray-400  ">
              <input
                id="ProrationType"
                name="ProrationType"
                autoComplete="ProrationType"
                className="w-full bg-transparent"
              ></input>
            </div>
          </div>
        </div>

        <p className={DefaultFontStypex}>Remarks</p>
        <textarea
          id="REMARKS"
          type="textarea"
          name="REMARKS"
          required=""
          multiple="true"
          cols={5}
          rows={10}
          wrap={true}
          className="h-full block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-gray-500 sm:text-sm"
        />
        <div className=" w-full group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">
          {/* Print button */}
          <button
            type="button"
            className={ConfirmButton}
            onClick={() => {
              // setWeighingPrinterObject(iBom);
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
