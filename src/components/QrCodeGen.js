import React, { useState } from "react";
import QRCode from "react-qr-code";

export default function QRCodeGen(props) {
  const [qrValue, setQrValue] = useState("");

  return (
    <div>
      <input
        id="QRText"
        onChange={() => {
          setQrValue(document.getElementById("QRText").value);
        }}
      />

      <div className="m-4">
        <QRCode value={qrValue} />
      </div>
      <table style={{ width: 260 }}>
        <thead>
          <tr>
            <th class="px-4 py-2"></th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-2 border-black px-4 py-2">BATCH</td>
            <td class="border-2  border-black px-4 py-2">
              123123asdasdasdasd2311
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
