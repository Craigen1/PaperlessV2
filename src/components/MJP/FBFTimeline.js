import React from "react";

export function FBFTimeline({ checked }) {
  return (
    <>
      <div className="w-full flex">
        <p
          className={
            checked
              ? `text-white p-0 -m-0 h-5 w-6 text-center text-sm rounded-full bg-github_BorderColorActive ease-in duration-300`
              : `text-white p-0 -m-0 h-5 w-6 text-center text-sm rounded-full bg-WhiteMode-Background000`
          }
        >
          ✓
        </p>
        <div
          className={
            checked
              ? "line border-t-4 border-github_BorderColorActive mt-2  w-full ease-in duration-300"
              : "line border-t-4 border-WhiteMode-Background000 mt-2  w-full"
          }
        ></div>
      </div>
    </>
  );
}
