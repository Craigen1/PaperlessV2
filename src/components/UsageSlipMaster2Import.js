import React, { useEffect, useState } from "react";
import {
  DefButtonWalert,
  EXEC_SQL_InsertMulti_V3,
  EXEC_SQL_InsertOne,
} from "./ComponentList";

export default function UsageSlipMaster2Import(p) {
  const Datenw = new Date();

  const [rows, setrows] = useState([]);

  const [List, setList] = useState([]);
  const [setExecRes, setsetExecRes] = useState([]);
  const colsSQL = [
    {
      name: "TypeEntry",
    },
    {
      name: "RevEntry",
    },
    {
      name: "Usage",
    },
    {
      name: "Size",
    },
    {
      name: "UoM",
    },
    {
      name: "Date",
    },
    {
      name: "ItemCode",
    },
    {
      name: "void",
    },
  ];
  const post = async () => {
    const newMap = rows.map((item) => {
      return {
        TypeEntry: p.HeaderProration,
        RevEntry: p.HeaderRev,
        Usage: parseFloat(item.quantity.replace(",", "")),
        Size: p.HeaderSize,
        UoM: item.uom,
        Date: Datenw.toISOString().substring(0, 10),
        ItemCode: item.item,
        void: "1",
      };
    });
    // console.log({ newMap });
    // return;
    let addSQL = `
      update OUGS set void = '0'
      where TypeEntry= '${p.HeaderProration}' and
            RevEntry = '${p.HeaderRev}' and 
            Size='${p.HeaderSize}'
 `;
    await EXEC_SQL_InsertMulti_V3(
      1000,
      setExecRes,
      colsSQL,
      newMap,
      "OUGS",
      addSQL
    );
  };
  const [isonCHeck, setisonCHeck] = useState(false);

  const importx = async () => {
    const text = await navigator.clipboard.readText();
    let rawRows = text.split("\n");
    console.log({ rawRows });
    setrows([]);
    try {
      for (let i = 0; i < rawRows.length - 1; i++) {
        let rawCols = rawRows[i].split("\t");
        console.log({ rawCols });
        console.log(rawCols[0]);

        if (rawCols[0].includes("/ ")) {
          let alternatinvs = rawCols[0].split("/ ");
          alternatinvs.map((q) => {
            console.log(q, rawCols[1], rawCols[2]);
            setrowsc(q, rawCols[1], rawCols[2]);
          });
        } else {
          setrowsc(rawCols[0], rawCols[1], rawCols[2]);
        }
      }
      setisonCHeck(true);
    } catch (error) {
      console.log(error);
    }
    // checker();
  };

  const setrowsc = (q, w, i) => {
    setrows((e) => [
      ...e,
      {
        item: q || "",
        quantity: w || 0,
        uom: i || "",
      },
    ]);
  };

  useEffect(() => {
    if (isonCHeck) checker();
  }, [isonCHeck]);
  const [RmList, setRmList] = useState([]);
  const [loading, setloading] = useState(false);
  const GetRMs = async () => {
    setloading(true);
    await EXEC_SQL_InsertOne(787, setRmList);
    setloading(false);
  };
  useEffect(() => {
    GetRMs();
  }, []);
  const checker = () => {
    let i = 0;
    setisonCHeck(false);
    let newRow = rows.map((e, i) => {
      let xx = RmList.filter((ee) => ee.ItemCode == e.item).map((eee, iii) => {
        return {
          ...e,
        };
      });
      return { ...xx[0] };
    });
    //console.log(newRow);
    setList(newRow);
  };

  let onRemote = false;
  useEffect(() => {
    setrows(List);
    //console.log(List);

    if (onRemote) return;
    onRemote = true;
    let arrayLength = List.length;
    for (let i = 0; i < arrayLength; i++) {
      if (List[i].item == undefined) {
        //console.log("pumasok");
        RemoveHandler(i, List, setList);
      }
    }
    onRemote = false;
  }, [List]);

  const RemoveHandler = (index, array, setArray) => {
    //console.log("pumasok");
    const TempContainer = [...array];
    TempContainer.splice(index, 1);
    setArray(TempContainer);
    //console.log({ TempContainer });
  };

  return (
    <div>
      <div className="flex justify-between mt-4">
        <button onClick={() => setrows([])} className="btn btn-warning btn-sm">
          Clear
        </button>
        <button
          onClick={importx}
          className={
            loading
              ? " btn loading btn-primary m-0 btn-sm"
              : " btn btn-primary m-0 btn-sm"
          }
        >
          Import
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Quantity</th>
              <th>UoM</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e, i) => (
              <tr key={i}>
                <th>{i}</th>
                <td>{e.item}</td>
                <td>{e.quantity}</td>
                <td>{e.uom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length > 1 && (
        <DefButtonWalert
          id="PostUsageMaster"
          className="btn-primary float-right "
          text="Post"
          onClick={post}
          title="WARNING"
          msg="Are you sure to post Import this list? 
        This Function will OVERIDE the existing data with the selected
          Headers please use this with conscious
        "
        />
      )}
      <br />
      <br />
      <br />
      <footer class="footer p-10 bg-base-200 text-base-content">
        <nav>
          <h6 class="footer-title">NOTE</h6>
          <p>
            Once Imported the system will automaticaly check if the item is on
            SAP B1 Itemmaster if it is not found it will be automaticaly remove
          </p>
        </nav>
        <nav>
          <h6 class="footer-title bg-warning px-2">WARNING</h6>
          <p>
            This Function will OVERIDE the existing data with the selected
            Headers please use this with conscious
          </p>
        </nav>
      </footer>
    </div>
  );
}
