import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useEffect } from "react";
import { LoadingSpinner } from "../assets/SVGs";
import { DefaultFontStypex, EXEC_SQL } from "./ComponentList";
import UserSettings from "./UserSettings";

export default function UserMasterView() {
  const [onSearch, setonSearch] = useState(false);
  const [onSelect, setonSelect] = useState(false);
  const [selectedUser, setselectedUser] = useState(0);
  const [searchValue, setsearchValue] = useState("");
  const [userList, setUserList] = useState([]);
  const searchMe = async (val) => {
    const { name, value } = val.target;
    if (name === "search") {
      setsearchValue(value);
    }
  };
  //
  const keyDownEvent = async (event) => {
    if (event.key === "Enter") {
      setonSearch(true);
      setonSelect(false);
      await EXEC_SQL(18, setUserList, searchValue);
      setonSearch(false);
    }
  };

  useEffect(() => {
    EXEC_SQL(18, setUserList, searchValue);
  }, []);
  return (
    <div>
      <div className="mt-3 ">
        <div className="flex flex-grow">
          <p className={DefaultFontStypex}>Search</p>{" "}
          <span className="mx-2 scroll-mt-0.5">
            {onSearch ? <LoadingSpinner /> : <></>}
          </span>
        </div>
        <div className="flex  bg-mainButton rounded-md">
          <input
            id="search"
            name="search"
            autoComplete="search"
            onChange={searchMe}
            onKeyDown={keyDownEvent}
            className="block w-full appearance-none rounded-md px-3.5 py-1 text-mainText focus:border-0"
          ></input>
          <button
            onClick={async () => {
              setonSearch(true);
              setonSelect(false);
              await EXEC_SQL(18, setUserList, searchValue);
              setonSearch(false);
            }}
            className="mr-2"
          >
            <SearchIcon className="w-6 h-6 bg-mainButton text-mainText" />
          </button>
        </div>
      </div>
      {onSelect ? (
        <UserSettings id={selectedUser} />
      ) : (
        <>
          {userList.map((item, id) =>
            item.fullanme === "" ? (
              <></>
            ) : (
              <>
                <button
                  className="w-full"
                  onClick={() => {
                    // setonSelect(false);
                    setselectedUser(item.id);
                    console.log(item.id);
                    setonSelect(true);
                  }}
                >
                  <div className="bg-mainButton mt-2 rounded-md flex ">
                    <span>
                      <h1 class=" mx-2 text-lg font-bold text-mainText  mb-0 pb-0 ">
                        /i{item.id} u/{item.fullanme}
                      </h1>
                    </span>
                    <span className="mt-1 px-0.5">
                      <p className="p-0 m-0 text-sm">{item.position}</p>
                    </span>
                  </div>
                </button>
              </>
            )
          )}
        </>
      )}
    </div>
  );
}
