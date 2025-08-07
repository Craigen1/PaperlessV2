import React from "react";
import { useState } from "react";
import { Label } from "../ComponentList";
import { DefButton, DefInput } from "../ComponentList";

function EditList({ item, setUpdateState, onUpdate }) {
  const [workdesc, setWorkDesc] = useState(item.workdesc);
  const [asshazard, setAssHazard] = useState(item.asshazard);
  const [currctrl, setCurrCtrl] = useState(item.currctrl);
  const [currctrleff, setCurrCtrlEff] = useState(item.currctrleff);
  const [risklevel, setRiskLevel] = useState(item.risklevel);
  const [propctrl, setPropCtrl] = useState(item.propctrl);

  const handleUpdate = () => {
    onUpdate({
      workdesc,
      asshazard,
      currctrl,
      currctrleff,
      risklevel,
      propctrl,
    });
    setUpdateState(false);
  };

  const handleCancel = () => {
    setUpdateState(true);
  };

  return (
    <>
      <div className="grid grid-cols-7 gap-2 border">
        <input
          onChange={(e) => setWorkDesc(e.target.value)}
          value={workdesc}
          className="w-28 md:w-24 border-mainLink"
          type="text"
        />
        <input
          onChange={(e) => setAssHazard(e.target.value)}
          value={asshazard}
          className="w-28 md:w-24 border-mainLink"
          type="text"
        />
        <input
          onChange={(e) => setCurrCtrl(e.target.value)}
          value={currctrl}
          className="w-28 md:w-24 border-mainLink"
          type="text"
        />
        <input
          onChange={(e) => setCurrCtrlEff(e.target.value)}
          value={currctrleff}
          className="w-28 md:w-24 border-mainLink"
          type="text"
        />
        <input
          onChange={(e) => setRiskLevel(e.target.value)}
          value={risklevel}
          className="w-28 md:w-24 border-mainLink"
          type="text"
        />
        <input
          onChange={(e) => setPropCtrl(e.target.value)}
          value={propctrl}
          className="w-28 md:w-24 border-mainLink"
          type="text"
        />
        <div className="flex">
          <button
            onClick={handleUpdate}
            className="text-white w-12 h-6 bg-github_ButtonGreen text-xs rounded-md px-1 my-1 py-1"
          >
            Update
          </button>
          <button
            onClick={handleCancel}
            className="text-white w-12 h-6 bg-GitHub-Pallet100 text-xs rounded-md mx-1 my-1 px-1 py-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default function JHAWorkSheetMain() {
  const [data1, setData1] = useState([]);
  const [info1, setInfo1] = useState([]);
  const [val1, setVal1] = useState([]);
  const [workDesc, setWorkDesc] = useState("");
  const [assHazard, setAssHazard] = useState("");
  const [currCtrl, setCurrCtrl] = useState("");
  const [currCtrlEff, setCurrCtrlEff] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [propCtrl, setPropCtrl] = useState("");
  const [input, setInput] = useState([]);
  const [updateState, setUpdateState] = useState(false);

  const handlerNew = () => {
    if (
      workDesc.length == 0 ||
      assHazard.length == 0 ||
      currCtrl.length == 0 ||
      currCtrlEff.length == 0 ||
      riskLevel.length == 0 ||
      propCtrl.length == 0 ||
      workDesc == undefined ||
      assHazard == undefined ||
      currCtrl == undefined ||
      currCtrlEff == undefined ||
      riskLevel == undefined ||
      propCtrl == undefined
    )
      return;
    setInput((e) => [
      ...e,
      {
        workdesc: workDesc,
        asshazard: assHazard,
        currctrl: currCtrl,
        currctrleff: currCtrlEff,
        risklevel: riskLevel,
        propctrl: propCtrl,
      },
    ]);
  };

  const ChangeHandler = (e) => {
    const { id, value } = e.target;
    if (id == "workdesc") setWorkDesc(value);
    if (id == "asshazard") setAssHazard(value);
    if (id == "currctrl") setCurrCtrl(value);
    if (id == "currctrleff") setCurrCtrlEff(value);
    if (id == "risklevel") setRiskLevel(value);
    if (id == "propctrl") setPropCtrl(value);
  };

  const data = [
    {
      label: "Date",
      id: "Date1",
      type: "date",
    },
    {
      label: "Division Dept.",
      id: "Division Dept.",
      type: "text",
    },
    {
      label: "Reference No.",
      id: "Ref. no.",
      type: "number",
    },
    {
      label: "Area",
      id: "Area",
      type: "text",
    },
    {
      label: "Location/Equipment/Task/Process Assessed:",
      id: "LETP",
      type: "text",
    },
    {
      label: "Function Operational Unit:",
      id: "FOU",
      type: "text",
    },
    {
      label: "JHA Team Members:",
      id: "JHA Members",
      type: "text",
    },
  ];
  const info = [
    {
      label: "JHA Reported To:",
      id: "JHA Reported To",
      type: "text",
    },
    {
      label: "Date Reported:",
      id: "Date Reported",
      type: "date",
    },
  ];

  const val = [
    {
      label: "To be Completed by Manager/Supervisor:",
      id: "Manager/Supervisor",
      type: "text",
    },
    {
      label: "Control Presented Approved for Implementation",
      id: "Implementation:",
      type: "text",
    },
    {
      label: "Date",
      id: "Date2:",
      type: "date",
    },
    {
      label: "JHA Registered for a Formal Risk Assessment:",
      id: "FRA:",
      type: "text",
    },
    {
      label: "Date",
      id: "Date3:",
      type: "date",
    },
  ];

  const DataChangeHandler = (e) => {
    const { value, id } = e.target;
    setData1((p) => ({ ...p, [id]: value }));
  };
  const DataChangeHandler1 = (e) => {
    const { value, id } = e.target;
    setInfo1((p) => ({ ...p, [id]: value }));
  };
  const DataChangeHandler2 = (e) => {
    const { value, id } = e.target;
    setVal1((p) => ({ ...p, [id]: value }));
  };

  const handleDelete = (index) => {
    input.splice(index, 1);
    setInput([...input]);
    alert("Deleted successfuly!");
  };

  const handleEdit = (index) => {
    setUpdateState(index);
  };

  const ShowData = () => {
    console.log({ data1, info1, val1, input });
  };
  return (
    <>
      <main className="frame">
        <div className="mt-2 shadow-md rounded-md px-2 py-2 text-sm">
          {data.map((prod) => (
            <div key={prod.id}>
              <DefInput
                className="h-9"
                label={prod.label}
                id={prod.id}
                type={prod.type}
                handler={DataChangeHandler}
              />
            </div>
          ))}
        </div>

        <div>
          <div>
            <div className="shadow-md rounded-md px-2 py-2 my-2 grid md:grid-cols-7 ">
              <div className="flex flex-col justify-center items-center text-xs col-span-2 rounded-md border mx-1">
                <Label
                  text="Work Description"
                  className="text-[15px] w-20 text-center"
                />
                <input
                  className="w-52 h-8"
                  onChange={ChangeHandler}
                  id="workdesc"
                  value={workDesc}
                  type={"text"}
                />
                <Label
                  text="Associated Hazards"
                  className="text-[15px] text-center"
                />
                <input
                  className="w-52 h-8"
                  onChange={ChangeHandler}
                  id="asshazard"
                  value={assHazard}
                  type={"text"}
                />
                <Label
                  text="Current Control"
                  className="text-[15px] text-center"
                />
                <input
                  className="w-52 h-8"
                  onChange={ChangeHandler}
                  id="currctrl"
                  value={currCtrl}
                  type={"text"}
                />
                <Label
                  text="Current Control Effective? (Yes / No)"
                  className="text-[15px] text-center"
                />
                <input
                  className="w-52 h-8"
                  onChange={ChangeHandler}
                  id="currctrleff"
                  value={currCtrlEff}
                  type={"text"}
                />
                <Label text="Risk Level" className="text-[15px] text-center" />
                <input
                  className="w-52 h-8"
                  onChange={ChangeHandler}
                  id="risklevel"
                  value={riskLevel}
                  type={"text"}
                />
                <Label
                  text="Proposed Control"
                  className="text-[15px] text-center"
                />
                <input
                  className="w-52 h-8"
                  onChange={ChangeHandler}
                  id="propctrl"
                  value={propCtrl}
                  type={"text"}
                />
                <div>
                  <DefButton
                    className="h-9 w-56 my-2"
                    onClick={handlerNew}
                    text="Add new"
                  />
                </div>
              </div>
              <div className="col-span-5">
                <div className="grid grid-cols-7 md:gap-2 px-2 border rounded-md">
                  <div className="font-medium">Work Description </div>
                  <div className="font-medium">Associated Hazards </div>
                  <div className="font-medium">Current Control </div>
                  <div className="font-medium">
                    Current Control Effective? (Yes/No){" "}
                  </div>
                  <div className="font-medium">Risk Level </div>
                  <div className="font-medium">Proposed Control </div>
                  <div className="font-medium">Action </div>
                </div>
                <div className=" px-2 my-1">
                  {input.map((item, index) =>
                    updateState === index ? (
                      <EditList
                        key={index}
                        item={item}
                        setUpdateState={setUpdateState}
                        onUpdate={(updatedData) => {
                          const updateInput = [...input];
                          updateInput[index] = updatedData;
                          setInput(updateInput);
                        }}
                      />
                    ) : (
                      <>
                        <div className="hover:bg-gray-500" key={item.id}>
                          <div className="grid grid-cols-7 gap-3 text-xs md:text-sm md:gap-24 border px-1 rounded-sm py-1">
                            <div className="flex w-28">
                              <span>{item.workdesc}</span>
                            </div>
                            <div className="flex w-28">
                              <span>{item.asshazard}</span>
                            </div>
                            <div className="flex w-28">
                              <span>{item.currctrl}</span>
                            </div>
                            <div className="flex w-28">
                              <span>{item.currctrleff}</span>
                            </div>
                            <div className="flex w-28">
                              <span>{item.risklevel}</span>
                            </div>
                            <span>{item.propctrl}</span>
                            <div className="flex">
                              <button
                                className="text-github_ButtonGreen mx-1"
                                onClick={() => handleEdit(index)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-5 h-5"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </button>
                              <button
                                className="text-GitHub-Pallet100 mx-3"
                                onClick={() => handleDelete(index)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-5 h-5"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shadow-md rounded-md px-2 py-2 text-sm">
          {info.map((data) => (
            <div key={data.id}>
              <DefInput
                className="h-9"
                label={data.label}
                id={data.id}
                type={data.type}
                handler={DataChangeHandler1}
              />
            </div>
          ))}
        </div>

        <div className="shadow-md rounded-md px-2 py-2 text-sm">
          {val.map((item) => (
            <div key={item.id}>
              <DefInput
                className="h-9"
                label={item.label}
                id={item.id}
                type={item.type}
                handler={DataChangeHandler2}
              />
            </div>
          ))}
        </div>
        <div className="py-2 flex justify-end">
          <DefButton
            className="h-9 w-28 my-2 text-white"
            onClick={ShowData}
            text="Submit"
          />
        </div>
      </main>
    </>
  );
}
