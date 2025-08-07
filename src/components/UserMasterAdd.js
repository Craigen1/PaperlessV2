import React, { useContext, useEffect, useState } from "react";
import { convertToObject } from "typescript";
import { LoadingSpinner } from "../assets/SVGs";
import { ArrayChecker } from "../functions/handler";
import { ITopContext } from "../hooks/TopContext";
import { EXEC_SQL_InsertOne, Label, smalBtn, solutions } from "./ComponentList";
import { play } from "./Confetti";
import UserSettings from "./UserSettings";
import UsermasterSapLicense from "./UsermasterSapLicense";
import UserMasterDep from "./UserMasterDep";
import UserMasterEmail from "./UserMasterEmail";
import UserMasterVoid from "./UserMasterVoid";
export default function UserMasterAdd(prop) {
  const [UserID, setUserID] = useState([{ ID: 0 }]);
  const [buffer, setbuffer] = useState([{}]);
  const [userList, setUserList] = useState([]);
  const [userListifModuleSql, setUserListifModuleSql] = useState();
  let userListifModuleSql2 = [];
  const [searchValue, setsearchValue] = useState("");
  const [userinfo, setUserinfo] = useState({
    id: 0,
    fullname: "",
    position: "",
  });
  const { allowedModuleids, setpopTitle, setpopLabel, setPop } =
    useContext(ITopContext);
  const [loading, setLoading] = useState(false);
  const [SelectedSulotions, setSelectedSulotions] = useState([{}]);
  const [PreSolutions, setPreSolutions] = useState([{}]);

  const [ObjectsList, SetObjectsList] = useState([
    {
      LABEl: "Firstname",
      ID: "FIRSTNAME",
      TYPE: "Text",
    },
    {
      LABEl: "Lastname",
      ID: "LASTNAME",
      TYPE: "Text",
    },
    {
      LABEl: "Username*",
      ID: "USERNAME",
      TYPE: "Text",
    },
    {
      LABEl: "Password*",
      ID: "PASSWORD",
      TYPE: "password",
    },
  ]);
  const [ObjectListvalue, setObjectListvalue] = useState({});

  const checkboxHandler = async (e) => {
    const { name, value, id, checked } = e.target;
    console.log({ checked });
    setLoading(!loading);
    let voidx = 0;
    if (checked) voidx = 1;
    console.log(voidx);
    await EXEC_SQL_InsertOne(46, setbuffer, parseInt(UserID[0].ID), id, voidx);
    setLoading(false);
  };

  const handleInsert = async () => {
    setLoading(!loading);
    await EXEC_SQL_InsertOne(
      45,
      setUserID,
      ObjectListvalue.FIRSTNAME,
      ObjectListvalue.LASTNAME,
      ObjectListvalue.USERNAME,
      ObjectListvalue.PASSWORD
    );
    setLoading(false);
  };
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setObjectListvalue((p) => ({ ...p, [name]: value }));
  };

  useEffect(() => {
    setPreSolutions(solutions);
  }, []);
  useEffect(() => {
    if (UserID[0].ID === -10) {
      setpopTitle("-10 Blocked!");
      setpopLabel("Username Already used, please change your username");
      setPop(true);
      setUserID([{ ID: 0 }]);
    }

    if (UserID[0].ID === -9) {
      setpopTitle("-9 Blocked!");
      setpopLabel("Password does not match");
      setPop(true);
      setUserID([{ ID: 0 }]);
    }
  }, [UserID]);
  useEffect(() => {
    if (userListifModuleSql != undefined) {
      userListifModuleSql2 = [];
      userListifModuleSql.map((item, index) => {
        userListifModuleSql2.push(item.module);
      });
      console.log({ userListifModuleSql2 });
    }
  }, [userListifModuleSql]);

  const getSearchVal = async () => {
    await EXEC_SQL_InsertOne(18, setUserList, searchValue);
  };
  const menus = (menu) => {
    var labelx = menu.charAt(0).toUpperCase() + menu.substring(1, menu.length);
    return (
      <>
        {parseInt(UserID[0].ID) >= 1 ? (
          <div className="mt-2">
            <Label text={labelx} type="header" />
            {PreSolutions.map((item, index) => (
              <>
                {item.id > 0 && item.folder == menu ? (
                  <div key={index} className="flex w-fit">
                    {/* ArrayChecker(userListifModuleSql2, item.id) */}
                    <input
                      TYPE="checkbox"
                      // checked={ArrayChecker(userListifModuleSql2, item.id)}
                      value={item.name}
                      id={item.id}
                      onChange={checkboxHandler}
                      className="float-left h-4 -m-0 -p-0 mt-1"
                    />
                    <p className="w-full  inline-block -p-0 -m-0 whitespace-nowrap  ml-2">
                      {item.name}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </>
            ))}
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  return (
    <>
      {prop.type === "CREATE" ? (
        <div className="frame">
          <div className="grid grid-cols-2 gap-2">
            {ObjectsList.map((item, index) => (
              <div key={index}>
                <Label text={item.LABEl} />
                <input
                  TYPE={item.TYPE}
                  name={item.ID}
                  onChange={handleOnChange}
                />
              </div>
            ))}
          </div>

          <div className="   ">
            <button
              type="button"
              className={smalBtn}
              disabled={loading}
              onClick={() => {
                setLoading(true);
                handleInsert();
                // play();
              }}
            >
              {loading ? (
                <span>
                  <LoadingSpinner text={"Processing..."} />
                </span>
              ) : (
                <span>👍 Confirm</span>
              )}
            </button>
          </div>
          <div className="separator mt-4 mb-2"></div>
        </div>
      ) : (
        ""
      )}

      {prop.type === "UPDATE" ? (
        <div className="frame">
          <div className="flex">
            <input
              className="w-full"
              onChange={(e) => setsearchValue(e.target.value)}
            />
            <div className=" ">
              <button
                type="button"
                className="rounded-md   font-bold   border-transparent  px-1.5 pi-0.5 text-sm  text-mainTextblack  bg-main h-7 mt-0.5 w-24 "
                disabled={loading}
                onClick={() => getSearchVal()}
              >
                {loading ? (
                  <span>
                    <LoadingSpinner text={"Processing..."} />
                  </span>
                ) : (
                  <span>🔍 Search</span>
                )}
              </button>
            </div>
          </div>
          <div>
            {userList.map((item, index) => (
              <>
                <button
                  key={index}
                  onClick={() => {
                    setUserinfo({
                      id: item.id,
                      fullanme: item.fullanme,
                      position: item.position,
                    });
                    setUserID([{ ID: item.id }]);
                    EXEC_SQL_InsertOne(47, setUserListifModuleSql, item.id);
                  }}
                >
                  <span className="mx-1 px-1 bg-github_ButtonGreen font-sans text-sm text-github_FontColor font-medium rounded-md my-3">
                    {item.fullanme}
                  </span>
                  {item.position != null ? (
                    <span className="border-2 border-github_BorderColor rounded-md px-1 text-xs text-white">
                      {item.position}
                    </span>
                  ) : (
                    ""
                  )}
                </button>
              </>
            ))}
          </div>
          <div className="separator mt-4 mb-2"></div>

          {userinfo.fullanme != undefined ? (
            <div className="flex">
              <Label text="Selected:" className="mr-2" />
              <Label
                text={userinfo.fullanme + " | " + userinfo.position}
                className="bg-github_FontColor text-black  px-2 rounded-md "
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <div>
        <div className=" frame grid grid-cols-2 gap-2">
          {menus("production")}
          {menus("logistics")}
          {menus("admin")}
          {menus("sales")}
          {menus("tools")}
          {menus("reports")}
          {menus("safety")}
          {menus("test")}
          {menus("CRM")}
          <div id="emitter"></div>
        </div>

        <div className="frame">
          <UserMasterDep userinfo={userinfo} />
        </div>

        <div className="frame">
          <UserMasterVoid userinfo={userinfo} />
        </div>

        <div className="frame">
          <UserMasterEmail userinfo={userinfo} />
        </div>
        <div className="frame">
          <UsermasterSapLicense selectedUserInfo={userinfo} />
        </div>
      </div>
    </>
  );
}
