import React, { useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  EXEC_SQL_InsertOne,
  Label,
} from "../ComponentList";
import { DefTable } from "../ComponentList";
import { LoadingSpinner } from "../../assets/SVGs";

export default function SelfBillingCopyFromRFP(p) {
  const columns = [
    { name: "ATB_ID", disabled: true },
    { name: "DPUR", disabled: true },
    { name: "Itemcode", disabled: true },
    { name: "Dscription", disabled: true },
    { name: "Quantity", disabled: true },
    { name: "QuantityPo", disabled: true },
    { name: "UOM", disabled: true },
    { name: "MatDoc", disabled: true },
    { name: "MNFDate", disabled: true },
    { name: "TF", disabled: true },
    { name: "QtyVariance", disabled: true },
    { name: "PostedQty", disabled: true },
  ];
  const [rows, setRows] = useState([]);
  const [SearchBy, setSearchBy] = useState("1");
  const [SearchValue, setSearchValue] = useState("0");
  const [searchLoading, setsearchLoading] = useState(false);
  const searchM = async (e) => {
    setsearchLoading(true);
    await EXEC_SQL_InsertOne(951, setRows, SearchValue);
    setsearchLoading(!true);
  };
  const xHideCopryFromRFP = async (e) => {
    p.hide(false);
  };
  const handleATBChange = async (e) => {
    const { value, id } = e.target;
    setSearchValue(value);
  };
  const HandleSearchTab = (e) => {
    const { value, id } = e.target;
    setSearchBy(id);
  };
  const handleCopyToSelfBilling = async (e) => {
    console.log({ rows });
    p.state(rows);
  };
  useEffect(() => {
    p.state("setasd");
  }, []);
  return (
    <div className="bg-white">
      <div className="  bg-trans50 fixed top-0 left-0  w-full h-full shadow-sm">
        <div className=" mt-2 "></div>
        <div className="">
          <div className=" mt-10 frame mx-auto  max-w-[vw] min-w-max ">
            <DefButton
              text="x"
              className="float-right w-fit px-2 "
              type={"2"}
              onClick={xHideCopryFromRFP}
            />
            <div className="bg-white">
              <div>
                <div className="">
                  <p className="m-0 p-0">Search based on</p>

                  <DefButton
                    text="ATB #"
                    id="1"
                    className=" w-fit px-2 "
                    type={SearchBy == "1" ? "2" : "2B"}
                    onClick={HandleSearchTab}
                  />
                  <DefButton
                    text="MNF"
                    id="2"
                    className=" w-fit px-2 "
                    type={SearchBy == "2" ? "2" : "2B"}
                    onClick={HandleSearchTab}
                  />
                </div>
                {SearchBy == "1" ? (
                  <div className="bg-white">
                    <div className="flex ">
                      <div>
                        <DefInput
                          label="ATB #"
                          className=""
                          handler={handleATBChange}
                        />
                      </div>
                      {!searchLoading ? (
                        <DefButton
                          text="Search"
                          className="float-right w-fit px-2 mt-4 pt-1.5"
                          type={"2B"}
                          onClick={searchM}
                        />
                      ) : (
                        <div className="mt-3 pt-2 ml-2">
                          <LoadingSpinner />
                        </div>
                      )}
                      <div className="w-full"></div>
                      <DefButton
                        text="Copy To Self Billing"
                        type="3"
                        className=" mt-4 float-right mx-2 px-2 pb-2 mb-4"
                        onClick={handleCopyToSelfBilling}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex gap-2">
                      <div>
                        <DefInput label="MNF From" />
                      </div>
                      <div>
                        <DefInput label="To" />
                      </div>
                    </div>
                    {/* <DefButton
                      text="Search"
                      className="float-right w-fit px-2 mt-4 pt-1.5"
                      type={"2B"}
                      onClick={searchM}
                    /> */}
                  </div>
                )}
              </div>
            </div>
            <div
              className="overflow-auto    pb-2  bg-white "
              style={{ width: "850px", maxHeight: "400px" }}
            >
              <DefTable
                columns={columns}
                rows={rows}
                btnLabel="Remove"
                spanCSS="w-full"
                className=""
                //   handleOption={handleOption}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
