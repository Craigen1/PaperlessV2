import React, { useEffect, useState } from "react";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "./ComponentList";

export default function Registration() {
  const [userinfoReg, setuserinfoReg] = useState({});
  const [regRes, setregRes] = useState([]);

  const comps = [
    {
      name: "firstname",
      label: "firstname",
      type: "text",
    },
    {
      name: "lastname",
      label: "lastname",
      type: "text",
    },
    {
      name: "username",
      label: "Username",
      type: "text",
    },
    {
      name: "Password",
      label: "Password",
      type: "password",
    },
    // {
    //   name: "repassword",
    //   label: "Re-Password",
    //   type: "password",
    // },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "deparment",
      label: "Deparment",
      type: "text",
      dropDownId: 898,
    },

    {
      name: "remarks",
      label:
        "Remarks('Please include reason for registration, module nedded and sap account')",
      type: "text",
    },
  ];

  const onChangeHandler = (e) => {
    const { value, id, name } = e.target;
    console.log({ value, id, name });
    setuserinfoReg((p) => ({ ...p, [name]: value }));
    console.log({ userinfoReg });
  };

  const autofocus = (e) => {
    console.log({ e });
  };
  const getIfIsEmpty = (str) => {
    if (str == "" || str == undefined) return false;
    return true;
  };
  const onClickHandler = async (e) => {
    let hasNoEmpty = true;
    hasNoEmpty = getIfIsEmpty(userinfoReg.firstname);
    hasNoEmpty = getIfIsEmpty(userinfoReg.lastname);
    hasNoEmpty = getIfIsEmpty(userinfoReg.username);
    hasNoEmpty = getIfIsEmpty(userinfoReg.Password);
    hasNoEmpty = getIfIsEmpty(userinfoReg.deparment);
    hasNoEmpty = getIfIsEmpty(userinfoReg.email);
    hasNoEmpty = getIfIsEmpty(userinfoReg.remarks);
    console.log({ userinfoReg });
    if (hasNoEmpty == false) {
      alert("all fields are required");
      return;
    }
    await EXEC_SQL_InsertOne(
      893,
      setregRes,
      userinfoReg.firstname, // 0
      userinfoReg.lastname, // 1
      userinfoReg.username, // 2
      userinfoReg.Password, // 3
      userinfoReg.deparment, // 4
      userinfoReg.email, // 5
      userinfoReg.remarks //6
    );
  };

  useEffect(() => {
    try {
      if (regRes.length > 0) {
        if (regRes[0].ID == "-10") {
          alert("Username already taken");
        } else if (regRes[0].ID == "-9") {
          alert("Password does not match");
        } else {
          alert(
            "Account requested, please contact your administrator for confirmation"
          );
        }
      }
    } catch (error) {}
  }, [regRes]);

  return (
    <div>
      <div
        className="frame mx-auto"
        style={{
          width: "308px",
          // border: "1px #21262d solid",
        }}
      ></div>
      <div
        style={{
          width: "308px",
          // border: "1px #21262d solid",
        }}
        className="mx-auto  frame pb-8 "
      >
        {comps.map((item, index) => (
          <>
            <DefInput
              label={item.label}
              name={item.name}
              id={item.name}
              type={item.type}
              handler={onChangeHandler}
              dropDownId={item.dropDownId}
            />
          </>
        ))}
        <DefButton
          text="Submit"
          onClick={onClickHandler}
          type="2B"
          className="w-fit px-2 float-right  frame  mt-4 mx-0"
        />
        <br />
      </div>
    </div>
  );
}
