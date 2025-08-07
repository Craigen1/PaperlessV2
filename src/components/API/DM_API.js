import React, { useEffect } from "react";

export default function DM_API() {
  const SearchSubReddit = async () => {
    const PORT = "3000";
    const HOST = "10.50.79.52";

    const x = await fetch(
      `https://${HOST}:${PORT}/DMF_API?SQLID=2003&user=[user]&pass=[password]&val=Sales Inv`,
      {
        method: "GET",
        redirect: "follow",
      }
    ).then((res) => {
      if (res.status != 200) {
        console.log(res.status);
        return;
      }
      res.json().then((data) => {
        if (data != null) {
          console.log(data);
        }
      });
    });
  };
  useEffect(() => {
    SearchSubReddit();
  }, []);

  return <></>;
}
