import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  DefButton,
  DefInput,
  EXEC_SQL,
  EXEC_SQL_InsertOne,
  EXEC_SQL_W_LABEL,
  NoteInfo,
} from "../ComponentList";

export default function SelfBillingDmpUpload() {
  const [ErrorNote, setErrorNote] = useState({
    title: "",
    body: "",
    type: "",
    visible: "",
  });
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [SqlResult, setSqlResult] = useState([]);
  const handleTabs = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };
  const handleUploadFile = async (e) => {
    console.log(data);
  };
  const [ATBID, setATBID] = useState([{ ID: 0 }]);
  const [lastID, setlastID] = useState([{ ID: 0 }]);
  const [CheckResult, setCheckResult] = useState([]);

  const getATB_ID = async () => {
    setATBID([{ ID: 0 }]);
    await EXEC_SQL(950, setATBID, "");
  };
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    try {
      if (uploadedFile) {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          const { result } = event.target;
          const workbook = XLSX.read(result, {
            type: "binary",
            password: "205180644",
          });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          setData(jsonData);
        };
        fileReader.readAsBinaryString(uploadedFile);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const headerOnChangeHandler = async (e) => {
    const header = e.target.value;
    setData((data) => [header, ...data]);
  };
  const [LastRow, setLastRow] = useState([]);
  const [lastLastRow, setlastLastRow] = useState([]);
  const ConvertExcelToSQLSet = async (e) => {
    data.slice(1).map((row, index) => {
      setLastRow(row);
      return;
    });
  };
  const handleSqlResult = async (e) => {
    let sql =
      " INSERT INTO OSBH (CreatedDate,void) VALUES	(convert(datetime,GETDATE(),2) ,'1')  ;  INSERT INTO[dbo].[OSBM]([headerEntry],[PoNumberRef], [ProdDate], [MatDoc], [GrDate], [DPUR], [Itemcode], [ItemName], [Quantity], [UnitPrice], [TotalAmount], [Vat], [TotalAmVat], [Currency]) VALUES ";
    data.slice(1).map((row, index) => {
      sql = sql + "( @@IDENTITY ,";
      row.map((cell, index) => (sql = sql + "'" + cell + "',"));
      sql = sql.slice(0, -1);
      sql = sql + "),";
    });
    sql = sql.slice(0, -1);
    sql = sql + " SELECT @@IDENTITY as ID";
    await EXEC_SQL_W_LABEL(sql, setSqlResult);
    await getATB_ID();
  };

  const [FootNote, setFootNote] = useState({
    title: "",
    body: "",
    type: "e",
    visible: false,
  });
  const getifExisting = async () => {
    await EXEC_SQL_InsertOne(
      942,
      setCheckResult,
      LastRow[0],
      LastRow[2],
      LastRow[4]
    );
  };
  useEffect(() => {
    if (LastRow.length > 0) {
      handleSqlResult();
    }
  }, [LastRow]);

  useEffect(() => {
    if (SqlResult === "error") {
      setFootNote({
        title: "Error uploading file",
        body: "Please check the file try again",
        type: "e",
        visible: true,
      });
    } else {
      setFootNote({
        title: "File uploaded  successfully",
        body: "You can check the file on history tab",
        type: "s",
        visible: true,
      });
    }
  }, [SqlResult]);
  useEffect(() => {
    getATB_ID();
    EXEC_SQL(950, setlastID, "");
  }, []);
  useEffect(() => {
    if (ATBID[0].ID !== 0) {
      if (lastID[0].ID == ATBID[0].ID) {
        setFootNote({
          title: "Error uploading file",
          body: "Please check the file try again",
          type: "e",
          visible: true,
        });
      } else {
        setlastID(ATBID);
      }
    }
  }, [ATBID[0].ID]);
  useEffect(() => {
    if (CheckResult.length > 0) {
      setErrorNote({
        title: "Error uploading file",
        body: "File Already existing",
        type: "e",
        visible: true,
      });
      return;
    }

    if (CheckResult.length == 0) {
      if (data.length > 0) {
        handleSqlResult();
      }
    }
  }, [CheckResult]);

  return (
    <div>
      <div className="frame pt-1 pb-1.5">
        <input type="file" onChange={handleFileChange} className="mt-2" />
      </div>
      <div className="flex py-2  frame">
        <DefInput
          id={"Document #"}
          label={"Document #"}
          name={"Document #"}
          value={ATBID[0].ID}
          handler={headerOnChangeHandler}
        />

        <div className="w-fit">
          <DefButton
            text="Add"
            className="btn btn-primary btn-sm mt-4 p-0 px-2 "
            onClick={ConvertExcelToSQLSet}
          />
        </div>
      </div>
      {CheckResult.length > 0 ? (
        <>
          <NoteInfo
            title={FootNote.title}
            body={FootNote.body}
            className="mt-2 mx-2"
            type={FootNote.type}
            visible={FootNote.visible}
          />
        </>
      ) : (
        ""
      )}
      {data.length > 0 && (
        <div className=" frame  left-0 overflow-auto ">
          <table className="whitespace-nowrap ">
            <thead className="whitespace-nowrap bg-white ">
              <tr className="whitespace-nowrap">
                {data[0].map((header, index) => (
                  <th key={index} className="text-sm mr-1 px-1 ">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="whitespace-nowrap pb-2 ">
              {data.slice(1).map((row, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "text-sm mr-1 px-1"
                      : "text-sm mr-1 px-1 bg-WhiteMode-Background000"
                  }
                >
                  {row.map((cell, index) => (
                    <td key={index} className="text-sm mr-1 px-1">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* <DefButton text="Add" className="w-fit px-2 " label="" /> */}
      {/* <div className="frame p-0">
        <NoteInfo
          title={ErrorNote.title}
          body={ErrorNote.body}
          className="mt-2"
          type={ErrorNote.type}
          visible={ErrorNote.visible}
        />
      </div> */}
    </div>
  );
}
