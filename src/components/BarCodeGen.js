import React from "react";
import { useBarcode } from "next-barcode";

function BarCodeGen(props) {
  const { inputRef } = useBarcode({
    value: props.value,
    options: {
      background: props.background,
      width: props.width,
      height: props.height,
      displayValue: false,
    },
  });

  return <canvas ref={inputRef} />;
}

export default BarCodeGen;
