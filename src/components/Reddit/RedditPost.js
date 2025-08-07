import React, { useContext, useEffect, useState } from "react";
import { Label, smalBtn } from "../ComponentList";
import RedditPostArtile from "./RedditPostArtile";
import { ITopContext } from "../../hooks/TopContext";
import RedditPostPost from "./RedditPostPost";

export default function RedditPost() {
  const {
    RedditSelectedArtleURL,
    setRedditSelectedArtleURL,
    ArticleData,
    setProduceRedditPost,
    setSelectedArticleDataTitle,
    setArticleData,
    RedditisManual,
    setRedditisManual,
    setRawArticleData,
  } = useContext(ITopContext);

  // const [RedditisManual, setRedditisManual] = useState(false);
  const [Articles, setArticles] = useState([]);
  const [SubReddit, setSubReddit] = useState(
    "https://www.reddit.com/r/AskReddit/comments/8vdv8b/what_was_one_of_the_most_mysterious_post_found_on"
  );
  const handleOnChange = (e) => {
    const { value } = e.target;
    setSubReddit(value);
  };
  const [prodFolderCol, setProdFolderCol] = useState(false);
  const [LogFolderCol, setLogFolderCol] = useState(false);
  const [AdmFolderCol, setAdmFolderCol] = useState(false);
  const SearchSubReddit = async () => {
    await fetch(`https://www.reddit.com/r/${SubReddit}.json`).then((res) => {
      console.log({ SubReddit });
      if (res.status != 200) {
        console.log("error");
        return;
      }
      res.json().then((data) => {
        if (data != null) {
          console.log(data);
          setArticles(data.data.children);
        }
      });
    });
    console.log({ Articles });
  };

  const ManualSubReddit = async () => {
    setRedditisManual(true);
    await fetch(`${SubReddit}.json`).then((res) => {
      console.log(`${SubReddit}.json`);
      if (res.status != 200) {
        console.log("error");
        setRedditisManual(false);
        return;
      }
      res.json().then((data) => {
        if (data != null) {
          // console.log(data[0].data.children[0]);
          // console.log(data[0].data.children[0].data);
          // console.log(data[0].data.children[0].data.url);
          setArticles(data[0].data.children[0]);
          setSelectedArticleDataTitle(data[0].data.children[0].data);
          setRedditSelectedArtleURL(data[0].data.children[0].data.url);
          setArticleData(data[0].data.children[0].data);
          setRawArticleData(data);
          console.log({ data });
          // setSelectedArticleDataTitle(data.data.children[0].data);
          // setRedditSelectedArtleURL(data.data.children.url);
        }
      });
    });
    // console.log({ Articles });
  };

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
      {RedditSelectedArtleURL == "" ? (
        <>
          <Label text="SubReddit" />
          <div>
            <input
              id="SubReddit"
              name="SubReddit"
              autoComplete="SubReddit"
              value={SubReddit}
              onChange={handleOnChange}
              className=" border block w-full appearance-none      px-3.5 py-1 text-mainText focus:border-0"
            ></input>
            <button
              className={smalBtn + " bg-gray-710"}
              onClick={() => {
                SearchSubReddit();
              }}
            >
              <div className="float-right">🔎 Search </div>
            </button>
            <button
              className={smalBtn + " bg-gray-710 mx-4"}
              onClick={async () => {
                // SearchSubReddit();
                await ManualSubReddit();
              }}
            >
              <div className="float-right px-2">🔎 manual Search </div>
            </button>
            <button
              className={smalBtn + " bg-gray-710 mx-4"}
              onClick={async () => {
                // SearchSubReddit();
                await ManualSubReddit();
              }}
            >
              <div className="float-right px-2">🔎 Thumbnale created </div>
            </button>

            {/* <RedditPostArtile /> */}

            {Articles != null
              ? Articles.length > 0
                ? Articles.map((item, index) => (
                    <RedditPostArtile
                      key={index}
                      article={item.data}
                      forPost={true}
                    />
                  ))
                : ""
              : ""}
          </div>{" "}
        </>
      ) : (
        <>
          <div>
            <button
              className={smalBtn + " bg-gray-710"}
              onClick={() => {
                setRedditSelectedArtleURL("");
              }}
            >
              <div className="float-right select-none">↩️Restart</div>
            </button>

            <button
              className={smalBtn + " bg-gray-710 float-right"}
              onClick={() => {
                setProduceRedditPost(true);
              }}
            >
              <div className="float-right select-none">➡️ Process</div>
            </button>
          </div>
          {RedditisManual ? (
            <>
              {/* {console.log({ ArticleData })} */}
              <RedditPostPost article={ArticleData} />
            </>
          ) : (
            <RedditPostPost article={ArticleData.article} />
          )}
        </>
      )}
    </>
  );
}
