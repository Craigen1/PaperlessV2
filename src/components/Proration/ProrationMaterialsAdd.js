import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../../assets/SVGs";
import { DefButton } from "../ComponentList";

export default function ProrationMaterialsAdd(p) {
  const [BatchDitsLoading, setBatchDitsLoading] = useState(false);

  const addMats = (a) => {
    p.setMaterialUsage((e) => [...e, { ...a }]);
  };

  return (
    <>
      <div className=" z-50 overflow-auto fixed top-0 left-0 h-full w-full  bg-trans50">
        <div className=" max-w-[512px] h-full border bg-SAP-form mx-auto  absolute top-0 right-0">
          <div className="border-b-4 border-SAP-headerLine bg-SAP-header flex ">
            <div className="w-full mx-2 font-semibold">xx Choose Batch</div>
          </div>

          <div className="">
            <div>
              <DefButton
                type="4"
                onClick={() => p.setshowAddMaterials(false)}
                text="Close"
                className="px-2 mx-1 mb-1 btn btn-primary btn-sm  "
              />
            </div>
            {!BatchDitsLoading ? (
              <div className="overflow-auto bg-white">
                <table className="table table-xs">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th>ItemCode</th>
                      <th>ItemName</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.MaterialUsageStorage.map((e, i) => (
                      <tr>
                        <th>{i}</th>
                        <td>
                          <DefButton
                            className="btn btn-primary btn-sm"
                            text="Add"
                            onClick={() => {
                              p.setMaterialUsage((ee) => [...ee, { ...e }]);
                            }}
                          />
                        </td>
                        <td>{e.ItemCode}</td>
                        <td>{e.ItemName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
