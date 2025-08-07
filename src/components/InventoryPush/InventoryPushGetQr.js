import React, { useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DynamicTable,
  EXEC_SQL_InsertOne,
} from "../ComponentList";

export default function InventoryPushGetQr() {
  const [rows, setrows] = useState([]);
  const [FgCode, setFgCode] = useState("");

  const getQuery = async () => {
    await EXEC_SQL_InsertOne(773, setrows, FgCode);
  };

  //   useEffect(() => {
  //     getQuery();
  //   }, []);

  const onChangeHandler = (e) => {
    const { value, id, name } = e.target;
    console.log({ value, id, name });
    setFgCode(value);
  };

  //   const DynamicTable = (p) => {
  //     if (p.rows.length === 0) return null;

  //     const renderHeader = () => {
  //       const titles = Object.keys(p.rows[0]);
  //       return (
  //         <tr>
  //           {titles.map((item, key) => (
  //             <th className="border px-2" key={key}>
  //               {item}
  //             </th>
  //           ))}
  //         </tr>
  //       );
  //     };

  //     const renderRows = () => {
  //       return p.rows.map((row, index) => (
  //         <tr key={index}>
  //           {Object.keys(row).map((item, key) => (
  //             <td className="border px-2" key={key}>
  //               {row[item]}
  //             </td>
  //           ))}
  //         </tr>
  //       ));
  //     };

  //     return (
  //       <table>
  //         <thead>{renderHeader()}</thead>
  //         <tbody>{renderRows()}</tbody>
  //       </table>
  //     );
  //   };

  return (
    <div>
      <div className="flex ">
        <DefInput
          handler={onChangeHandler}
          label="Item"
          className="w-fit"
          dropDownId={872}
        />
        <DefButton
          text="Search"
          onClick={getQuery}
          className="btn-primary btn btn-sm mt-4"
        />
      </div>
      <DynamicTable rows={rows} />
    </div>
  );
}
