import React, { useContext, useEffect, useRef, useState } from "react";
import { ITopContext } from "../../hooks/TopContext";
import RedditComments from "./RedditComments";
import RedditPostArtile from "./RedditPostArtile";
import html2canvas from "html2canvas";
import {
  DefaultButtonStyle,
  DefaultButtonStyleNullified,
  exportASImg,
} from "../ComponentList";
import { exportComponentAsPNG } from "react-component-export-image";

export default function RedditProduce() {
  const ArticleRef = useRef();
  const exportRef = useRef();

  const { SelectedArticleDataTitle, SelectedArticleDataBody, RedditisManual } =
    useContext(ITopContext);
  const [data, setdata] = useState();
  useEffect(() => {
    RedditisManual
      ? setdata(SelectedArticleDataTitle)
      : setdata(SelectedArticleDataTitle.article);

    RedditisManual
      ? console.log(SelectedArticleDataTitle)
      : console.log(SelectedArticleDataTitle.article);
  }, []);
  const [orientation, setOrientation] = useState("h");
  return (
    <>
      <div className="px-1 py-0.5 pt-0 bg-mainButton rounded-3xl w-fit flex mt-2">
        <button
          className={
            orientation === "v"
              ? DefaultButtonStyle
              : DefaultButtonStyleNullified
          }
          onClick={() => setOrientation(orientation === "v" ? "h" : "v")}
        >
          Verical
        </button>
        <button
          className={
            orientation === "h"
              ? DefaultButtonStyle
              : DefaultButtonStyleNullified
          }
          onClick={() => setOrientation(orientation === "v" ? "h" : "v")}
        >
          Horizontal
        </button>
      </div>
      <div className="  mt-8    overflow-auto" ref={exportRef}>
        {data != null ? (
          <>
            <button
              className="text-left"
              onClick={() => exportComponentAsPNG(ArticleRef)}
              aria-label="printSc"
            >
              <div
                ref={ArticleRef}
                className={
                  orientation === "h"
                    ? "px-28   bg-redditBG "
                    : " bg-redditBG  px-8 w-4/6"
                }
              >
                <div className="">
                  <RedditPostArtile
                    article={data}
                    forPost={false}
                    orientation={orientation}
                  />
                </div>
              </div>
            </button>
          </>
        ) : (
          ""
        )}
        <div className="text-left">
          {SelectedArticleDataBody.map((item, index) => (
            <>
              <RedditComments
                com={item}
                index={index}
                forpost="post"
                orientation={orientation}
              />
            </>
          ))}
        </div>
      </div>
      <div className="bg-black  h-screen resize-y overflow-auto fixed rotate-180  bottom-1"></div>
    </>
  );
}
