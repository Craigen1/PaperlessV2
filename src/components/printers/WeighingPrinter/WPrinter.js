import React, { useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import { WPrinterWrapper } from "./WPrinterWrapper";

export default function WPrinter() {
  const componentRef = useRef();

  const Print = useRef();
  useEffect(() => {
    Print.current.click();
  }, []);
  return (
    <div>
      <WPrinterWrapper ref={componentRef} />

      <ReactToPrint
        trigger={() => <button ref={Print}>Print this out!</button>}
        content={() => componentRef.current}
      />
    </div>
  );
}
