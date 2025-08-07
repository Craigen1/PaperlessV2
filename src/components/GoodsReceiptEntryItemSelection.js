import React, { useEffect, useRef, useState, forwardRef } from "react";
import { DefButton, DefInput } from "./ComponentList";

export default function GoodsReceiptEntryItemSelection(p) {
  const [items, setitems] = useState("");
  const headerOnChangeHandler = (e) => {
    p.selectedItem(e.target.value);
  };
  useEffect(() => {
    console.log(p.ref);
  }, []);

  return (
    <div className="frame pb-2">
      <DefInput
        label="Item"
        handler={headerOnChangeHandler}
        value={items}
        autoSelect={true}
        autofocus={true}
        // map={itemList}
      />
      <div className="my-2 pb-2 mt-4">
        <DefButton type="3B" text="Clear" className="px-2 w-fit float-right" />
      </div>
    </div>
  );
}
