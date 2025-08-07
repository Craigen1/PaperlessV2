import React, { useContext, useEffect, useRef, useState } from "react";
import {
  DefButton,
  DefInput,
  EXEC_SQL,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertOne,
  delay,
} from "./ComponentList";

import { FilmIcon } from "@heroicons/react/outline";
import { ITopContext } from "../hooks/TopContext";
import MsgBox from "./MsgBox";
export default function Msg() {
  const forscroll = useRef();
  const { userid, setloading } = useContext(ITopContext);

  const onhashchange = (e) => {
    const { value, id, name } = e.target;
    console.log({ value, id, name });
    setmsg(value);
  };
  const [butnlist, setButnlist] = useState([]);
  const [clickedId, setClickedId] = useState("GENERAL");
  const [msg, setmsg] = useState("");
  const onClick = (e) => {
    const { value, id, name } = e.target;
    setClickedId(id);
    console.log(id);
    setChats([]);
    getMsg(id);
  };
  const [showmsg, setShowmsg] = useState(false);
  const [onClickUseEffect, setonClickUseEffect] = useState("");
  const [onChangeUseEffect, setonChangeUseEffect] = useState("");
  const [msgSelectedUserid, setmsgSelectedUserid] = useState("");
  const [img, setImg] = useState(null);
  const [getImgx, setgetImgx] = useState({});
  const Chat = (e) => {
    return (
      <>
        <div>
          <div
            className={
              e.userid == userid
                ? " ml-auto  w-fit mr-2  px-2 bg-white rounded-b-md rounded-tl-md mt-2"
                : " mr-auto  w-fit  ml-2  px-2 bg-WhiteMode-header rounded-b-md rounded-tr-md mt-2"
            }
            style={{
              maxWidth: "80%",
            }}
          >
            <div className="   ">
              <button
                className="text-left"
                onClick={async () => {
                  setloading(true);
                  await EXEC_SQL_InsertOne(958, setgetImgx, e.id);
                  setloading(!true);
                }}
              >
                <p className="-m-0 p-0 font-bold flex">
                  {e.userid == userid ? "" : e.user}
                </p>
                <div>
                  {e.void == "1" ? (
                    <span
                      className="-m-0 p-0 ml-1 text-WhiteMode-Font flex "
                      style={{
                        lineHeight: "15px",
                      }}
                    >
                      {e.img == "1" ? (
                        <>
                          <FilmIcon
                            className="text-WhiteMode-Font mr-2 "
                            style={{ minWidth: "25px", maxWidth: "25px" }}
                          />
                        </>
                      ) : (
                        ""
                      )}
                      {e.text}
                    </span>
                  ) : (
                    <p className="italic  p-0 -m-0 text-WhiteMode-Font">
                      message removed
                    </p>
                  )}
                  <p className="-m-0 p-0 text-sm text-WhiteMode-Font">
                    {e.time} {e.date}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  const [chats, setChats] = useState([]);

  const [loading, Setloading] = useState(false);
  const sendmsg = async () => {
    Setloading(true);
    await EXEC_SQL_InsertOne(962, setChats, userid, msg, clickedId);
    Setloading(false);
    setmsg("");
  };

  const sendmsgImg = async () => {
    Setloading(true);
    await EXEC_SQL_InsertOne(
      959,
      setChats,
      userid,
      msg,
      clickedId,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      image
    );
    setImage(null);
    Setloading(false);
    setmsg("");
  };
  // const onPastseHandler = (e) => {
  //   console.log(e.clipboardData.files[0]);
  //   console.log(e.clipboardData.getData("image/png'"));

  //   const dt = e.clipboardData || window.clipboardData;
  //   const files = dt.files;
  //   console.log(files[0]);
  // };

  const [image, setImage] = useState(null);

  const onPastseHandler = (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    for (let index in items) {
      const item = items[index];
      if (item.kind === "file" && item.type.includes("image/")) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  const getMsg = async (id) => {
    Setloading(true);
    await EXEC_SQL(961, setChats, id);
    Setloading(false);
    forscroll.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollme = async () => {
    forscroll.current.scrollIntoView({ behavior: "smooth" });
  };
  const getDeps = async () => {
    await EXEC_SQL_InsertOne(957, setButnlist);
  };
  useEffect(() => {
    setChats([]);
    getMsg("GENERAL");
    getDeps();
  }, []);
  useEffect(() => {
    if (getImgx.length > 0) {
      setImg(getImgx[0].imgPath);
    }
  }, [getImgx]);
  useEffect(() => {
    scrollme();
  }, [chats]);

  const getmsgx = async () => {
    setChats([]);
    getMsg(clickedId);
  };
  const [loadingusestate, setLoadingusestate] = useState(false);
  const handler = async () => {
    await EXEC_SQL_InsertOne(
      962,
      setChats,
      userid,
      "AddGroup",
      onChangeUseEffect
    );
  };

  const AddUserTogGrouphandler = async () => {
    await EXEC_SQL_InsertOne(
      962,
      setChats,
      userid,
      "AddGroup",
      onChangeUseEffect
    );
  };

  useEffect(() => {
    if (onChangeUseEffect === "") return;
    handler();
    setonChangeUseEffect("");
  }, [onChangeUseEffect]);
  useEffect(() => {
    if (msgSelectedUserid === "") return;
    AddUserTogGrouphandler();
    setmsgSelectedUserid("");
  }, [msgSelectedUserid]);

  return (
    <div className=" " onPaste={onPastseHandler}>
      <div className="flex">
        <div className=" mt-2 w-fit  mb-2  fixed ">
          {butnlist.map((item, index) => (
            <div className="ml-auto">
              <DefButton
                key={index}
                text={item.name}
                type={clickedId == item.id ? "2" : "2B"}
                className="w-fit px-2"
                id={item.id}
                onClick={onClick}
              />
            </div>
          ))}
          <MsgBox
            label={"Add Group"}
            className="h-fit"
            title="New Group"
            text="Group Name"
            id="newGroup"
            InputMsg={setonChangeUseEffect}
          />
          {clickedId == "GENERAL" ? (
            <></>
          ) : (
            <MsgBox
              label={"Add user to Group"}
              className="h-fit"
              title={`Add User To ${clickedId}`}
              text="Select User"
              id="newGroup"
              InputMsg={setmsgSelectedUserid}
              dropDownId={956}
            />
          )}
        </div>
        <div
          className="overflow-auto mt-auto mb-20 ml-28 "
          style={{ height: "50%" }}
          onPaste={onPastseHandler}
        >
          {chats.map((item, index) => (
            <>
              {/* id    void dep */}
              <Chat
                text={item.msg}
                user={item.user}
                userid={item.createdBy}
                time={item.timex}
                date={item.datex}
                void={item.void}
                img={item.imgPath}
                id={item.id}
              />
            </>
          ))}
        </div>
      </div>
      <div
        className=" fixed flex z-40   mx-auto  mt-2 w-96 rounded-t-sm px-2 bg-transparent "
        style={{
          left: "50%",
          transform: "translate(-50%)",
          bottom: "72px",
        }}
      >
        <DefInput
          handler={onhashchange}
          id="msgHandler"
          className="frame"
          maxLength={149}
        />
        <DefButton
          text="Send "
          type="2"
          className="w-fit px-2  m-auto mx-2"
          onClick={sendmsg}
          loading={loading}
        />
      </div>
      <div ref={forscroll}></div>
      {image && (
        <div className="w-full h-full fixed top-0 left-0 bg-trans50 z-50">
          <div className=" bg-mainTextblack mx-auto w-fit px-4 ">
            <img
              src={image}
              alt="Pasted image"
              className="mx-auto  mt-10 bg-red pt-4 "
              style={{
                maxHeight: "500px",
                objectFit: "contain",
              }}
            />
            <div className="mx-auto">
              <div className="w-96 mx-auto">
                <div className="flex">
                  <div className="mt-1.5">
                    <DefButton
                      className="w-fit px-2 mt-4 ml-1 mb-4 "
                      type="2"
                      text="Cancel"
                      onClick={() => {
                        setImage(null);
                      }}
                    />
                  </div>
                  <div>
                    <DefInput
                      label="Type a Message"
                      className="mt-10"
                      onPaste={onPastseHandler}
                      handler={onhashchange}
                      loading={loading}
                      maxLength={149}
                    />
                  </div>

                  <div className="mt-1.5">
                    <DefButton
                      classNa
                      me="w-fit px-2 mt-4 ml-1 mb-4 pt-2 "
                      type="2"
                      text="send"
                      onClick={sendmsgImg}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {img ? (
        <div className="fixed w-full h-full bg-trans50 left-0 top-0">
          <div className="w-96 mt-2 mx-auto">
            <DefButton
              text="x"
              type="2"
              className="px-2 w-fit float-right"
              onClick={() => {
                setImg(null);
              }}
            />
          </div>
          <img
            src={img}
            alt="Pasted image"
            className="mx-auto  mt-10 bg-red pt-4 "
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
