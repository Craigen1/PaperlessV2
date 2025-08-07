import React, { useContext, useEffect, useState } from "react";
import { ITopContext } from "../../hooks/TopContext";
import RedditComments from "./RedditComments";
import RedditPostArtile from "./RedditPostArtile";

export default function RedditPostPost(props) {
  const { ArticleData, setSelectedArticleDataBody, RawArticleData } =
    useContext(ITopContext);
  const [RedditPostTitle, setRedditPostTitle] = useState([]);
  const [RedditPostComments, setRedditPostComments] = useState([]);
  const [propsx, setpropsx] = useState(props.article);
  const [GetAuth, setGetAuth] = useState([]);

  const searchSelectedArticle = async () => {
    try {
      console.log({ RawArticleData });
      if (
        propsx.url.slice(-3) == "png" ||
        propsx.url.slice(-3) == "jpg" ||
        propsx.url.slice(-3) == "gif" ||
        propsx.secure_media != null
      ) {
        setRedditPostComments(RawArticleData[1].data.children);
      } else {
        await fetch(propsx.url.slice(0, -1) + ".json").then((res) => {
          if (res.status != 200) {
            console.log("errpr fetch reddit selection");
            return;
          }
          res.json().then((data) => {
            setRedditPostTitle(data[0].data);
            setRedditPostComments(data[1].data.children);
          });
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const getAuth = async (author) => {
    // console.log(`https://www.reddit.com/user/${author}/about.json`);
    try {
      await fetch(`https://www.reddit.com/user/${author}/about.json`).then(
        (res) => {
          // // console.log({ SubReddit });
          if (res.status != 200) {
            // console.log("error on profile fetch");
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
      console.log({ error });
    }
    // console.log({ GetAuth });
  };
  useEffect(() => {
    if (propsx.url == "") return;
    searchSelectedArticle();
  }, [propsx.url]);

  // HTMLS

  return (
    <>
      <RedditPostArtile key={0} article={propsx} forPost={false} />

      <div className="">
        {RedditPostComments.map((item, index) => (
          <RedditComments com={item.data} index={index} />
        ))}
      </div>
    </>
  );
}
