import React, { useEffect, useRef, useState } from "react";
import { Deanprof, redditDefImg, smalBtn } from "../ComponentList";
import { exportComponentAsPNG } from "react-component-export-image";

export default function RedditTemplate() {
  const tempRef = useRef();
  const [badges, setBadges] = useState([
    {
      badge: 1,
      link: "https://www.redditstatic.com/gold/awards/icon/gold_32.png",
    },
    {
      badge: 21,
      link: "https://www.redditstatic.com/gold/awards/icon/platinum_32.png",
    },
    // {
    //   badge: 3,
    //   // link: "https://www.redditstatic.com/gold/awards/icon/Illuminati_32.png",
    // },
  ]);
  const [bodyText, setbodyText] = useState("");
  const [splitedBodyText, setsplitedBodyText] = useState(["x", "a"]);
  const [splitBodyTextIndex, setSplitBodyTextIndex] = useState(0);
  useEffect(() => {
    const x = bodyText.split(".").join(",").split(",");
    setsplitedBodyText(x);
    setSplitBodyTextIndex(0);
  }, [bodyText]);

  return (
    <div>
      <textarea
        value={bodyText}
        className="w-full text-black"
        onChange={(e) => {
          setbodyText(e.target.value);
        }}
      />
      <div>
        <div className="flex gap-1">
          <button className={smalBtn}>Produce</button>
          <button
            className={smalBtn}
            onClick={() => setSplitBodyTextIndex(splitBodyTextIndex + 1)}
          >
            Up
          </button>
          <button
            className={smalBtn}
            onClick={() => setSplitBodyTextIndex(splitBodyTextIndex - 1)}
          >
            Down
          </button>
          <button
            className={smalBtn}
            onClick={() => {
              exportComponentAsPNG(tempRef, {
                html2CanvasOptions: { backgroundColor: null },
              });

              setSplitBodyTextIndex(splitBodyTextIndex + 1);
            }}
          >
            DL
          </button>
        </div>
      </div>

      {/* header */}
      <div className="px-10 bg-transparent py-2  h-screen" ref={tempRef}>
        <div className="h-20 bg-transparent"></div>
        <div className="h-8 bg-transparent"></div>
        <div className="h-96 bg-transparent"></div>
        <div className="flex  bg-transparent ">
          <img
            src={Deanprof}
            alt=""
            className="rounded-full"
            style={{
              height: "40px",
              width: "40px",
              transformOrigin: "center bottom",
              imageRendering: "auto",
            }}
          />
          <div>
            <p className="font-semibold  text-sm mx-0 py-0 my-0  text-redditFontHead ">
              u/Melodramatic
            </p>
            <div className="flex bg-redditBadgeBG px-1 w-fit rounded-full">
              {badges.map((item, index) => (
                <div key={index}>
                  <img
                    src={item.link}
                    alt=""
                    className="mr-0.5 "
                    style={{
                      height: "18px",
                      width: "18px",
                      transformOrigin: "center bottom",
                      imageRendering: "auto",
                    }}
                  />
                  <span
                    className="-mt-2.5"
                    style={{
                      position: "absolute",
                      borderTop: "3px solid ",
                      width: "18px",
                    }}
                  ></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* body */}

        <div className="mx-10">
          {splitedBodyText.map((item, index) => (
            <div>
              <p className="font-semibold pl-2    mx-0 py-0 my-0  text-white ">
                {splitBodyTextIndex === index ? <>{item}</> : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
