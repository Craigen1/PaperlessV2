import React, { useContext, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { DefButton, DefInput, EXEC_SQL } from "../ComponentList";
import RP_PalletTagWrap from "./RP_PalletTagWrap";
import { ITopContext } from "../../hooks/TopContext";

export default function RP_PalletTag() {
  const { setRP_palletingInfo } = useContext(ITopContext);

  const componentRef = useRef();
  const [palletingInfo, setpalletingInfo] = useState([]);
  const [PalletID, setPalletID] = useState(10187246);
  const onChangeHandler = (e) => {
    setPalletID(e.target.value);
  };
  const [loading, setloading] = useState(false);
  const onClickHandler = async (e) => {
    setloading(true);
    await EXEC_SQL(892, setRP_palletingInfo, PalletID);
    setloading(!true);
  };

  return (
    <>
      <div className="frame py-2">
        <div className="flex">
          <div className="w-full">
            <DefInput label="Number" handler={onChangeHandler} />
          </div>
          <DefButton
            text="Search"
            onClick={onClickHandler}
            type="2B"
            loading={loading}
            className="w-fit px-2 float-right frame mt-4"
          />
        </div>
      </div>

      <div className="flex mb-2">
        <div className="w-full"></div>
        <ReactToPrint
          trigger={() => (
            <button className=" bg-white shadow-sm rounded-md w-fit  px-2  mx-2 text-mainLink font-semibold">
              Print
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>

      <div className="overflow-auto frame">
        <PrintWrapper ref={componentRef} />
      </div>
    </>
  );
}

class PrintWrapper extends React.Component {
  render() {
    return (
      <div>
        <RP_PalletTagWrap />
      </div>
    );
  }
}
