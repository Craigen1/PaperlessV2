import React, { useContext, useEffect, useRef, useState } from "react";
import { useHref } from "react-router-dom";
import { ITopContext } from "../../hooks/TopContext";

import { Moment } from "react-moment";
// import Moment from "react-moment";
// import "moment-timezone";
import {
  abbrNum,
  redditDefImg,
  reddit_icon_award,
  reddit_icon_comment,
  reddit_icon_down,
  reddit_icon_share,
  reddit_icon_up,
  setixDate,
  smalBtn,
} from "../ComponentList";
import moment from "moment/moment";
import { exportComponentAsPNG } from "react-component-export-image";
export default function RedditPostArtile(props) {
  var Filter = require("bad-words"),
    filter = new Filter();
  const {
    setRedditSelectedArtleURL,
    ArticleData,
    setArticleData,
    setSelectedArticleDataTitle,
  } = useContext(ITopContext);
  /// // console.log({ props });
  const [ThbmImg, setThbmImg] = useState("");
  const [positionLR, setpositionLR] = useState(0);
  const [positionLY, setpositionLY] = useState(0);
  const [TextGap, setTextGap] = useState(0);
  const [selectedColor, setselectedColor] = useState("");
  const [titleWordForWord, settitleWordForWord] = useState([]);
  const [ColoredWord, setColoredWord] = useState([]);
  const [fontSize, setfontSize] = useState(23);
  const [isThumbnail, setisThumbnail] = useState(false);
  const [Collapse, setCollapse] = useState(false);
  const [awardCount, setawardCount] = useState(0);
  const [Propsx, setPropsx] = useState(props.article);
  const [GetAuth, setGetAuth] = useState([]);
  const [SelectedVoice, setSelectedVoice] = useState();
  const synth = window.speechSynthesis;
  const speeker = new SpeechSynthesisUtterance("asd");
  const voices = synth.getVoices();
  const [newDate, setNewDate] = useState(Date.now());
  const [imgx, setimgx] = useState("");
  const [imgsUrl, setImgsUrl] = useState("");
  const [fallbackmp3, setfallbackmp3] = useState("");
  const [viewUntl, setViewUntl] = useState(0);
  const ThumbRef = useRef();

  const handleVoiceChange = (e) => {
    const { name, value } = e.target;
    setSelectedVoice(value);
  };

  const handle_botMenu = (img, text) => {
    return (
      <div className="flex  items-center justify-center">
        <img src={img} className="w-5  self-center"></img>
        <p className=" -m-0 -p-0  text-redditFontOther  mx-1">{text}</p>
      </div>
    );
  };
  const getAuth = async (author) => {
    try {
      await fetch(`https://www.reddit.com/user/${author}/about.json`).then(
        (res) => {
          if (res.status != 200) {
            return;
          }
          res.json().then((data) => {
            if (data != null) {
              setGetAuth(data.data);
            }
          });
        }
      );
    } catch (error) {
      ///    console.log({ error });
    }
  };

  const redditGetAuthImg = async (author, setx) => {
    await fetch(`https://www.reddit.com/user/${author}/about.json`).then(
      (res) => {
        ///// // console.log({ SubReddit });
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

  useEffect(() => {
    setixDate(setNewDate, props.article.created);
    redditGetAuthImg(Propsx.author, setimgx);

    if (Propsx.secure_media != null) {
      ///    console.log(Propsx.secure_media);
      var x = Propsx.secure_media.reddit_video.fallback_url.split("?");
      setfallbackmp3(Propsx.secure_media.reddit_video.scrubber_media_url);
      setImgsUrl(x[0]);
    }
  }, []);
  useEffect(() => {
    settitleWordForWord(Propsx.title.split(" "));
    getAuth(Propsx.author);
  }, []);
  useEffect(() => {
    const tx = document.getElementsByTagName("textarea");
    for (let i = 1; i < tx.length; i++) {
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
  }, []);

  return (
    <>
      {/* <select
        id="speacker"
        name="speacker"
        className="w-full bg-transparent"
        onChange={handleVoiceChange}
      >
        <option value="default"></option>
        {voices.map((item, index) => (
          <option value={item.name}>{item.name}</option>
        ))}
      </select> */}
      {Collapse ? (
        <div className=" mt-4    py-1 bg-redditBadgeBG min-w-fit  opacity-70">
          <div className="w-full flex overflow-hidden">
            <button
              onClick={() => {
                setCollapse(!Collapse);
              }}
              className="flex w-full my-0 py-0 text-left font-bold"
            >
              <div className="  w-5 h-5 rounded-full mr-2">
                <img
                  src={GetAuth.snoovatar_img}
                  alt=""
                  style={{
                    width: "100%",
                    transformOrigin: "center bottom",
                    imageRendering: "auto",
                  }}
                  onError={(event) => {
                    event.target.src = ".src/assets/icons/defaults.png";
                    event.onerror = null;
                  }}
                />
              </div>
              <p className="text-xs mx-0 px-0 py-0 my-0 text-redditFontHead">
                {Propsx.author}
              </p>

              <input
                className="text-xs mx-0 ml-2 px-0 py-0 my-0 text-redditFont w-full  h-5"
                value={" ∙ " + Propsx.title}
              ></input>
            </button>
          </div>
        </div>
      ) : (
        <div className="   pl-3 py-1 bg-redditBG  ">
          <div className="flex flex-row grow   select-none">
            <div className="   rounded-full  -mt-1 ml-1 ">
              {!imgx == "" ? (
                <div className="w-10 h-10 bg-redditBadgeBG  rounded-full overflow-hidden select-none ">
                  <img
                    src={imgx}
                    alt=""
                    style={{
                      display: "block",
                      imageRendering: "auto",
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
                      width: "50px",
                      imageRendering: "auto",
                    }}
                    className="rounded-full select-none"
                  ></img>
                </>
              )}
            </div>
            <div className="w-full">
              <div className="">
                <button
                  onClick={() => setCollapse(!Collapse)}
                  className="text-left "
                >
                  <p className=" mx-0 px-0 py-0 my-0 text-redditFontHead font-semibold ">
                    {!Propsx.subreddit_name_prefixed == null
                      ? Propsx.subreddit_name_prefixed
                      : ""}
                  </p>
                  <p className="text-xs mx-0 px-0 py-0 my-0 ">
                    posted by u/{" "}
                    <span className="text-redditFontHead font-bold">
                      {Propsx.author}
                      {" . "}
                      {/* <Moment fromNow>{newDate}</Moment> */}
                      {moment(newDate).fromNow()}
                    </span>
                  </p>
                </button>
                <div>
                  {props.article.all_awardings[0] != null ? (
                    <>
                      <div className=" bg-redditBadgeBG w-fit py-1 rounded-full ">
                        <div className="flex mx-2 text-xs">
                          {props.article.all_awardings.map((item, index) => (
                            <div className=" px-0.5">
                              <img
                                src={item.static_icon_url}
                                className="w-4 m-0 p-0 object-cover"
                                alt="new"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className={!props.forPost ? "hidden" : ""}>
              <button
                className={
                  smalBtn + " bg-gray-710  h-5 float-right  right-8 mt-2  w-20"
                }
                onClick={() => {
                  speeker.text = Propsx.title;
                  for (let i = 0; i < voices.length; i++) {
                    if (voices[i].name === SelectedVoice) {
                      speeker.voice = voices[i];
                    }
                  }
                  speeker.rate = 1.1;
                  synth.speak(speeker);
                }}
              >
                <div className="float-right">💬 Speak </div>
              </button>

              <button
                className={
                  smalBtn + " bg-gray-710  h-5 float-right  right-8 mt-2  w-20"
                }
                onClick={() => {
                  if (ArticleData != "") setArticleData(props);
                  setSelectedArticleDataTitle(props);
                  setRedditSelectedArtleURL(Propsx.url);
                  ///    console.log({ props });
                  ///    console.log(Propsx.url);
                }}
              >
                <div className="float-right">🏹 Go To </div>
              </button>
            </div>
          </div>
          <p className="font-sans text-white  mx-0 font-semibold transparentSelection">
            {filter.clean(Propsx.title)}
          </p>
          {Propsx.selftext != "" ? (
            <textarea
              className="font-sans text-white  mx-0 font-semibold bg-transparent  w-full resize-none  overflow-hidden h-full "
              defaultValue={Propsx.selftext}
            ></textarea>
          ) : (
            ""
          )}

          {Propsx.url.slice(-3) == "gif" ? (
            <>
              <div
                style={{
                  background: `no-repeat center center url(${Propsx.url})`,
                  backgroundOrigin: "center",
                  width: "auto",
                  height: "400px",
                  backgroundSize: "contain",
                }}
              ></div>
              /// {console.log("gif")}
            </>
          ) : (
            ""
          )}
          {Propsx.url.slice(-3) == "png" ? (
            <>
              <div
                style={{
                  background: `no-repeat center center url(${Propsx.url})`,
                  backgroundOrigin: "center",
                  width: "auto",
                  height: "400px",
                  backgroundSize: "contain",
                }}
              ></div>
              /// {console.log("png")}
            </>
          ) : (
            ""
          )}

          {Propsx.url.slice(-3) == "jpg" ? (
            <>
              <div
                style={{
                  background: `no-repeat center center url(${Propsx.url})`,
                  backgroundOrigin: "center",
                  width: "auto",
                  height: "400px",
                  backgroundSize: "contain",
                }}
              ></div>
              /// {console.log("jpg")}
            </>
          ) : (
            ""
          )}

          {imgsUrl != "" ? (
            <>
              <div
                style={{
                  backgroundOrigin: "center",
                  width: "auto",
                  height: "400px",
                  backgroundSize: "contain",
                }}
              >
                <video
                  autoplay
                  controls
                  width="320"
                  height="240"
                  style={{
                    width: "auto",
                    height: "400px",
                  }}
                  className="mx-auto"
                >
                  <source src={imgsUrl} type="video/mp4" autoplay />
                  /// {console.log(Propsx.secure_media)}
                </video>
              </div>
              /// {console.log("mp4")}
            </>
          ) : (
            ""
          )}
          <div className="grid grid-cols-4  p-0 m-0 select-none max-w-sm">
            <div className="flex  items-center justify-center">
              <button
                onClick={() => {
                  setfontSize(fontSize + 1);
                }}
              >
                <img
                  src={reddit_icon_up}
                  className="w-5  self-center "
                  style={{
                    imageRendering: "auto",
                  }}
                ></img>
              </button>
              <p className=" -m-0 -p-0  text-redditFontOther  mx-1">
                {abbrNum(Propsx.ups, 2)}
              </p>
              <button
                onClick={() => {
                  setfontSize(fontSize - 1);
                }}
              >
                <img
                  src={reddit_icon_down}
                  className="w-5  self-center"
                  style={{
                    imageRendering: "auto",
                  }}
                ></img>
              </button>
            </div>
            {handle_botMenu(
              reddit_icon_comment,
              abbrNum(Propsx.num_comments, 2)
            )}
            <a
              href={fallbackmp3}
              target="_blank"
              rel="noreferrer noopener"
              className="no-underline"
            >
              {handle_botMenu(reddit_icon_share, "Share")}{" "}
            </a>
            <button
              onClick={() => {
                setisThumbnail(!isThumbnail);
              }}
            >
              {handle_botMenu(reddit_icon_award, "Award")}
            </button>
          </div>
        </div>
      )}

      {/* Thumbnail */}
      {isThumbnail ? (
        <div className="mb-10">
          <div className="mb-20">
            <input
              onChange={(e) => {
                setThbmImg(e.target.value);
              }}
              className="border rounded-md"
            />
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setselectedColor(e.target.value)}
            />
            <p>{selectedColor}</p>
            <button
              className={smalBtn + " bg-gray-710  h-5 float-right  mt-2 "}
              onClick={() => {
                setColoredWord([]);
              }}
            >
              Reset
            </button>

            <button
              className={smalBtn + " bg-gray-710  h-5 float-right  mt-2 "}
              onClick={() => {
                exportComponentAsPNG(ThumbRef);
              }}
            >
              DL
            </button>
            <p className="ml-2">position img</p>
            <button
              className={smalBtn + " bg-gray-710  h-5 float-right  mt-2 "}
              onClick={() => {
                setpositionLR(positionLR + 5);
              }}
            >
              +Y
            </button>
            <button
              className={smalBtn + " bg-gray-710  h-5 float-right  mt-2 w-fit "}
              onClick={() => {
                setpositionLR(positionLR - 5);
              }}
            >
              -Y
            </button>
            <button
              className={smalBtn + " bg-gray-710  h-5 float-right  mt-2 w-fit "}
              onClick={() => {
                setpositionLY(positionLY + 5);
              }}
            >
              +X
            </button>
            <button
              className={smalBtn + " bg-gray-710  h-5 float-right  mt-2 w-fit "}
              onClick={() => {
                setpositionLY(positionLY - 5);
              }}
            >
              -X
            </button>
            <p>text gap</p>
            <button
              className={smalBtn + " bg-gray-710  h-5 float-right  mt-2 w-fit "}
              onClick={() => {
                setTextGap(TextGap + 0.5);
              }}
            >
              +
            </button>
            <button
              className={smalBtn + " bg-gray-710  h-5 float-right  mt-2 w-fit "}
              onClick={() => {
                setTextGap(TextGap - 0.5);
              }}
            >
              -
            </button>
          </div>
          <div
            ref={ThumbRef}
            className="border-8 border-red-500"
            style={{
              width: "426px",
              height: "240px",
              backgroundImage: `url("${ThbmImg}")`,
              backgroundRepeat: "no-repeat",
              backgroundPositionX: `${positionLR}px`,
              backgroundColor: "black",
              backgroundPositionY: `${positionLY}px`,
              boxShadow: "150px 0px 50px 0px black inset",
            }}
          >
            {/* <img
              src={ThbmImg}
              className="absolute z-0 "
              style={{
                width: "auto",
                height: "270px",
                right: positionLR,
                imageRendering: "auto",
              }}
            ></img> */}
            <div
              className="  absolute w-full z-10"
              style={{
                height: "270px",
                right: positionLR,
                // boxShadow: "inset 50px 0px 30px black",
              }}
            ></div>

            <div
              className="  bg-transparent  "
              // ref={thumb}
              style={{
                width: "480px",
                height: "270px",
              }}
            >
              <div className="flex flex-row grow   select-none pt-3  ">
                <div className="   rounded-full  -mt-1 ml-1 ">
                  {!imgx == "" ? (
                    <div className="w-10 h-10 bg-black  rounded-full overflow-hidden select-none ">
                      <img
                        src={imgx}
                        alt=""
                        style={{
                          display: "block",
                          imageRendering: "auto",
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
                          width: "50px",
                          // imageRendering: "auto",
                        }}
                        className="rounded-full select-none z-"
                      ></img>
                    </>
                  )}
                </div>
                <div className=" w-fit text-white bg      rounded bg-redditBadgeBG h-fit px-1">
                  <div className="text-left  w-fit  px-2 -md  ">
                    <p className=" mx-0 px-0 py-0 my-0 text-redditFontHead font-semibold ">
                      {!Propsx.subreddit_name_prefixed == null
                        ? Propsx.subreddit_name_prefixed
                        : ""}
                    </p>
                    <p className=" py-0 my-0 m">
                      asked by u/{" "}
                      <span className="text-redditFontHead font-bold">
                        {Propsx.author}{" "}
                        {/* <Moment fromNow>{newDate}</Moment> */}
                      </span>
                    </p>
                  </div>
                  <div className="  w-fit rounded-md  rounded-tl-none rounded-tr-none pb-0.5 ">
                    {props.article.all_awardings[0] != null ? (
                      <>
                        <div className=" ml-1 grow flex flex-row w-fit bg-transparent rounded-full  select-none -mx-3">
                          <div className="flex mx-2 z-50 ">
                            {props.article.all_awardings.map((item, index) => (
                              <div className="flex px-0.5">
                                <img
                                  src={item.static_icon_url}
                                  alt="new"
                                  className="w-5"
                                  style={{
                                    imageRendering: "auto",
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="flex -mt-5">
                <div
                  className={` flex-wrap flex mt-4 ml-2 w-3/4 mr-10 overflow-hidden  font-bold selection:bg-red-500  selection:border-none   text-white     select-none resize-none   foutline-double  `}
                  style={{
                    // WebkitTextStroke: "3px black",
                    // WebkitTextFillColor: "white",
                    fontSize: `${fontSize}px`,
                  }}
                >
                  {/* {Propsx.title} */}
                  {titleWordForWord.map((item, index) => (
                    <div className="z-40">
                      <p
                        type="color"
                        className={`text-sm mx-2 z-50 font-face-ChangaOne   `}
                        style={{
                          color: ColoredWord.includes(index)
                            ? selectedColor
                            : "#fff",
                          fontSize: `${fontSize}px`,
                          marginBottom: `${TextGap}px`,
                          fontStyle: "",
                          WebkitTextStroke: "2px black",
                        }}
                        onClick={() => {
                          setColoredWord((p) => [...p, index]);
                          /// // console.log({ selectedColor });
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
