import React, { useContext, useEffect, useState, useRef } from "react";
// import Moment from "react-moment";
// import "moment-timezone";
import { ITopContext } from "../../hooks/TopContext";
import { exportComponentAsPNG } from "react-component-export-image";

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
} from "../ComponentList";
import moment from "moment";
export default function RedditCommentReplies(props) {
  const redditGetAuthImg = async (author, setx) => {
    if (author == "[deleted]") return;
    await fetch(`https://www.reddit.com/user/${author}/about.json`).then(
      (res) => {
        // // //({ SubReddit });
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
  };

  const commentRef = useRef();
  const [viewUntl, setViewUntl] = useState(0);
  const [SaveType, setSaveType] = useState(false);

  const { ProduceRedditPost } = useContext(ITopContext);
  const [repliesChild, setrepliesChild] = useState();
  const [replies, setreplies] = useState(props.com.replies);

  const Datenw = new Date();
  // const utcDate2 = new Date(Date.UTC(0, 0, 0, 0, 0, 0));
  const [newDate, setNewDate] = useState(Date.now());

  const [imgx, setimgx] = useState("");
  const [AwardCount, setAwardCount] = useState(0);
  const [AwardCountwait, setAwardCountwait] = useState(false);
  const [Collapse, setCollapse] = useState(false);
  const [removeThis, setremoveThis] = useState(false);
  const [Propsx, setPropsx] = useState(props.com);

  const [CommentsVolume, setCommentsVolume] = useState(0);
  const [defCommentsVolume, setdefCommentsVolume] = useState(0);
  function removeBatch(index, arr, setArr) {
    // if (props.forpost == "post") return;
    const HoldBatchContainer = [...arr];
    HoldBatchContainer.splice(index - 1, 1);
    //(HoldBatchContainer);
    setArr(HoldBatchContainer);

    setPropsx((p) => ({
      ...p,
      replies: HoldBatchContainer,
    }));
  }
  const handleTypeChange = () => {
    if (!SaveType === false) {
      setCommentsVolume(defCommentsVolume);
    } else {
      setCommentsVolume(0);
    }
    setSaveType(!SaveType);
  };
  const awardCountHandler = () => {
    try {
      if (props.com.all_awardings.length === 0) {
        // //(0);
        return 0;
      }
      let array = props.com.all_awardings;
      let cnt = 0;
      // setAwardCount(() => {
      const ar = array.map((item, index) => {
        cnt += item.count;
      });
      // });
      setAwardCount(ar);

      return cnt;
    } catch (error) {
      // //({ error });
    }
  };

  const handle_botMenu = (img, text) => {
    return (
      <div className="flex  items-center justify-center">
        {!img == "" ? <img src={img} className="w-5  self-center"></img> : ""}
        <p className=" -m-0 -p-0  text-redditFontOther  mx-1">{text}</p>
      </div>
    );
  };

  const ProfileImg = (img) => {
    return <></>;
  };
  const [splitme, setSplitme] = useState(["x", "a"]);

  useEffect(() => {
    try {
      const xx = FilterBadWords(props.com.body);
      const x = xx.split(".").join(",").split(",");
      //({ x });
      setSplitme(x);
      setCommentsVolume(x.length);
      setdefCommentsVolume(x.length);
      setViewUntl(x.length);
    } catch (error) {}
  }, []);
  useEffect(() => {
    // //({ props });
    if (replies != null && replies != "") {
      // //(replies.data);
      if (replies.data != null) {
        setrepliesChild(replies.data.children);
      }
    }
  }, []);
  useEffect(() => {
    redditGetAuthImg(props.com.author, setimgx);
    setixDate(setNewDate, props.com.created);

    awardCountHandler();
  }, []);

  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute(
      "style",
      "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
    );
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = 0;
    this.style.height = this.scrollHeight + "px";
  }

  return (
    <>
      <div ref={commentRef} className="bg-redditBG ">
        {removeThis ? (
          ""
        ) : (
          <>
            {props.com.author != null ? (
              <div className="flex bg-redditBG w-full ml-2  ">
                <button
                  className="text-left border-l-2 border-l-gray-410  hover:border-l-gray-420 bg-redditBG  w-2 bg-red -p-0 -m-0 "
                  onClick={() => {
                    setremoveThis(true);
                  }}
                ></button>
                <div className="w-full">
                  {Collapse ? (
                    <div className=" ml-2  mt-0.5 pl-2 rounded-none  -m-0.5 -p-0 bg-redditBG opacity-20 w-full">
                      <div className="w-full flex select-none">
                        {!imgx == "" ? (
                          <div className="w-5 h-5 bg-redditBadgeBG  rounded-full overflow-hidden ">
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
                            <div className="w-5 h-5 bg-redditBadgeBG  rounded-full overflow-hidden ">
                              <img
                                src={redditDefImg}
                                alt=""
                                style={{
                                  transformOrigin: "center bottom",
                                  height: "20px",
                                  width: "20px",
                                }}
                                className="rounded-full"
                              ></img>
                            </div>
                          </>
                        )}
                        <div className="w-full">
                          <p className=" mx-0 pl-2 py-0 my-0 text-redditFontHead font-semibold">
                            <button
                              onClick={() => {
                                setCollapse(!Collapse);
                              }}
                              className="flex w-full -ml-1"
                            >
                              <p className="text-xs mx-0 py-0 my-0  text-redditFontHead p">
                                {props.com.author}
                              </p>

                              <input
                                value={" ∙ " + props.com.body}
                                className="w-full text-xs mx-0 px-0 py-0 my-0 text-redditFont border-none"
                              />
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-none mt-0.5  py-1 bg-redditBG  w-full -px-0">
                        <div className="w-full flex select-none">
                          {!imgx == "" ? (
                            <div className="w-10 h-10 bg-redditBadgeBG  rounded-full overflow-hidden ">
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
                                className="rounded-full"
                              ></img>
                            </>
                          )}
                          <div>
                            <div>
                              <p className=" mx-0 pl-2 py-0 my-0 text-redditFontHead font-semibold text-sm">
                                <button
                                  onClick={() => {
                                    setCollapse(!Collapse);
                                  }}
                                  className="flex w-full text-sm"
                                >
                                  {props.com.author}
                                  <span className="mx-2">
                                    {moment(newDate).fromNow()}
                                  </span>
                                </button>
                                {/* {DateCreated} */}
                              </p>
                            </div>
                            <RedditBadge props={props} />
                          </div>
                        </div>
                        {/* <textarea className="font-sans text-white  mx-1 font-semibold resize-none bg-transparent   w-full    ">
                        {props.com.body}
                      </textarea> */}
                        {SaveType ? (
                          <div className="h-24 overflow-auto">
                            {splitme.map((item, index) => (
                              <div className="inline">
                                {item != "" ? (
                                  <>
                                    {CommentsVolume == index ? (
                                      <span className="font-sans text-white mx-0 font-semibold">
                                        {item.trim()}
                                        {item.trim().charAt(0) ===
                                        item.trim().charAt(0).toUpperCase()
                                          ? ", "
                                          : ", "}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="max-h-24 overflow-auto">
                            {splitme.map((item, index) => (
                              <div className="inline">
                                {item != "" ? (
                                  <>
                                    {CommentsVolume >= index ? (
                                      <span className="font-sans text-white mx-0 font-semibold">
                                        {item.trim()}
                                        {item.trim().charAt(0) ===
                                        item.trim().charAt(0).toUpperCase()
                                          ? ". "
                                          : ", "}
                                      </span>
                                    ) : (
                                      <span className="font-sans text-transparent mx-0 font-semibold">
                                        x
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex pap-2   p-0 m-0 select-none">
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
                              <img
                                src={reddit_icon_down}
                                className="w-5 "
                              ></img>
                            </button>
                          </div>
                          {handle_botMenu(reddit_icon_comment, "Reply")}
                          <button onClick={() => handleTypeChange()}>
                            {handle_botMenu("", "Share")}
                          </button>

                          <button
                            onClick={() => {
                              //({ props });
                            }}
                          >
                            {/* {handle_botMenu("", "Report")} */}
                          </button>
                          <button
                            onClick={() => {
                              exportComponentAsPNG(commentRef);
                            }}
                            aria-label="printSc"
                          >
                            {handle_botMenu("", "Save")}
                          </button>
                          {/* {handle_botMenu("", "Follow")} */}
                        </div>
                      </div>
                    </>
                  )}
                  {ProduceRedditPost ? (
                    <div>
                      {repliesChild != null
                        ? repliesChild.map((item, index) => (
                            <div className="flex">
                              {/* <button
                              onClick={() => {
                                //("asjdh");
                                removeBatch(
                                  index,
                                  repliesChild,
                                  setrepliesChild
                                );
                              }}
                              className="text-left border-l-2 border-l-gray-410  hover:border-l-gray-420  w-5 -my-1 -py-1 bg-red"
                            ></button> */}
                              <RedditCommentReplies com={item.data} />
                            </div>
                          ))
                        : ""}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </>
  );
}
