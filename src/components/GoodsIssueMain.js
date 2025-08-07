import React, { useState } from "react";
import { DefMenus } from "./ComponentList";
import GoodsIssue from "./GoodsIssue";
import GoodsIssueHistory from "./GoodsIssueHistory";
import GoodsIssueHelp from "./GoodsIssueHelp";
import Help from "./Help";
export default function GoodsIssueMain() {
  const menus = [
    {
      id: 0,
      text: "Request",
    },
    {
      id: 1,
      text: "History",
    },
    {
      id: 2,
      text: "Help",
    },
  ];
  const [SelectedMenuId, setSelectedMenuId] = useState(0);
  // const ar = [1, 2, 3];
  // const ar2 = [1, 2, 3];
  // const com = [...ar, ...ar2];
  // console.log(com);
  return (
    <>
      <DefMenus
        menus={menus}
        SelectedMenuId={SelectedMenuId}
        setSelectedMenuId={setSelectedMenuId}
      />
      {SelectedMenuId == "0" && <GoodsIssue />}
      {SelectedMenuId == "1" && <GoodsIssueHistory />}
      {SelectedMenuId == "2" && (
        <Help
          title={"How to use Goods Issue"}
          link={
            "https://app.tango.us/app/embed/aefd64b8-8f99-44d4-b9d4-9e31616b291d?skipCover=false&defaultListView=false&skipBranding=true"
          }
        />
      )}
    </>
  );
}
