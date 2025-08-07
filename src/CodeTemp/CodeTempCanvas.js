import { PlusIcon, PlusSmIcon, ViewGridIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { CodeGen_Label_Edit } from "../components/ComponentList2";

export default function CodeTempCanvas(p) {
  const [PageTitle, setPageTitle] = useState("Page Title");
  const pageTitleHandler = async (e) => {
    const { id, lang, value } = e.target;

    let xx = value.replace(/\n/g, "");
    console.log(xx);
    setPageTitle(xx);
  };
  return (
    <div
      className={`mx-auto   mt-2`}
      style={{
        width: `${p.PageSize}px`,
      }}
    >
      <div className="flex">
        <div className="min-w-[3rem] max-w-[3rem]"></div>
        <textarea
          className="font-mono text-4xl w-full placeholder:text-gray-800 whitespace-nowrap resize-none overflow-x-scroll-scroll"
          contentEditable={true}
          onInput={pageTitleHandler}
          placeholder="Untitled page"
          value={PageTitle}
        ></textarea>
      </div>
      <CodeGen_Label_Edit />
    </div>
  );
}
