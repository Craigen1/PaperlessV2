import { PlusIcon } from "@heroicons/react/outline";
import { Html5Qrcode } from "html5-qrcode";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ITopContext } from "../hooks/TopContext";
import { DefButton, DefInput } from "./ComponentList";

import { Html5QrcodeScanner } from "html5-qrcode";
export default function Scanner(props) {
  // This method will trigger user permissions
  const [camID, setCamID] = useState("");
  const { qrInfo, setQrInfo, setPopScannerModal } = useContext(ITopContext);
  const [running, setRunning] = useState(false);
  const [RunOnce, setRunConcept] = useState(false);
  const renderer = useRef(null);
  /*Html5Qrcode.getCameras()
    .then((devices) => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
     
      if (devices && devices.length) {
        // var cameraId = devices[2].id;
        // var cameraId = devices[0].id;
        let camID = 0;
        devices.forEach((device) => {
          if (device.label.includes("back")) {
            // if (camID !== "") return;
            setCamID(devices[camID].id);
            // alert(devices[camID].id);
            return;
          }
          camID++;
        });
        //  setCamID(cameraId)
      }
    // })
    .catch((err) => {
      // handle err
    });

  const [htmlqrHandler, sethtmlqrHandler] = useState(null);
  function stopCam() {
    try {
      // alert(htmlqrHandler);
      htmlqrHandler.stop();
    } catch (error) {
      // alert(error);
    }
  }
  useEffect(() => {
    try {
      if (!(camID === "")) {
        const html5QrCode = new Html5Qrcode(/* element id "reader");
        html5QrCode
          .start(
            camID,
            {
              fps: 10, // Optional, frame per seconds for qr code scanning
              qrbox: { width: 300, height: 300 }, // Optional, if you want bounded box UI
            },
            (decodedText, decodedResult) => {
              setQrInfo({ type: decodedResult.format, data: decodedText });
              try {
                html5QrCode.stop();
                setPopScannerModal(false);
              } catch (error) {
                // alert(error);
              }
            },
            (errorMessage) => {
              // parse error, ignore it.
              // alert(errorMessage);
            }
          )
          .catch((err) => {
            // Start failed, handle it.
            // alert(err);
          });
        sethtmlqrHandler(html5QrCode);
      }
      // alert(camID);
    } catch (error) {
      alert(error);
    }
    return;
  }, [camID]);

  function closeModal() {
    setPopScannerModal(false);
  }
  const [ManualText, setManualText] = useState("");
  const HandleOnChangeManualText = (e) => {
    console.log(e.target.value);

    qrInfo.data = e.target.value;
    qrInfo.type = "manual";
  };
  const HandleManual = () => {
    stopCam();
    closeModal();
  };*/
  let scanner;
  const [scanResult, setscanResult] = useState("");
  const usescan = () => {
    scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });
    const success = (r) => {
      scanner.clear();
      setQrInfo({ type: "", data: r });
      setPopScannerModal(false);
    };
    const error = (r) => {
      console.warn({ r });
    };
    scanner.render(success, error);
  };

  const clearScanner = (e) => {
    try {
      scanner
        .clear()
        .then((_) => {
          setPopScannerModal(false);
        })
        .catch((e) => {
          console.log("Camera error");
        });
      setPopScannerModal(false);
    } catch (error) {}
  };
  const [ScannersInfo, setScannersInfo] = useState("");
  const onChangeInputScanConfirm = (e) => {
    console.log(e.target.value);
    setScannersInfo(e.target.value);
  };
  const ConfirmScan = (e) => {
    setQrInfo({ type: "", data: ScannersInfo });
    setPopScannerModal(false);
    clearScanner();
  };
  useEffect(() => {
    console.log("use scan1");
    usescan();
    console.log("use scan2");
  }, []);

  useEffect(() => {
    try {
      let reqPerm = document.getElementById(
        "html5-qrcode-button-camera-permission"
      );
      reqPerm.click();
      let optionSection = document.getElementById("reader__dashboard_section");
    } catch (error) {}
  }, [renderer]);

  return (
    <>
      {/* <button
        type="button"
        onClick={() => {
          stopCam();
          closeModal();
        }}
        style={{
          float: "right",
          position: "absolute",
          zIndex: "30",
          margin: 3,
        }}
        className=" right-6 mt-1  rounded-md bg-main flex-shrink-0 h-8 w-8 text-center  focus:ring-2   "
      >
        <PlusIcon className="  w-7 text-white  text-end rotate-45 self-end inline-block " />
      </button>
      <div className="">
        <div
          id="reader"
          width="600px"
          className="flex flex-row justify-center "
        >
          <svg
            role="status"
            class="inline mr-3 w-4 h-4 text-black animate-spin "
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          <p className="animate-pulse">loading</p>
        </div>
        <div className="flex">
          <DefInput
            text=""
            className="border-white text-black"
            handler={HandleOnChangeManualText}
          />
          <DefButton
            text="Confirm"
            className="w-16 px-2"
            onClick={HandleManual}
          />
        </div>
 
      </div> */}

      <div className="inline-block">
        <div className="w-full px-4">
          {/* <button className="w-fit" onClick={usescan}>
          use scanner
        </button> */}
          <div className="flex">
            <input type="text" onChange={onChangeInputScanConfirm} />
            <button
              type="2B"
              onClick={ConfirmScan}
              className="rounded-md text-black bg-WhiteMode-Background000 px-2 font-semibold "
            >
              Confirm
            </button>
          </div>
          <div id="reader" ref={renderer}></div>
          <div className=" center">
            <button
              type="2B"
              onClick={clearScanner}
              className="rounded-md text-black bg-WhiteMode-Background000 px-2 font-semibold "
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
