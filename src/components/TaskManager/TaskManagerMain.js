import React, { useContext, useState } from "react";
import { DefButton, DefInput, DefMenus, DefTable } from "../ComponentList";
import { ArrowCircleLeftIcon, ViewGridIcon } from "@heroicons/react/outline";
import TaskManagerLine from "./TaskManagerLine";
import TaskManagerLineHeader from "./TaskManagerLineHeader";
import TaskManagerLineMain from "./TaskManagerLineMain";
import { ITopContext } from "../../hooks/TopContext";

export default function TaskManagerMain() {
  const { userInfo } = useContext(ITopContext);

  const menus = [
    {
      id: 0,
      text: "Projects",
    },
    {
      id: 1,
      text: "List",
    },
    {
      id: 2,
      text: "Timeline",
    },
  ];
  const [SelectedMenuId, setSelectedMenuId] = useState(0);

  const onChangeHandler = (e) => {};
  const onClickHandler = (e) => {};
  const projectList = [
    {
      name: "Paperless",
      desc: "Paperless aims to aid production ERP gaps",
    },

    {
      name: "Palleting",
      desc: "Transfers stocks to QA with pallet tag printing",
    },

    {
      name: "OSH Auto DR",
      desc: "Automaticaliy creates a DR from RFP",
    },

    {
      name: "SelfBilling",
      desc: "Allows sales agent to bill FGs with out actual delivery documents",
    },
    {
      name: "SelfBilling",
      desc: "Allows sales agent to bill FGs with out actual delivery documents",
    },
  ];
  // Components
  const PorjectComponent = (p) => {
    return (
      <div
        className="
        sm:w-full xs:w-full md:w-64 cursor-pointer
        rounded-md flex bg-WhiteMode-FromBackground000 hover:bg-WhiteMode-Border p-1 mx-2"
      >
        <div className="rounded-full w-10 h-10 bg-gray-410 text-center text-white text-2xl font-semibold pt-0.5">
          {p.items.name.substring(0, 2)}
        </div>
        <div className="mx-2">
          <div className="font-semibold "> {p.items.name}</div>
          <div className="text-trans50   md:w-40">{p.items.desc}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <DefMenus
        menus={menus}
        SelectedMenuId={SelectedMenuId}
        setSelectedMenuId={setSelectedMenuId}
      />
      <div className="frame py-2">
        {SelectedMenuId == 0 && (
          <React.Fragment className="">
            <div className="flex flex-wrap w-fit   gap-2  mx-auto">
              <div
                onClick={() => {}}
                className="
        sm:w-full xs:w-full md:w-64 cursor-pointer rounded-md flex bg-WhiteMode-Border p-1 mx-2"
              >
                <div className="rounded-full w-10 h-10 bg-WhiteMode-Border border-2 border-dashed text-center border-white text-white text-2xl font-semibold ">
                  +
                </div>
                <div className="mx-2">
                  <div className="font-semibold text-trans50 mt-2 mr-2 ">
                    Add Project
                  </div>
                  <div className="  md:w-40 bg-trans20 text-transparent rounded-md mb-1 ">
                    x
                  </div>
                  <div className="  md:w-40 bg-trans20 text-transparent rounded-md ">
                    x
                  </div>
                </div>
              </div>

              {projectList.map((item, index) => (
                <React.Fragment key={index}>
                  <PorjectComponent items={item} />
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        )}
        {SelectedMenuId == 1 && <TaskManagerLineMain />}
      </div>
      <div className=" top-0 left-0  fixed w-full h-full bg-trans50 ">
        <div className="frame relative mx-auto  max-w-md max-h-full  mt-[calc(10%-1rem)] pb-10">
          <h4 className="pt-1 pl-1">Proect Information</h4>
          <div className="pl-4 Border-top  pt-2 mt-2">
            <DefInput
              label="Project Owner"
              value={(
                userInfo.firstname +
                " " +
                userInfo.lastname
              ).toUpperCase()}
              disabled={true}
            />
            <div className="siparator"></div>
            <DefInput label="Project Name" onChange={onChangeHandler} />
            <DefInput label="Project Description" onChange={onChangeHandler} />
            <DefButton
              text="Add"
              onClick={onClickHandler}
              type="2B"
              load
              className="w-fit px-2 float-right  mt-2 "
            />
          </div>
        </div>
      </div>
    </>
  );
}
