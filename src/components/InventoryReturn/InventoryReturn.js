import React, { useContext, useRef, useState } from "react";
import {
  DefButton,
  DefInput,
  DynamicTable,
  EXEC_SQL_InsertOne,
} from "../ComponentList";
import { ITopContext } from "../../hooks/TopContext";
import InventoryReturnPrintable from "./InventoryReturnPrintable";
import ReactToPrint from "react-to-print";

export default function InventoryReturn() {
  const { DateNow, userInfo } = useContext(ITopContext);
  const componentRef = useRef(undefined);
  const [Loading, setLoading] = useState(false);
  const [datePicked, setdatePicked] = useState({
    from: DateNow,
    to: DateNow,
  });
  const [rows, setrows] = useState([]);
  const [rowsForPrint, setrowsForPrint] = useState([]);
  const [forPrint, setforPrint] = useState(false);
  const GetDrafs = async () => {
    setLoading(true);
    await EXEC_SQL_InsertOne(772, setrows, datePicked.from, datePicked.to);
    setLoading(false);
  };
  const dateOnChange = (p) => {
    const { id, value } = p.target;
    setdatePicked((e) => ({ ...e, [id]: value }));
  };

  const onClickTableRows = async (p) => {
    const { id, value } = p.target;
    setLoading(true);
    setforPrint(true);
    await EXEC_SQL_InsertOne(771, setrowsForPrint, rows[id].DraftKey);
    setLoading(false);
  };
  return (
    <div>
      <div className="flex gap-2">
        <DefInput
          id="from"
          type="date"
          label="Date Covered From"
          value={datePicked.from}
          handler={dateOnChange}
        />
        <DefInput
          id="to"
          type="date"
          label="To"
          value={datePicked.to}
          handler={dateOnChange}
        />
        <DefButton
          text="Search"
          loading={Loading}
          onClick={GetDrafs}
          type="2B"
          className="btn-primary btn-sm btn mt-4"
        />
      </div>
      <br />
      {forPrint ? (
        <>
          <div className="w-full flex justify-between">
            <DefButton
              text="Back To list"
              onClick={() => setforPrint(!true)}
              type="2B"
              className="btn btn-primary btn-sm"
            />

            <ReactToPrint
              trigger={() => (
                <button className="btn btn-primary btn-sm">🖨️Print</button>
              )}
              content={() => componentRef.current}
            />
          </div>
          <>
            <div ref={componentRef} className="  bg-white top-0 left-0 z-50">
              <div
                className="print-container max-w-[890px]  min-w-[890px] "
                style={{ margin: "0", padding: "0" }}
              >
                {rowsForPrint.map((item, index) => (
                  <>
                    <InventoryReturnPrintable item={item} />
                    {index + 1 != rowsForPrint.length && (
                      <>
                        {index % 2 != 0 ? (
                          <div className={"page-break block"}></div>
                        ) : (
                          <div className="mt-2 border-dashed border-b-2 border-black mb-2"></div>
                        )}
                      </>
                    )}
                  </>
                ))}
              </div>
            </div>
          </>
        </>
      ) : (
        <>
          <span className="italic">Note: Click row to print pallet tag</span>
          <DynamicTable rows={rows} onClick={onClickTableRows} />
        </>
      )}
    </div>
  );
}
