import React, { useContext, useEffect, useState } from "react";
import {
  DefInput,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertOne,
} from "./ComponentList";
import { ITopContext } from "../hooks/TopContext";

export default function UserMasterDep(p) {
  const { userInfo } = useContext(ITopContext);
  const [department, setdepartment] = useState("");
  const [UpdateReturnVAl, setUpdateReturnVAl] = useState("");
  const UpdateDepartment = async (e) => {
    await EXEC_SQL_InsertOne(897, setUpdateReturnVAl, p.userinfo.id, e);
  };
  const onChangeHandler = async (e) => {
    setdepartment(e.target.value);
    console.log(e.target.value);
    UpdateDepartment(e.target.value);
  };

  useEffect(() => {}, [p]);

  return (
    <>
      <div className="pb-2">
        <DefInput
          label="Department"
          handler={onChangeHandler}
          dropDownId={898}
          id="DepInput"
          value={department}
        />
      </div>
    </>
  );
}
