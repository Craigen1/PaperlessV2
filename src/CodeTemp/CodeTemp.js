import { ChipIcon, XIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { CodeGen_Input_Edit } from "../components/ComponentList2";
import CodeTempOption from "./CodeTempOption";
import CodeTempCanvas from "./CodeTempCanvas";

export default function CodeTemp() {
  const [PageSize, setPageSize] = useState(812);
  const [hideOptions, sethideOptions] = useState(false);
  const PageHandler = (e) => {
    if (1280 >= parseFloat(e.target.value) && 512 <= parseFloat(e.target.value))
      setPageSize(e.target.value);
  };
  return (
    <div className="">
      <div className="flex ">
        <div className="  w-full   ">
          <div className="h-10  border-y border-x border-trans20">
            <button
              onClick={(e) => sethideOptions(true)}
              className="flex justify-center text-center  font-semibold text-sm rounded-sm bg-trans20 px-2 m-1"
            >
              <ChipIcon className="text-trans-80 w-4 mt-0.5 mx-1" />
              Page Options
            </button>
          </div>

          <div className="  border-b border-x border-trans20 h-[100%] ">
            <CodeTempCanvas PageSize={PageSize} />
          </div>
        </div>
        {hideOptions && (
          <div className=" min-w-[350px] max-w-[350px]  gap-0 p-0 m-0">
            <div className="h-10 flex w-full border-y  border-trans20  ">
              <p className="mt-1 mx-2 w-full font-semibold"> Page Options</p>
              <button
                onClick={(e) => sethideOptions(!hideOptions)}
                className="mt-1 m-0 p-0    h-fit w-fit px-2 rounded-sm mx-2"
              >
                <XIcon className="w-4" />
              </button>
            </div>
            <div className="   ">
              <CodeTempOption
                setPageSize={setPageSize}
                PageHandler={PageHandler}
              />
            </div>
          </div>
        )}

        {/* <div className={`w-[${PageSize}px] bg-red-500 mx-auto`}>asd</div> */}
      </div>
    </div>
  );
}
