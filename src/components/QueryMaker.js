import React, { useEffect, useState } from "react";
import { DefButton, DefInput, DefTable, Label } from "./ComponentList";

export default function QueryMaker(props) {
  const columns = [
    {
      name: "name",
      disabled: false,
    },
    {
      name: "datatype",
      disabled: false,
    },
    {
      name: "Option",
    },
  ];

  const [rows, setRows] = useState([]);
  const addRows = (e) => {
    console.log("add Line");
    let rowsID = 0;
    if (rows.length > 0) {
      rowsID = rows[rows.length - 1].ID + 1;
    }
    setRows((e) => [...e, { ID: rowsID, name: "", datatype: "" }]);
  };
  const Components = [
    {
      id: "name",
      label: "Name",
      type: "text",
      colspan: "1",
    },
    {
      id: "datatype",
      label: "Data Type",
      type: "text",
      dropDownId: 964,
      colspan: "1",
    },
  ];
  const [query, setQuery] = useState("");
  const [headerHolder, setHeaderHolder] = useState({});
  const rowshandler = async (e) => {
    // const { id, name, value } = e.target;
    // setRows((p) => ({ ...p, [id]: value }));

    const { value, id, name } = e.target;
    console.log({ value, id, name });
    const updatedList = rows.map((item) => {
      if (parseInt(item.ID) == parseInt(id)) {
        return { ...item, [name]: value };
      } else {
        return item;
      }
    });
    setRows(updatedList);
  };
  const handleOption = (e) => {
    let id = e.target.value;
    const TempContainer = [...rows];
    TempContainer.splice(id, 1);
    setRows(TempContainer);
    console.log({ TempContainer });
  };
  useEffect(() => {
    let queryTemp = "";
    console.log(rows);
    rows.map((item, index) => {
      queryTemp = queryTemp + "declare @" + item.name + " as \n";
    });
    setQuery(queryTemp);
  }, [rows]);

  return (
    <div className="mx-2">
      <DefInput label="Query Title" />
      <DefInput label="Query ID" />

      <Label text="Parameters" className="mt-1" />
      <DefButton
        text="+"
        type="2"
        className="w-10 float-right mt-2 "
        onClick={addRows}
      />
      {/* <div className="grid grid-cols-2 gap-x-2">
        {Components.map((item, index) => (
          <div className={`col-span-${item.colspan} `}>
            <DefInput
              label={item.label}
              id={item.id}
              clearid={item.id}
              type={item.type}
              dropDownId={item.dropDownId}
              handler={headerOnChangeHandler}
            />

            {item.label == "Station" ? <div></div> : ""}
          </div>
        ))}
      </div> */}

      <DefTable
        columns={columns}
        rows={rows}
        btnLabel="Remove"
        spanCSS="w-full"
        handleOption={handleOption}
        onChange={rowshandler}
      />
      {/*
      <Label text="Query" className="mt-1" />
      <textarea className="w-full , h-48 rounded-md   devlayout" />

      <Label text="Query Executabe" className="mt-1" value={"query"} />
      <textarea
        className="w-full , h-48 rounded-md   devlayout"
        value={query} */}
    </div>
  );
}
