import React, { useState } from "react";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "./ComponentList";

export default function UserMasterVoid(p) {
  const [voidvalue, setvoidvalue] = useState(0);
  const [postReturnValue, setpostReturnValue] = useState([]);
  const PostValueVoid = async (e) => {
    console.log({ p });
    await EXEC_SQL_InsertOne(814, setpostReturnValue, voidvalue, p.userinfo.id);
  };
  return (
    <div className="flex">
      <div className="pb-2  w-full">
        <DefInput
          label="Void"
          handler={(e) => setvoidvalue(e.target.value)}
          id="DepInput"
          type="email"
          value={voidvalue}
          className="w-full"
          dropDownId={815}
        />
      </div>
      <DefButton
        text="Update"
        onClick={PostValueVoid}
        type="2B"
        className="w-fit px-2 float-right frame mt-4"
      />
    </div>
  );
}
