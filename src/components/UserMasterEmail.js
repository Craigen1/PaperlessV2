import React, { useContext, useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertOne,
} from "./ComponentList";
import { ITopContext } from "../hooks/TopContext";

export default function UserMasterEmail(p) {
  const { userInfo } = useContext(ITopContext);
  const [Email, setEmail] = useState("");
  const [UpdateReturnVAl, setUpdateReturnVAl] = useState("");
  const UpdateEmail = async (e) => {
    console.log(p.userinfo.id);
    console.log(Email);
    await EXEC_SQL_InsertOne(894, setUpdateReturnVAl, p.userinfo.id, Email);
  };
  const onChangeHandler = async (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {}, [p]);

  return (
    <>
      <div className="flex">
        <div className="pb-2  w-full">
          <DefInput
            label="Email"
            handler={onChangeHandler}
            id="DepInput"
            type="email"
            value={Email}
            className="w-full"
          />
        </div>
        <DefButton
          text="Update"
          onClick={UpdateEmail}
          type="2B"
          className="w-fit px-2 float-right frame mt-4"
        />
      </div>
    </>
  );
}
