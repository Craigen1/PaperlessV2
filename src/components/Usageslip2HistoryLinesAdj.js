import React, { useContext, useEffect, useState } from "react";
import { DefButton, DefTable, EXEC_SQL_InsertOne } from "./ComponentList";
import { LoadingSpinner } from "../assets/SVGs";
import { ITopContext } from "../hooks/TopContext";

export default function Usageslip2HistoryLinesAdj(p) {
  const { userInfo, setmsg } = useContext(ITopContext);

  const columns = [
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
      name: "qty",
      disabled: true,
    },
    {
      name: "adj",
      disabled: false,
      type: "number",
    },

    {
      name: "UoM",
      disabled: true,
    },

    {
      name: "Option",
    },
  ];
  const [loading, setloading] = useState(false);
  const [rows, setRows] = useState([]);
  const [UpdateStats, setUpdateStats] = useState([]);
  const handleOption = async (e) => {
    const { value, id, name } = e.target;
    console.log(rows[id]);
    setloading(true);
    // const newMap = [...rows];
    // newMap.splice(Number(id), 1);
    // setRows(newMap);
    setmsg({
      type: "",
      text: ``,
    });
    await EXEC_SQL_InsertOne(
      901,
      setUpdateStats,
      rows[id].DocEntry,
      rows[id].adj
    );
    setloading(false);
    setmsg({
      type: "success",
      text: `Data updated!!`,
    });
    alert("Data updated!!");
  };

  const get902 = async (e) => {
    try {
      setloading(true);
      setmsg({
        type: "",
        text: ``,
      });
      await EXEC_SQL_InsertOne(902, setRows, p.rows[p.index].id);

      setloading(false);
    } catch (error) {
      setmsg({
        type: "error",
        text: `${error}`,
      });
    }
  };

  const handleCellChange = (set, id, field, value) => {
    set((prevData) =>
      prevData.map((item, index) =>
        index == id ? { ...item, [field]: value } : item
      )
    );
  };

  const DefTableonChange = (e) => {
    const { id, name, value } = e.target;
    console.log({ id, name, value });
    console.log(e.target);
    handleCellChange(setRows, id, [name], value);
  };
  const [DuplicateBtnPrp, setDuplicateBtnPrp] = useState({
    step: "1",
    text: `Duplicate to batch ${parseInt(p.rows[p.index].batch) + 1}`,
  });
  const [duplicateInfo, setduplicateInfo] = useState([]);
  const duplicate = async (e) => {
    const { id, name } = e.target;
    console.log({ id, name });
    if (id == "1") {
      setDuplicateBtnPrp({
        step: "2",
        text: `Confirm duplication`,
      });
    } else {
      setDuplicateBtnPrp({
        step: "1",
        text: `Duplicate to batch ${parseInt(p.rows[p.index].batch) + 1}`,
      });
      await EXEC_SQL_InsertOne(39, setduplicateInfo, p.rows[p.index].id);
      const searchBtn = document.getElementById("search");
      searchBtn.click();
      p.sethasSelected(false);
    }
  };

  const [returnUpdateStatus, setreturnUpdateStatus] = useState([]);

  const updateStatus = async (e) => {
    const { value } = e.target;

    await EXEC_SQL_InsertOne(
      762,
      setreturnUpdateStatus,
      value,
      p.rows[p.index].id
    );
    alert("updated!");
  };
  useEffect(() => {
    get902();
  }, [p.index]);

  return (
    <>
      <DefButton
        type="2B"
        text="Back"
        className="btn-primary mx-2"
        onClick={() => {
          p.sethasSelected(false);
        }}
      />
      <DefButton
        type="2B"
        text={DuplicateBtnPrp.text}
        id={DuplicateBtnPrp.step}
        className="btn-primary mx-2 float-right"
        onClick={duplicate}
      />

      <div className=" mt-8">{/* {loading && <LoadingSpinner />} */}</div>
      <div className="overflow-x-auto">
        <table className="table ">
          <tbody>
            <tr>
              <td>MNF</td>
              <td>{p.rows[p.index].MNFdate}</td>
            </tr>
            <tr>
              <td>Created By</td>
              <td>{p.rows[p.index].CreatedBy}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>{p.rows[p.index].UsageType}</td>
            </tr>
            <tr>
              <td>Rev</td>
              <td>{p.rows[p.index].RevDesc}</td>
            </tr>
            <tr>
              <td>Size</td>
              <td>{p.rows[p.index].size}</td>
            </tr>
            <tr>
              <td>Machine</td>
              <td>{p.rows[p.index].Machine}</td>
            </tr>
            <tr>
              <td>Station</td>
              <td>{p.rows[p.index].station}</td>
            </tr>
            <tr>
              <td>Batch</td>
              <td>{p.rows[p.index].batch}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                <div className="flex w-full gap-2">
                  <select name="status" id="status" onChange={updateStatus}>
                    <option value="open">Open</option>
                    <option value="close">Close</option>
                  </select>
                  {/* 
                  <DefButton
                    text="Update"
                    onClick={[]}
                    type="2B"
                    className="btn btn-sm btn-primary p-0 m-0 px-2"
                  /> */}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="frame overflow-auto">
        <DefTable
          columns={columns}
          rows={rows}
          btnLabel="Update ADJ"
          spanCSS="w-full"
          className=""
          loading={true}
          onChange={DefTableonChange}
          handleOption={handleOption}
        />
      </div>
    </>
  );
}
