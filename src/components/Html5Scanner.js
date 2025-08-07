import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
export default function Html5Scanner() {
  const [scanResult, setscanResult] = useState("");
  const usescan = () => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });
    const success = (r) => {
      scanner.clear();
      setscanResult(r);
    };
    const error = (r) => {
      console.warn({ r });
    };

    scanner.render(success, error);
  };
  return <div className="bg-black"></div>;
}
