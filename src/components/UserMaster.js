import React, { useContext, useState } from "react";
import { DefButton } from "./ComponentList";
import UserMasterAdd from "./UserMasterAdd";
import { ITopContext } from "../hooks/TopContext";

export default function UserMaster() {
  const [btndbtnid, setBtndbtnid] = useState(0);

  const clickHandler = (e) => {
    const { id } = e.target;
    setBtndbtnid(id);
  };

  return (
    <>
      <div className="frame ">
        <DefButton
          text="Create"
          type={btndbtnid == 0 ? "2" : "2B"}
          className="w-fit px-2"
          id="0"
          onClick={clickHandler}
        />
        <DefButton
          text="Update"
          type={btndbtnid == 1 ? "2" : "2B"}
          className="w-fit px-2"
          id="1"
          onClick={clickHandler}
        />
      </div>

      <div className=" py-2">
        <UserMasterAdd
          type={btndbtnid == 0 ? "CREATE" : btndbtnid == 1 ? "UPDATE" : ""}
        />
      </div>
    </>
  );
}
