import React, { useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  DefTableComPressed,
  EXEC_SQL_InsertOne,
} from "./ComponentList";
import { LoadingSpinner } from "../assets/SVGs";

export default function MaterialUsageHistory() {
  const [rows, setRows] = useState([]);
  const [rowsBatch, setRowsBatch] = useState([]);
  const [uniqueTags, setuniqueTags] = useState([]);
  const [uniqueTags2, setuniqueTags2] = useState([]);
  const [selectedID, setselectedID] = useState(-1);
  const [Loading, setLoading] = useState(false);

  const columns = [
    {
      name: "MNFDate",
      disabled: true,
      header: true,
      level: 1,
    },
    {
      name: "ProrationType",
      disabled: true,
      header: true,
      level: 2,
    },
    {
      name: "Revision",
      disabled: true,
      header: true,
      level: 2,
    },
    {
      name: "DocEntry",
      disabled: true,
    },
    {
      name: "Size",
      disabled: true,
    },

    {
      name: "Warehouse",
      disabled: true,
    },
    {
      name: "Station",
      disabled: true,
    },
    {
      name: "CreatedBy",
      disabled: true,
    },
  ];

  const columnsBatch = [
    {
      name: "ItemCode",
      disabled: true,
      colspan: 2,
    },

    {
      name: "ItemName",
      disabled: true,
      colspan: 0,
    },
    {
      name: "BarCode",
      disabled: true,
    },

    {
      name: "UoM",
      disabled: true,
    },
    {
      name: "Qty",
      disabled: true,
    },
  ];

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const SearchH = async (e) => {
    setuniqueTags([]);
    await EXEC_SQL_InsertOne(953, setRows, dateFrom, dateTo);
    await EXEC_SQL_InsertOne(940, setuniqueTags, dateFrom, dateTo);
    await EXEC_SQL_InsertOne(939, setuniqueTags2, dateFrom, dateTo);
  };

  const filterOnChangeHandler = async (e) => {
    const { value, id, name } = e.target;
    console.log({ value, id, name });
    if (id == "from") setDateFrom(value);
    if (id == "to") setDateTo(value);
  };
  const viewDetailes = async (e) => {
    setLoading(false);
    const { id, name } = e.target;
    if (id == selectedID) {
      setselectedID(-1);
      return;
    }
    setselectedID(id);
    await EXEC_SQL_InsertOne(954, setRowsBatch, id);
    setLoading(true);
  };
  return (
    <div>
      <div className="frame pb-2">
        <div className="flex gap-2">
          <div className="w-full">
            <DefInput
              type="date"
              name="from"
              id="from"
              label="Mnf Date From"
              handler={filterOnChangeHandler}
            />
          </div>
          <div className="w-full">
            <DefInput
              type="date"
              name="to"
              id="to"
              label="To"
              className="text-black"
              handler={filterOnChangeHandler}
            />
          </div>
          <div>
            <DefButton
              text="Search"
              type="2"
              className="px-2 mt-4"
              onClick={SearchH}
            />
          </div>
        </div>
      </div>

      <div className="overflow-auto text-sm  py-2">
        {uniqueTags.map((cols, i1) => (
          <div className="frame overflow-auto">
            <div className=" w-full  border-b border-WhiteMode-Background000 ">
              {cols.MNFDate}
            </div>
            {uniqueTags2.map((cols2, i2) =>
              cols.MNFDate == cols2.MNFDate ? (
                <>
                  <div className="  ml-3 w-5 h-3 border-b border-l border-gray-410 -mb-5 "></div>

                  <div className="flex gap-2 ml-6 mt-2 bg-WhiteMode-Background000 w-fit ">
                    <div className="frame m-0 bg-transparent">
                      {cols2.ProrationType}
                    </div>
                    <div className="frame m-0 bg-transparent">
                      {cols2.Revision}
                    </div>
                    <div className="frame m-0 bg-transparent">{cols2.Size}</div>
                  </div>
                  <div>
                    {rows.map((rows, i3) =>
                      rows.MNFDate == cols2.MNFDate &&
                      rows.SizeID == cols2.SizeID &&
                      rows.RevisionID == cols2.RevisionID &&
                      rows.ProrationTypeID == cols2.ProrationTypeID ? (
                        <>
                          <div
                            className=" grid grid-cols-5 justify-evenly ml-10  "
                            key={i3}
                          >
                            <div className="w-fit flex gap-1">
                              <div className="  ml-3 w-5 h-3 border-b border-l border-gray-410"></div>
                              <DefButton
                                type="2B"
                                text={i3 != selectedID ? "View" : "Hide"}
                                className="w-fit"
                                id={i3}
                                name={rows.DocEntry}
                                onClick={viewDetailes}
                              />
                            </div>
                            <div className="">{rows.createdTime}</div>
                            <div className="">{i3}</div>
                            <div className="">{rows.Station}</div>
                            <div className="">{rows.CreatedBy}</div>
                          </div>
                          {i3 == selectedID ? (
                            <>
                              {Loading ? (
                                <>
                                  {rowsBatch.length != 0 ? (
                                    <>
                                      <div
                                        style={{
                                          marginLeft: "39px",
                                        }}
                                        className="  w-3.5  h-4 -mt-3   border-r border-gray-410"
                                      ></div>
                                      <div className="flex overflow-auto border-y border-gray-410 mb-2">
                                        <DefTable
                                          columns={columnsBatch}
                                          rows={rowsBatch}
                                          btnLabel="Remove"
                                          spanCSS="w-full"
                                          className=""
                                          classNameTable="frame"
                                          // onChange={DefTableonChange}
                                          // handleOption={handleOption}
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <div className="ml-14 pl-4">
                                      No Record Found
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="ml-10 pl-4">
                                  <LoadingSpinner />
                                </div>
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        <></>
                      )
                    )}
                  </div>
                </>
              ) : (
                ""
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
