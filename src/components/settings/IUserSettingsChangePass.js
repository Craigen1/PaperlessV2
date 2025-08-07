import React, { useContext, useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertOne,
} from "../ComponentList";
import { ITopContext } from "../../hooks/TopContext";

export default function IUserSettingsChangePass() {
  const { userInfo, setmsg } = useContext(ITopContext);

  const ComponentList = [
    {
      label: "Username",
      name: "username",
      disable: true,
      type: "text",
    },
    {
      label: "Old Password",
      name: "oldpassword",
      disable: false,
      type: "password",
    },
    {
      label: "New Password",
      name: "newPassword",
      disable: false,
      type: "password",
    },
    {
      label: "Confirm New Password",
      name: "cnewpassword",
      disable: false,
      type: "password",
    },
  ];
  const [ComponentsValues, setComponentsValues] = useState({
    oldpassword: "",
    newPassword: "",
    cnewpassword: "",
  });
  const [PasswordMsg, setPasswordMsg] = useState("");
  const onChangeHandler = (p) => {
    const { id, name, value } = p.target;
    console.log({ id, name, value });
    setComponentsValues((e) => ({
      ...e,
      [name]: value,
    }));

    // var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;
  };
  const [ConfirmButtonText, setConfirmButtonText] = useState("Confirm");
  const [returnValue, setreturnValue] = useState([{ msg: "" }]);
  const onClickHandler = (e) => {
    if (ConfirmButtonText == "Confirm") setConfirmButtonText("Please Confirm");
    else {
      setConfirmButtonText("Confirm");
      EXEC_SQL_InsertOne(
        900,
        setreturnValue,
        userInfo.ID,
        ComponentsValues.newPassword
      );
    }
  };
  const onClickHandlerClear = (e) => {
    // var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;
  };
  useEffect(() => {
    // var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;

    if (ComponentsValues.oldpassword != "") {
      // if wrong old  password
      if (ComponentsValues.oldpassword != userInfo.password) {
        setPasswordMsg("wrong password");
        return;
      } else {
        setPasswordMsg("");
      }
    }
  }, [ComponentsValues.oldpassword]);

  useEffect(() => {
    // var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;

    // if new and confirm password !=
    if (ComponentsValues.newPassword != ComponentsValues.cnewpassword) {
      setPasswordMsg("new password does not match");
    } else {
      // if (format.test(ComponentsValues.newPassword)) {
      //   setPasswordMsg("Please follow format!!");
      //   console.log("format problem");

      //   return;
      // } else {
      //   setPasswordMsg("");
      // }
      if (ComponentsValues.newPassword == userInfo.password) {
        setPasswordMsg("new password must not be the old password");
      } else {
        setPasswordMsg("");
      }
    }
  }, [ComponentsValues.newPassword, ComponentsValues.cnewpassword]);

  useEffect(() => {
    setComponentsValues((e) => ({
      ...e,
      username: userInfo.username,
    }));
  }, []);
  useEffect(() => {
    setmsg({
      type: returnValue[0].msg != undefined ? "success" : "",
      text: returnValue[0].msg,
    });
  }, [returnValue]);

  return (
    <div>
      <div className="frame pb-2">
        {ComponentList.map((item, index) => (
          <React.Fragment key={index}>
            <DefInput
              label={item.label}
              id={item.name}
              name={item.name}
              type={item.type}
              handler={onChangeHandler}
              disabled={item.disable}
              value={ComponentsValues[item.name]}
            />
          </React.Fragment>
        ))}
        {/* <p className="text-sm  p-0 m-0">Password Format: </p>
        <p className="text-sm  p-0 m-0">Length 4-16</p>
        <p className="text-sm  p-0 m-0">
          Must contain a special character
          {` [!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]`}
        </p> */}
        <p className="errorMsg p-0 m-0 text-sm">{PasswordMsg} </p>
      </div>

      <DefButton
        text={ConfirmButtonText}
        onClick={onClickHandler}
        type={PasswordMsg == "" ? "2B" : "2"}
        disabled={!PasswordMsg == "" ? true : false}
        className="w-fit px-2 float-right frame"
      />
    </div>
  );
}
