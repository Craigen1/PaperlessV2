import React, { useContext, useEffect, useState } from "react";
import TimeLineProjects from "./TimeLineProjects";
import { ITopContext } from "../../../../hooks/TopContext";
import { EXEC_SQL_InsertOne } from "../../../ComponentList";

export default function TimeLineMain() {
  const { userInfo } = useContext(ITopContext);
  const [rows, setrows] = useState([]);
  const GetProjectByUser = async () => {
    await EXEC_SQL_InsertOne(857, setrows, userInfo.ID);
  };
  useEffect(() => {
    GetProjectByUser();
  }, []);

  return (
    <div>
      {rows.map((item) => (
        <TimeLineProjects item={item} />
      ))}
    </div>
  );
}
