import React, { useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  DefTableComPressed,
  DefTableV2,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertOne,
} from "../ComponentList";
import { DefFiler } from "../ComponentList2";
import { LoadingSpinner } from "../../assets/SVGs";

export default function ITR_ITReport() {
  const [loading, setloading] = useState(false);
  const [rowBatch, setrowBatch] = useState([]);
  const [rowBatchLoading, setrowBatchLoading] = useState(false);
  const [rowBatchHidden, setrowBatchHidden] = useState(false);
  const [SelectedRowForBatchDetails, setSelectedRowForBatchDetails] = useState(
    []
  );
  const [filter, setfilter] = useState({
    ColumnName: "",
    filterValue: "",
  });
  const [rows, setrows] = useState([]);
  const [Date, setDate] = useState({
    From: "",
    To: "",
  });
  const columns = [
    { name: "Requested_Date" },
    { name: "ITR" },
    { name: "Item" },
    { name: "Name" },
    { name: "Requested" },
    { name: "Open" },
    { name: "IT" },
    { name: "Served" },
    // { name: "Date_Served" },
    {
      name: "Option",
      id: "Option",
      label: "Batch Details",
    },
  ];

  const columns2 = [
    { name: "IT" },
    { name: "Batch" },
    { name: "ED" },
    { name: "PD" },
    { name: "Quantity" },
  ];

  const handleDateChange = (e) => {
    const { id, value } = e.target;
    console.log({ id, value });
    setDate((e) => ({ ...e, [id]: value }));
  };
  function isHasError(e, v) {
    if (v === "" || v === undefined) {
      alert(`${e} Is Needed`);
      return true;
    } else {
      return false;
    }
  }
  const getData = async (e) => {
    if (isHasError("[From] ", Date.From)) return;
    if (isHasError("[To] ", Date.To)) return;
    if (isHasError("[Client] ", Date.Client)) return;
    setloading(true);
    await EXEC_SQL_InsertOne(765, setrows, Date.From, Date.To, Date.Client);
    setloading(false);
  };

  const OptionHandler = async (e) => {
    const { id, name, value, lang } = e.target;
    console.log(rows[lang]);
    setrowBatchLoading(true);
    setrowBatchHidden(true);
    setSelectedRowForBatchDetails(rows[lang]);
    await EXEC_SQL_InsertOne(763, setrowBatch, rows[lang].Item, rows[lang].ITR);

    setrowBatchLoading(false);
  };
  return (
    <div>
      <div className="flex gap-2">
        <DefInput
          label="From"
          id="From"
          type="date"
          handler={handleDateChange}
        />
        <DefInput label="To" id="To" type="date" handler={handleDateChange} />
        <DefInput
          label="Client"
          id="Client"
          type="Type"
          dropDownId={"764"}
          handler={handleDateChange}
        />
        <DefButton
          text=" search"
          onClick={getData}
          type="2B"
          className="mt-3 btn btn-primary btn-sm"
          loading={loading}
        />
      </div>
      <div className="mt-2">
        {/* <DefFiler
          label="Search By"
          columns={columns}
          rows={rows}
          setrows={setrows}
          setfilter={setfilter}
        /> */}
        <DefTableV2
          columns={columns}
          rows={rows}
          rowsPerPage={25}
          OptionHandler={OptionHandler}
        />
        {rowBatchHidden && (
          <div className="fixed top-0 right-0 h-full w-full bg-trans50 z-50">
            <div className="max-w-[521px] bg-white h-[90vh] mx-auto mt-4 rounded-md overflow-auto px-2">
              <div className="w-full flex   justify-between ">
                <p className="text-transparent">x</p>
                <DefButton
                  text="X"
                  onClick={() => setrowBatchHidden(false)}
                  className="btn btn-primary btn-sm"
                />
              </div>
              <br />

              <div className="grid grid-cols-2 gap-x-2 pb-4">
                {columns.map((e, i) => (
                  <>
                    {i > 0 && i < 6 && (
                      <DefInput
                        label={e.name}
                        value={SelectedRowForBatchDetails[e.name]}
                        disabled={false}
                      />
                    )}
                  </>
                ))}
              </div>

              <div className="over">
                {rowBatchLoading ? (
                  <LoadingSpinner />
                ) : (
                  <DefTableV2
                    columns={columns2}
                    rows={rowBatch}
                    rowsPerPage={15}
                    OptionHandler={OptionHandler}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
