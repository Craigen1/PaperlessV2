import React, { useContext, useEffect, useState } from "react";
import { ITopContext } from "../../../hooks/TopContext";
import { EXEC_SQL_InsertOne } from "../../ComponentList";
import { ArrowRightIcon } from "@heroicons/react/outline";
import TaskLine from "../Task/TaskLine";
import { useSearchParams } from "react-router-dom";

export default function ProjectList() {
  const { userInfo } = useContext(ITopContext);
  const [search, setsearch] = useSearchParams();
  const [rows, setrows] = useState([]);
  const GetProjectByUser = async () => {
    await EXEC_SQL_InsertOne(857, setrows, search.get("id"));
  };

  useEffect(() => {
    GetProjectByUser();
  }, []);

  return (
    <>
      {rows.map((item, index) => (
        <>
          <div className="border-b pb-2 pl-2 border-trans20" key={index}>
            <span className="ml-2 font-semibold  ">
              <TaskLine
                project={item.id}
                item={item}
                projectName={item.projectName}
              />
            </span>
          </div>
        </>
      ))}
    </>
  );
}

// <div>
//   <table class="table-auto">
//     <thead>
//       <tr>
//         <th>Song</th>
//         <th>Artist</th>
//         <th>Year</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td>Shining Star</td>
//         <td>Earth, Wind, and Fire</td>
//         <td>1975</td>
//       </tr>
//     </tbody>
//   </table>
// </div>;
