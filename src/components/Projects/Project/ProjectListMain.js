import React, { useState } from "react";
import ProjectList from "./ProjectList";
import ProjectCreation from "./ProjectCreation";
import { DefButton } from "../../ComponentList";

export default function ProjectListMain() {
  const [CreateProject, setCreateProject] = useState(false);

  return (
    <div className="">
      <div className="flex justify-between gap-x-2">
        {!CreateProject && (
          <DefButton
            type="10"
            text="New Project"
            className=" mx-2 p-0"
            onClick={() => setCreateProject(!CreateProject)}
          />
        )}
      </div>

      {CreateProject && <ProjectCreation setCreateProject={setCreateProject} />}
      {!CreateProject && <ProjectList />}
    </div>
  );
}
