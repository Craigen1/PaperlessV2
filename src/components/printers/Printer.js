import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { PrinterWrapper } from "./PrinterWrapper";

export default function Printer() {
  const componentRef = useRef();
  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <PrinterWrapper ref={componentRef} />
    </div>
  );
}
