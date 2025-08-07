import React, { useContext, useEffect, useRef, useState } from "react";
// import Moment from "react-moment";
import { ITopContext } from "../../hooks/TopContext";
import {
  abbrNum,
  FilterBadWords,
  RedditBadge,
  redditDefImg,
  reddit_icon_award,
  reddit_icon_comment,
  reddit_icon_down,
  reddit_icon_share,
  reddit_icon_up,
  setixDate,
  smalBtn,
} from "../ComponentList";
import RedditCommentReplies from "./RedditCommentReplies";
import { exportComponentAsPNG } from "react-component-export-image";
import moment from "moment";

export default function RedditComments(props) {
  var Filter = require("bad-words"),
    filter = new Filter();

  const { ArticleData, setSelectedArticleDataBody, SelectedArticleDataBody } =
    useContext(ITopContext);

  const redditGetAuthImg = async (author, setx) => {
    try {
      await fetch(`https://www.reddit.com/user/${author}/about.json`).then(
        (res) => {
          // // console.log({ SubReddit });
          if (res.status != 200) {
            return;
          }
          res.json().then((data) => {
            if (data != null) {
              setx(data.data.snoovatar_img);
            }
          });
        }
      );
    } catch (error) {}
  };
  const [CommentsVolume, setCommentsVolume] = useState(0);
  const [SaveType, setSaveType] = useState(false);
  const [RemoveThis, setRemoveThis] = useState(false);
  const [Collapse, setCollapse] = useState(false);
  const [isSelected, setisSelected] = useState(false);
  const [Propsx, setPropsx] = useState(props.com);
  const [replies, setreplies] = useState(Propsx.replies);
  const [newDate, setNewDate] = useState(Date.now());
  const [defCommentsVolume, setdefCommentsVolume] = useState(0);

  const [repliesChild, setrepliesChild] = useState();
  const [imgx, setimgx] = useState("");
  const handleTypeChange = () => {
    if (!SaveType === false) {
      setCommentsVolume(defCommentsVolume);
    } else {
      setCommentsVolume(0);
    }
    setSaveType(!SaveType);
  };
  const handle_botMenu = (img, text) => {
    return (
      <div className="flex  items-center justify-center">
        {!img == "" ? <img src={img} className="w-5  self-center"></img> : ""}
        <p className=" -m-0 -p-0  text-redditFontOther  mx-1">{text}</p>
      </div>
    );
  };

  function removeBatch(index, arr, setArr) {
    // if (props.forpost == "post") return;
    const HoldBatchContainer = [...arr];
    HoldBatchContainer.splice(index - 1, 1);
    console.log(HoldBatchContainer);
    setArr(HoldBatchContainer);

    setPropsx((p) => ({
      ...p,
      replies: HoldBatchContainer,
    }));
  }

  useEffect(() => {
    function toDateTime(secs) {
      var t = new Date(1970, 0, 1); // Epoch
      t.setSeconds(secs);
      // console.log(t);
      return t;
    }
    redditGetAuthImg(props.com.author, setimgx);
    setNewDate(toDateTime(Propsx.created));
  }, []);
  useEffect(() => {
    // console.log({ props });
    if (replies != null && replies != "") {
      // console.log(replies.data);
      if (replies.data != null) {
        setrepliesChild(replies.data.children);
      }
    }
  }, []);
  const [splitme, setSplitme] = useState(["x", "a"]);

  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute(
      "style",
      "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
    );
    tx[i].addEventListener("input", OnInput, false);
  }
  const commentRef = useRef();
  function OnInput() {
    this.style.height = 0;
    this.style.height = this.scrollHeight + "px";
  }
  useEffect(() => {
    const xx = FilterBadWords(props.com.body);
    const x = xx.split(".").join(",").split(",");
    setSplitme(x);
    setCommentsVolume(x.length);
    setdefCommentsVolume(x.length);
  }, []);

  return (
    <>
      <div
        ref={commentRef}
        className={
          props.orientation === "h"
            ? "px-28 bg-redditBG"
            : " px-4 w-3/5 bg-redditBG "
        }
      >
        {RemoveThis ? (
          ""
        ) : (
          <div className="flex bg-redditBG w-full   ">
            <button
              className="text-left border-r-2 border-r-gray-410  hover:border-r-gray-400  w-5 bg-redditBG "
              onClick={() => {
                setRemoveThis(true);
              }}
            ></button>
            <>
              <div className=" mt-0.5 ml-2 mr-6 py-1 bg-redditBG w-full">
                {Collapse ? (
                  <div className=" -my-1.5 -ml-3 bg-redditBG  opacity-20">
                    <div className="w-full flex overflow-hidden ">
                      <button
                        onClick={() => setCollapse(!Collapse)}
                        className="flex"
                      >
                        <div className="  w-5 h-5 rounded-full  -mt-1 ml-1  scale-50 ">
                          {!imgx == "" ? (
                            <div className="w-10 h-10 bg-redditBadgeBG  rounded-full overflow-hidden select-none ">
                              <img
                                src={imgx}
                                alt=""
                                style={{
                                  display: "block",
                                }}
                              ></img>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <p className="text-sm mx-0 px-2 py-0 my-0 text-redditFontHead w-auto inline-block h-2 -ml-4">
                          {Propsx.author}
                        </p>
                        ∙
                      </button>
                      <button
                        className="text-left w-full border-0 "
                        aria-label="printSc"
                        onClick={() => {
                          exportComponentAsPNG(commentRef);
                        }}
                      >
                        <input
                          value={props.com.body}
                          className="w-full text-xs mx-0 px-0 py-0 my-0 text-redditFont bg-redditBG border-0"
                        />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {props.forpost != "post" ? (
                      <>
                        <div>
                          {isSelected ? (
                            ""
                          ) : (
                            <button
                              className={
                                smalBtn +
                                " bg-gray-710  h-5 float-right  right-8 mt-2  w-20"
                              }
                              onClick={() => {
                                console.log(props.com.body);
                                setSelectedArticleDataBody((p) => [
                                  ...p,
                                  {
                                    ...Propsx,
                                  },
                                ]);
                              }}
                            >
                              <div className="float-right">🔘 Select</div>
                            </button>
                          )}
                          <button
                            className={
                              smalBtn +
                              " bg-gray-710  h-5 float-right  right-8 mt-2  w-20 hover:bg-gray-800"
                            }
                            onClick={() => {
                              // console.log({ SelectedArticleDataBody });
                              console.log(props);
                            }}
                          >
                            <div className="float-right">🔘 Read</div>
                          </button>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    <button>
                      <div className="w-full flex">
                        {!imgx == "" ? (
                          <div className="w-10 h-10 bg-redditBadgeBG  rounded-full overflow-hidden select-none ">
                            <img
                              src={imgx}
                              alt=""
                              style={{
                                display: "block",
                              }}
                            ></img>
                          </div>
                        ) : (
                          <>
                            <img
                              src={redditDefImg}
                              alt=""
                              style={{
                                transformOrigin: "center bottom",
                                height: "35px",
                                width: "35px",
                              }}
                              className="rounded-full select-none"
                            ></img>
                          </>
                        )}
                        <div className="select-none">
                          <div>
                            <button
                              onClick={() => {
                                setCollapse(!Collapse);
                              }}
                            >
                              <p className=" text-sm mx-0 pl-2 py-0 my-0 text-redditFontHead font-semibold">
                                u/{props.com.author}
                                <span className="mx-2 text-white">
                                  {moment(newDate).fromNow()}
                                </span>
                              </p>
                            </button>
                          </div>

                          <RedditBadge props={props} />
                        </div>
                      </div>
                    </button>
                    {/* <textarea
                      className="font-sans text-white mx-0 font-semibold bg-transparent  w-full resize-none  overflow-hidden h-40    "
                      defaultValue={props.com.body}
                    ></textarea> */}
                    <br></br>

                    {/* 
                    {splitme.map((item, index) => (
                      <div className="inline">
                        {CommentsVolume >= index ? (
                          <span className="font-sans text-white mx-0 font-semibold">
                            {item.trim()}
                            {item.trim().charAt(0) ===
                            item.trim().charAt(0).toUpperCase()
                              ? ". "
                              : ", "}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    ))} */}
                    {!SaveType ? (
                      <div className="max-h-24 min-h-24 overflow-auto">
                        {splitme.map((item, index) => (
                          <div
                            className={
                              CommentsVolume >= index
                                ? "inline"
                                : "inline opacity-0"
                            }
                          >
                            <span className="font-sans text-white mx-0 font-semibold">
                              {item.trim()}
                              {item.trim().charAt(0) ===
                              item.trim().charAt(0).toUpperCase()
                                ? ", "
                                : ", "}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className=" h-24 overflow-auto">
                        {splitme.map((item, index) => (
                          <>
                            {index === CommentsVolume ? (
                              <div
                                className={
                                  CommentsVolume == index
                                    ? "inline"
                                    : "inline opacity-0"
                                }
                              >
                                <span className="font-sans text-white mx-0 font-semibold">
                                  {item.trim()}
                                  {item.trim().charAt(0) ===
                                  item.trim().charAt(0).toUpperCase()
                                    ? ". "
                                    : ", "}
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        ))}
                      </div>
                    )}

                    <div className="flex pap-2   p-0 m-0 select-none ">
                      <div className="flex  items-center justify-center">
                        <button
                          onClick={() => {
                            setCommentsVolume(CommentsVolume + 1);
                          }}
                        >
                          <img
                            src={reddit_icon_up}
                            className="w-5  self-center"
                          ></img>
                        </button>
                        <p className=" -m-0 -p-0  text-redditFontOther  mx-1">
                          {abbrNum(props.com.ups, 2)}
                        </p>

                        <button
                          onClick={() => {
                            setCommentsVolume(CommentsVolume - 1);
                          }}
                        >
                          <img src={reddit_icon_down} className="w-5 "></img>
                        </button>
                      </div>
                      {handle_botMenu(reddit_icon_comment, "Reply")}
                      <button onClick={() => handleTypeChange()}>
                        {handle_botMenu("", "Share")}
                      </button>
                      {/* <button
                        onClick={() => {
                          console.log({ props });
                        }}
                      >
                        {handle_botMenu("", "Report")}
                      </button> */}
                      <button
                        onClick={() => {
                          exportComponentAsPNG(commentRef);
                          setCommentsVolume(CommentsVolume + 1);
                        }}
                        aria-label="printSc"
                      >
                        {handle_botMenu("", "Save")}
                      </button>
                      {/* {handle_botMenu("", "Follow")} */}
                    </div>
                    <div>
                      {/* {replies != null ? (
            <>
              {replies.data.children.map((item, index) => {
                <RedditCommentReplies />;
              })}
            </>
          ) : (
            <></>
          )} */}
                    </div>
                  </div>
                )}

                {repliesChild != null
                  ? repliesChild.map((item, index) => (
                      <div className="flex w-full">
                        {/* <button
                    onClick={() => {
                      console.log("asjdh");
                      removeBatch(index, repliesChild, setrepliesChild);
                    }}
                    className="text-left border-l-2 border-l-gray-410  hover:border-l-gray-420  w-5 -my-1 -py-1 bg-red"
                  ></button> */}
                        <RedditCommentReplies com={item.data} />
                      </div>
                    ))
                  : ""}
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );
}
