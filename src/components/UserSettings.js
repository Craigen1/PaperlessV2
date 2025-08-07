import {
  ArrowNarrowDownIcon,
  EyeIcon,
  EyeOffIcon,
  QrcodeIcon,
} from "@heroicons/react/outline";
import React, { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { LoadingSpinner } from "../assets/SVGs";
import { ArrayChecker } from "../functions/handler";
import { ITopContext } from "../hooks/TopContext";
import {
  adminList,
  ConfirmButton,
  controlsList,
  DefaultFontStypex,
  DefaultHeaderStyle,
  delay,
  EXEC_SQL,
  solutions,
} from "./ComponentList";
import QRCodeGen from "./QrCodeGen";

export default function UserSettings(props) {
  const { setpopLabel, setPop, setpopTitle, setCanNavigate, userInfo } =
    useContext(ITopContext);
  const [AvailUser, setAvailUser] = useState([]);
  const [Position, setPosition] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectedUser, setselectedUser] = useState(0);
  const [ShowPassword, setShowPassword] = useState(true);
  const [iLoading, setiLoading] = useState(false);
  const [moduleAuthList, setmoduleAuthList] = useState([]);
  const [preModuleAuthList, setpreModuleAuthList] = useState([]);
  const [moduleList, setmoduleList] = useState([]);
  const [createResult, setcreateResult] = useState([]);

  const [userInf, setUserInf] = useState({
    ID: 0,
    firstname: "",
    lastname: "",
    midname: "",
    username: "",
    password: "",
    Department: 0,
    position: null,
    Mobilenumber: "",
    ValTraceQrCode: "",
  });

  const popUpmsgHandler = async (title, msg) => {
    setpopTitle(title);
    setpopLabel(msg);
    setPop(true);
  };
  const HandlerEmpty = async () => {
    if (userInf.firstname === "") {
      await popUpmsgHandler("Input Error", "[Firstname] is required");
      return false;
    }
    if (userInf.lastname === "") {
      await popUpmsgHandler("Input Error", "[lastname] is required");
      return false;
    }
    if (userInf.username === "") {
      await popUpmsgHandler("Input Error", "[username] is required");
      return false;
    }
    if (userInf.password === "") {
      await popUpmsgHandler("Input Error", "[password] is required");
      return false;
    }
    return true;
  };
  const handleCreateUser = async () => {
    if (HandlerEmpty() === true) return;
    await createUser();
  };
  const handleCheckBox = async (val) => {
    const { name, checked } = val.target;
    const removArr = async () => {
      const moduleListHolder = moduleList;
      setmoduleList([]);
      moduleListHolder.map((item, index) => {
        if (parseInt(item) !== parseInt(name))
          setmoduleList((p) => [...p, parseInt(item)]);
        // console.log(parseInt(item), parseInt(name));
      });
    };
    checked ? setmoduleList((p) => [...p, parseInt(name)]) : await removArr();
  };

  const userInfoChangeEevent = (val) => {
    const { name, value } = val.target;
    setUserInf((preState) => ({ ...preState, [name]: value }));
    // console.log({ userInf });
  };

  const createUser = async () => {
    try {
      console.log("");
      const iDepList = await fetch("createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          ...userInf,
          modList: moduleList,
        }),
      })
        .then((res) => res.json())
        .catch(() => {
          return "error";
        });
      setcreateResult(iDepList);
    } catch (error) {}
  };

  //   iFetchUsageSlipHistory();

  const EXEC_SQLdotdotdot = async (sqlid, sets, optionalVal) => {
    try {
      const iDepList = await fetch("EXEC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          SQLID: sqlid,
          VAL: optionalVal,
        }),
      })
        .then((res) => res.json())
        .catch(() => {
          return "error";
        });

      // console.log({ iDepList });
      sets(...iDepList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setloading(true);
    if (iLoading) return;
    const fetchData = async () => {
      // alert(props.id);

      const iGetData = async () => {
        await delay(150);
        console.log(132);
        if (props.id === "") {
          if (props.id !== 0) {
            await EXEC_SQL(20, setpreModuleAuthList, userInf.ID);
            await EXEC_SQLdotdotdot(19, setUserInf, userInf.ID);
            setselectedUser(userInf.ID);
          } else {
            await EXEC_SQL(20, setpreModuleAuthList, 0);
            await EXEC_SQLdotdotdot(19, setUserInf, props.id);
          }

          console.log(139);

          return;
        }

        console.log(144);
        if (props.id >= 0) {
          console.log(146);
          await EXEC_SQL(20, setpreModuleAuthList, props.id);
          await EXEC_SQLdotdotdot(19, setUserInf, props.id);
          setselectedUser(props.id);
        } else {
          await EXEC_SQL(20, setpreModuleAuthList, 0);
          await EXEC_SQLdotdotdot(19, setUserInf, 0);
        }

        await iMapx();
        console.log(149);
      };
      setloading(false);
      iGetData();
    };

    fetchData();
    return;
  }, [props.id]);

  const iMapx = async () => {
    preModuleAuthList.map((item, index) => {
      setmoduleAuthList((p) => ({ ...p, [item.id]: true }));
      setmoduleList((p) => [...p, item.id]);
    });
  };

  useEffect(() => {
    if (preModuleAuthList.length > 0) iMapx();
  }, [preModuleAuthList]);
  return (
    <div className="  ">
      <div className="flex ">
        <h1 className="text-2xl font-bold text-mainText ">User Settings</h1>
        <span className="mt-1 ml-2">
          {loading ? <LoadingSpinner /> : <></>}
        </span>
      </div>
      <div className="grow flex flex-row gap-x-3 mt-4">
        <div className="w-1/2">
          <p className={DefaultFontStypex}>Firstname</p>
          <input
            defaultValue={userInf.firstname}
            onChange={userInfoChangeEevent}
            id="firstname"
            name="firstname"
            autoComplete="firstname"
            className="block w-full appearance-none rounded-md     px-3.5 py-1 text-mainText focus:border-0"
          ></input>
        </div>

        <div className="w-1/2">
          <p className={DefaultFontStypex}>Lastname</p>
          <input
            defaultValue={userInf.lastname}
            onChange={userInfoChangeEevent}
            id="lastname"
            name="lastname"
            autoComplete="lastname"
            className="block w-full appearance-none rounded-md     px-3.5 py-1 text-mainText focus:border-0"
          ></input>
        </div>
      </div>

      <div className="grow flex flex-row gap-x-3 mt-2">
        <div className="w-1/2">
          <p className={DefaultFontStypex}>Username</p>
          <span className="absolute  invisible">
            <div className="mx-auto rotate-45  bg-mainButton h-4 w-4  mt-2 "></div>
            <div className="bg-mainButton px-2 mx-2  rounded-md -mt-2 z-10">
              <p>username unavailable</p>
            </div>
          </span>

          <input
            defaultValue={userInf.username}
            onChange={userInfoChangeEevent}
            // onFocus={iHandleLostF}
            id="username"
            name="username"
            autoComplete="username"
            className="block w-full appearance-none rounded-md     px-3.5 py-1 text-mainText focus:border-0"
          ></input>
        </div>

        <div className="w-1/2 ">
          <p className={DefaultFontStypex}>Password</p>
          <div className="grow flex-row flex bg-mainButton rounded-md">
            <input
              defaultValue={userInf.password}
              onChange={userInfoChangeEevent}
              id="password"
              name="password"
              autoComplete="password"
              type={ShowPassword ? "password" : "text"}
              className="block w-full appearance-none rounded-md  bg-transparent   px-3.5 py-1 text-mainText focus:border-0"
            ></input>
            <button
              className="mr-2"
              onClick={() => {
                ShowPassword ? setShowPassword(false) : setShowPassword(true);
              }}
            >
              {ShowPassword ? (
                <EyeIcon className="h-6 w-6 text-mainText" />
              ) : (
                <EyeOffIcon className="h-6 w-6 text-mainText" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="p-1 bg-mainButton w-full mt-2 flex flex-grow">
        {/* <QRCode value="asdasd" size={150} /> */}
        <div className="grow flex-row flex bg-mainButton rounded-md">
          <input
            value={userInf.ValTraceQrCode}
            onChange={userInfoChangeEevent}
            id="ValTraceQrCode"
            name="ValTraceQrCode"
            autoComplete="ValTraceQrCode"
            className="  block w-full appearance-none rounded-md  bg-transparent   px-3.5 py-1 text-mainText focus:border-0"
          ></input>
          <button className="mr-2" onClick={() => {}}>
            <QrcodeIcon className="h-6 w-6 text-mainText" />
          </button>
        </div>
      </div>
      <h1 className="text-2xl mt-4 font-bold text-mainText ">
        General Authorization
      </h1>

      {moduleList.length > 0 ? (
        <>
          <div>
            <h1 className="text-xl my-2 font-bold text-mainText ">Modules</h1>
            <div></div>

            <div className="grid grid-cols-2 gap-y-1 p-0 m-0">
              {solutions.map((item, index) =>
                item.name === "" ? (
                  <></>
                ) : (
                  <div className="flex">
                    <input
                      type="checkbox"
                      className="mr-2 "
                      disabled={true}
                      defaultChecked={ArrayChecker(moduleList, item.id)}
                      id={item.id}
                      name={item.id}
                      onChange={handleCheckBox}
                    />
                    <label for={item.id} className="p-0 m-0">
                      {item.name}
                    </label>
                  </div>
                )
              )}
            </div>

            <h1 className="text-xl mb-0 mt-2 font-bold text-mainText ">
              Tools
            </h1>
            <div className="grid grid-cols-2 gap-y-1 p-0 m-0">
              {controlsList.map((item, index) =>
                item.name === "" ? (
                  <></>
                ) : (
                  <div className="flex">
                    <input
                      type="checkbox"
                      className="mr-2"
                      defaultChecked={false}
                      name={item.id}
                      onChange={handleCheckBox}
                    />
                    <p className="p-0 m-0">{item.description}</p>
                  </div>
                )
              )}
            </div>

            <h1 className="text-xl mb-0 mt-2 font-bold text-mainText ">
              Admin
            </h1>
            <div className="grid grid-cols-2 gap-y-1 p-0 m-0">
              {adminList.map((item, index) =>
                item.description === "" ? (
                  <></>
                ) : (
                  <div className="flex">
                    <input
                      type="checkbox"
                      className="mr-2"
                      defaultChecked={false}
                      name={item.id}
                      onChange={handleCheckBox}
                    />
                    <p for={item.id} className="p-0 m-0">
                      {item.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="animate-pulse ">
          <div className="grow flex flex-row gap-x-3 mt-4">
            <div className="h-3 bg-mainButton rounded col-span-2 w-1/2"></div>
            <div className="h-3 bg-mainButton rounded col-span-2 w-1/4"></div>
          </div>
          <div>
            <div className="grow flex flex-row gap-x-3 mt-4">
              <div className="h-3 bg-mainButton rounded col-span-2 w-1/2"></div>
              <div className="h-3 bg-mainButton rounded col-span-2 w-1/2"></div>
              <div className="h-3 bg-mainButton rounded col-span-2 w-1/2"></div>
            </div>
          </div>
          <div className="grow flex flex-row gap-x-3 mt-4">
            <div className="h-3 bg-mainButton rounded col-span-2 w-1/4"></div>
            <div className="h-3 bg-mainButton rounded col-span-2 w-full"></div>
          </div>
          <div>
            <div className="grow flex flex-row gap-x-3 mt-4">
              <div className="h-3 bg-mainButton rounded col-span-2 w-1/2"></div>
              <div className="h-3 bg-mainButton rounded col-span-2 w-1/2"></div>
            </div>
          </div>
        </div>
      )}
      <div className=" w-full group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">
        <button
          type="button"
          className={ConfirmButton}
          disabled={loading}
          onClick={async () => {
            setloading(true);
            await EXEC_SQLdotdotdot(21, setAvailUser, userInf.username);
            selectedUser > 0 ? console.log("update") : await handleCreateUser();
            setloading(false);
          }}
        >
          {!loading ? (
            <>{selectedUser > 0 ? <>Update</> : <>Create</>}</>
          ) : (
            <LoadingSpinner />
          )}
        </button>
      </div>
    </div>
  );
}
