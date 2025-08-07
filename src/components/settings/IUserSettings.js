import React, { useContext, useState } from "react";
import { DefMenus } from "../ComponentList";
import IUserSettingsGeneral from "./IUserSettingsGeneral";
import { ITopContext } from "../../hooks/TopContext";
import IUserSettingsChangePass from "./IUserSettingsChangePass";

export default function IUserSettings() {
  const { userInfo } = useContext(ITopContext);
  const [SelectedMenu, setSelectedMenu] = useState(0);
  const menus = [
    {
      id: 0,
      text: "General",
    },
    {
      id: 1,
      text: "Change Password",
    },
    {
      id: 2,
      text: "Help",
    },
  ];

  return (
    <div>
      <DefMenus
        menus={menus}
        SelectedMenuId={SelectedMenu}
        setSelectedMenuId={setSelectedMenu}
      />
      {SelectedMenu == 0 && <IUserSettingsGeneral />}
      {SelectedMenu == 1 && <IUserSettingsChangePass />}
    </div>
  );
}
