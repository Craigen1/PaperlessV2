import React, { useContext, useEffect, useState } from "react";
import { DefButton, DefInput } from "./ComponentList";
import { KeyIcon } from "@heroicons/react/outline";
import LicenseModule from "./LicenseModule";
import { ITopContext } from "../hooks/TopContext";

export default function LicenseRequest() {
  const [UserInfo, setUserInfo] = useState([]);
  const [userid, setuserid] = useState(-1);
  const [loading, setloading] = useState(false);
  const [Errorr, setErrorr] = useState(false);

  const [userToLogin, setUserTologin] = useState({
    id: 0,
    username: "",
    password: "",
  });
  const LoginInfo = (val) => {
    const { name, value } = val.target;
    setUserTologin((preState) => ({ ...preState, [name]: value }));
    console.log({ userToLogin });
  };

  const keypressHandler = (e) => {
    if (e.key == "Enter") {
      logMeIn();
    }
  };

  const logMeIn = async () => {
    setloading(true);
    const newData = await fetch("/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
      },
      body: JSON.stringify({
        ...userToLogin,
      }),
    })
      .then((res) => res.json())
      .catch(() => {
        setloading(false);
        return;
      });
    setUserInfo(newData[0]);
    setuserid(newData[0].ID);
    setloading(false);
  };
  useEffect(() => {
    if (userid == 0) {
      setErrorr(true);
    } else {
      setErrorr(false);
    }
  }, [userid]);

  return (
    <>
      <div className="frame max-w-sm  mx-auto mt-10 p-2 flex">
        <KeyIcon className="h-5 w-5 mr-2 mt-1 " />
        <p className="p-0 m-0 font-bold">License Request</p>
      </div>
      <div className="frame max-w-sm  mx-auto p-2">
        <p className="m-0 font-light">Enter your login information</p>
        <DefInput
          id="username"
          handler={LoginInfo}
          type="text"
          label="Username"
          onKeyUp={keypressHandler}
        />
        <DefInput
          id="password"
          handler={LoginInfo}
          type="password"
          label="Password"
          onKeyUp={keypressHandler}
        />

        <DefButton
          text="Login"
          className="mt-2"
          onClick={logMeIn}
          loading={loading}
        />
        {Errorr ? (
          <p>invalid login details please check your username password</p>
        ) : (
          ""
        )}
      </div>
      {userid > 0 ? (
        <>
          <div className="frame max-w-sm  mx-auto p-2  mt-4 flex">
            <KeyIcon className="h-5 w-5 mr-2 mt-1 " />
            <p className="p-0 m-0 font-bold">Allocated License</p>
            <br></br>
          </div>
          <div className="frame max-w-sm  mx-auto p-2 ">
            <LicenseModule userid={userid} />
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
