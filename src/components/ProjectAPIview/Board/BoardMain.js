import React, { useContext, useState } from "react";
import BoardCards from "./BoardCards";
import BoardCard from "./BoardCard";
import BoardCardGroup from "./BoardCardGroup";
import { ITopContext } from "../../../hooks/TopContext";
import {
  ArrowSmLeftIcon,
  ArrowSmRightIcon,
  ChevronLeftIcon,
  DuplicateIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";

export default function BoardMain() {
  const { userInfo } = useContext(ITopContext);

  const optionList = [
    {
      label: "Cancel",
      id: "cancel",
      icon: ChevronLeftIcon,
    },
    {
      id: "separator",
    },
    {
      label: "Duplicate",
      id: "duplicate",
      icon: DuplicateIcon,
    },

    {
      id: "separator",
    },

    {
      label: "Edit Property",
      id: "editProp",
      icon: PencilAltIcon,
    },

    {
      label: "Move To",
      id: "move",
      icon: ArrowSmRightIcon,
    },
    {
      id: "separator",
    },
    {
      label: "Archive",
      id: "delete",
      icon: TrashIcon,
    },
  ];

  const [BoardCards, setBoardCards] = useState({
    Y: 0,
    X: 0,
  });
  const [ShowOptions, setShowOptions] = useState(false);
  const OptionsHandler = (e) => {
    const { id, name, value } = e.target;
    setShowOptions(false);
  };

  return (
    <>
      <div className="flex overflow-auto h-full">
        <BoardCardGroup
          setShowOptions={setShowOptions}
          setBoardCards={setBoardCards}
          userid={userInfo.ID}
          status={"1"}
          header="Not Started"
        />
        <BoardCardGroup
          setShowOptions={setShowOptions}
          setBoardCards={setBoardCards}
          userid={userInfo.ID}
          status={"2"}
          header="In Progress"
        />
        <BoardCardGroup
          setShowOptions={setShowOptions}
          setBoardCards={setBoardCards}
          userid={userInfo.ID}
          status={"3"}
          header="Completed"
        />
      </div>

      {ShowOptions && (
        <div
          className={` w-56 bg-white  rounded-sm shadow border p-1 border-[#00000020] m-2
            fixed  ]
          `}
          style={{
            left: `${BoardCards.X - 150}px `,
            top: `${BoardCards.Y}px`,
          }}
        >
          {optionList.map((item, index) => (
            <div key={index} className="gap-y-1">
              {item.id == "separator" ? (
                <>
                  <div className="border-b border-[#00000020]"></div>
                </>
              ) : (
                <button
                  id={item.id}
                  onClick={OptionsHandler}
                  className="gap-x-1 hover:bg-trans20 w-full m-1 text-sm flex items-center gap-2"
                >
                  <div id={item.id} className="flex items-center">
                    <item.icon className="w-6 h-6" id={item.id} />
                    <span id={item.id}>{item.label}</span>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
