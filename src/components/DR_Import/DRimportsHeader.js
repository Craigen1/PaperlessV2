import React, { useEffect, useState } from "react";
import { DefInput } from "../ComponentList";
import { useUserStore } from "../userStore/useUserStore";

export default function DRimportsHeader(p) {
  const [componentsValues, setcomponentsValues] = useState([]);
  const { setError } = useUserStore();
  const openModal = () => {
    if (!p.profitCenter || p.profitCenter.trim() === "") {
      p.setModalVisible(false);
      setError("Profit Center is required!");
    } else if (p.empOwnerCode === null) {
      p.setModalVisible(false);
      setError("Owner is required!");
    } else {
      p.setModalVisible(true);
      setError(null);
    }
  };
  const closeModal = () => {
    p.setModalVisible(false);
  };
  const components = [
    { name: "CUSTOMERREFN", label: "Customer Ref. No.", type: "number" },
    { name: "STOREF", label: "STO No.", type: "number" },
    { name: "OUTBOUNDDELIVERY", label: "Outbound Delivery", type: "text" },
    { name: "TRUCKER", label: "Trucker", type: "text" },
    { name: "DRIVER", label: "Driver", type: "text" },
    { name: "PLATENO", label: "Plate No.", type: "text" },
    { name: "RIGHTSEAL", label: "Right Seal No.", type: "text" },
    { name: "LEFTSEAL", label: "Left Seal No.", type: "text" },
    { name: "BACKSEAL", label: "Back Seal No.", type: "text" },
    { name: "DESTINATION", label: "Destination", type: "text" },
    { name: "MATDOC", label: "Material Document", type: "text" },
  ];

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setcomponentsValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    if (p.rows.length <= 0) return;
    const rowData = p.rows[0];
    Object.keys(rowData).forEach((key) => {
      importHeaderHandler(key, rowData[key]);
    });
  }, [p.rows]);

  const importHeaderHandler = (name, importValue) => {
    if (importValue) {
      setcomponentsValues((prevValues) => ({
        ...prevValues,
        [name]: importValue,
      }));
    }
  };

  return (
    <div>
      <div className="mb-2">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={p.importFromExcel}
            >
              Paste
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={p.searchBatch}
              disabled={p.searchBtnStatus}
            >
              Find Batch
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={p.allocateQTY}
              disabled={p.allocateBtnStatus}
            >
              Allocate Qty
            </button>
            <button
              disabled={p.postBtnStatus}
              className="btn btn-primary btn-sm"
              onClick={openModal}
            >
              Pre-post Review
            </button>
          </div>

          {p.modalVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
              <div className="modal-box max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">
                  Pre-Post Review: Delivery Notes
                </h2>

                <button
                  className="btn btn-sm btn-ghost absolute top-2 right-2"
                  onClick={closeModal}
                >
                  X
                </button>

                <h3 className="text-lg mt-4">Delivery Details:</h3>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <tbody>
                      <tr>
                        <td>Card Code</td>
                        <td>CDMP000001</td>
                      </tr>
                      <tr>
                        <td>Card Name</td>
                        <td>DEL MONTE PHILIPPINES INC.</td>
                      </tr>
                      <tr>
                        <td>Customer Reference</td>
                        <td>{p.rows[0]?.CUSTOMERREFN}</td>
                      </tr>
                      <tr>
                        <td>STO No</td>
                        <td>{p.rows[0]?.STOREF}</td>
                      </tr>
                      <tr>
                        <td>Driver</td>
                        <td>{p.rows[0]?.DRIVER}</td>
                      </tr>
                      <tr>
                        <td>Plate Number</td>
                        <td>{p.rows[0]?.PLATENO}</td>
                      </tr>
                      <tr>
                        <td>Shipping Address</td>
                        <td>{p.rows[0]?.DESTINATION}</td>
                      </tr>
                      <tr>
                        <td>Right Seal</td>
                        <td>{p.rows[0]?.RIGHTSEAL}</td>
                      </tr>
                      <tr>
                        <td>Left Seal</td>
                        <td>{p.rows[0]?.LEFTSEAL}</td>
                      </tr>
                      <tr>
                        <td>Back Seal</td>
                        <td>{p.rows[0]?.BACKSEAL}</td>
                      </tr>
                      <tr>
                        <td>Trucker</td>
                        <td>{p.rows[0]?.TRUCKER}</td>
                      </tr>
                      <tr>
                        <td>Warehouse</td>
                        <td>22220001</td>
                      </tr>
                      <tr>
                        <td>Remarks</td>
                        <td>{`SAP DMPI MATDOC#${[
                          ...new Set(p.rows.map((row) => row.MATDOC)),
                        ].join(", ")}`}</td>
                      </tr>
                      <tr>
                        <td
                          className={
                            p.empOwnerCode === null ? "text-red-500" : ""
                          }
                        >
                          Owner
                        </td>
                        <td>{p.empOwnerCode}</td>
                      </tr>
                      <tr>
                        <td
                          className={p.prcCode === null ? "text-red-500" : ""}
                        >
                          COGS Profit Center
                        </td>
                        <td>{p.prcCode}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg mt-6">Delivery Items:</h3>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Item Code</th>
                        <th>Item Description</th>
                        <th>Quantity</th>
                        <th>UoMCode</th>
                        <th>PD</th>
                        <th>Batch Number</th>
                        <th>DPUR#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.rows.map((line, idx) => (
                        <tr key={idx}>
                          <td>{line.ITEMCODE}</td>
                          <td>{line.ITEMNAME}</td>
                          <td>{line.ALLOCATEDQTY}</td>
                          <td>{line.UOM}</td>
                          <td>{line.PD}</td>
                          <td>
                            {line.UPDATED_BATCHCODE.map((batch, batchIdx) => (
                              <div key={batchIdx}>
                                <strong>Batch Code:</strong> {batch.BATCHCODE}
                                <strong> Qty:</strong> {batch.ALLOCATEDQTY}
                              </div>
                            ))}
                          </td>
                          <td>{line.DPUR}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="modal-action flex justify-between mt-6 space-x-3">
                  <button
                    className="py-2 px-4 rounded-md bg-red-600 text-white text-sm sm:text-base"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="py-2 px-4 rounded-md bg-github_FormBackGround text-white text-sm sm:text-base hover:bg-github_FormBackGroundHover"
                    onClick={p.postDelivery}
                    disabled={p.postBtnStatus || p.loading}
                  >
                    {p.loading ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="w-1/2">
            <div className="flex justify-between">
              <span className="text-sm">{p.progress}%</span>
              <span className={p.progress >= 100 && "text-mainLink"}>
                {p.progress >= 100 ? (
                  <span className="text-sm">Completed</span>
                ) : (
                  <span className="text-sm">In-Progress</span>
                )}
              </span>
            </div>
            <div className="relative h-3 bg-gray-420 rounded-full overflow-hidden">
              <div
                className={`h-full bg-mainLink transition-all duration-300 ease-in-out`}
                style={{ width: `${p.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-2">
        <DefInput
          value="DEL MONTE PHILIPPINES INC."
          label="CUSTOMER"
          name="CUSTOMER"
          id="CUSTOMER"
          disabled
        />
        <DefInput
          value="CDMP000001"
          label="CARDCODE"
          name="CARDCODE"
          id="CARDCODE"
          disabled
        />
        {components.map((e) => (
          <DefInput
            label={e.label}
            handler={onChangeHandler}
            id={e.text}
            value={componentsValues[e.name]}
          />
        ))}
        <div>
          <DefInput
            label="COGS Profit Center"
            name="COGS Profit Center"
            value={p.profitCenter}
            handler={(e) => p.setProfitCenter(e.target.value)}
            id="COGS Profit Center"
          />
          {p.filteredProfitCenter.length > 0 && (
            <span className="flex flex-col gap-1 mt-2">
              {p.filteredProfitCenter.map((pCenter) => (
                <span
                  key={pCenter.PrcCode}
                  onClick={() => p.handleSelectProfitCenter(pCenter)}
                  className="p-1 rounded-md bg-mainLink text-white"
                  style={{ cursor: "pointer" }}
                >
                  {pCenter.PrcName} - {pCenter.PrcCode}
                </span>
              ))}
            </span>
          )}
        </div>
        <div>
          <DefInput
            label="Owner"
            name="Owner"
            value={p.searchTerm}
            handler={(e) => p.setSearchTerm(e.target.value)}
            id="Owner"
          />
          {p.filteredEmployees.length > 0 && (
            <span className="flex flex-col gap-1 mt-2">
              {p.filteredEmployees.map((employee) => (
                <span
                  key={employee.empid}
                  onClick={() => p.handleSelectEmployee(employee)}
                  className="p-1 rounded-md bg-mainLink text-white"
                  style={{ cursor: "pointer" }}
                >
                  {employee.Name} - {employee.empid}
                </span>
              ))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
