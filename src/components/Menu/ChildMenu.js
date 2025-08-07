import React, { useContext, useEffect, useState } from "react";
import { Label, solutions } from "../ComponentList";
import { ArrayChecker } from "../../functions/handler";
import { ITopContext } from "../../hooks/TopContext";

export default function ChildMenu(p) {
  const {
    setCanNavigate,
    setuserid,
    setSelectedModule,
    SelectedModule,
    setAllowedModuleids,
  } = useContext(ITopContext);

  const { allowedModuleids } = useContext(ITopContext);
  const [hasChild, sethasChild] = useState(false);
  const checkIfHasChild = () => {
    let hasChildHolder = false;
    solutions.map((item, index) => {
      if (hasChildHolder) return;
      if (item.folder != p.module) return;
      console.log(item.folder);
      console.log(p.module);
      hasChildHolder = ArrayChecker(allowedModuleids, item.id);
    });
    console.log({ hasChildHolder });
    p.sethasChild(hasChildHolder);
  };

  useEffect(() => {
    checkIfHasChild();
  }, [allowedModuleids]);

  return (
    <div>
      <ul className="p-0 m-0 menu">
        {solutions.map((item, index) => (
          <>
            {item.id > 0 && (
              <>
                {item.folder == p.folder && (
                  <>
                    {ArrayChecker(allowedModuleids, item.id) && (
                      <li className="flex ml-6 " key={item.id}>
                        <button
                          className={
                            item.name == p.finalModule
                              ? "  flex no-underline   p-0 m-0 tail  whitespace-nowrap bg-[#f8f8f8]  w-[90%]"
                              : "   flex no-underline   p-0 m-0  tail2 whitespace-nowrap bg-[#f8f8f8] w-[90%]"
                          }
                          onClick={() => {
                            if (ArrayChecker(allowedModuleids, item.id)) {
                              // setp.SelectedModule(item.id);
                              console.log("allowed");
                              p.setSelectedModuleid(index);
                              p.setSelectedModule(item.id);

                              if (p.matches != true) p.setretract2(false);
                              // HandlerResizeIfMoble();

                              // // setModuleName(item.name);
                              // // setCanNavigate(false);
                              const x = document.getElementById("drawer");
                              document.getElementById("drawer").checked = false;
                              return;
                            } else {
                              // setpopTitle("Access Denied : " + item.id);
                              // setpopLabel(allowedModuleids);
                              // setPop(true);
                              // EXEC_SQL_InsertOne(
                              //   47,
                              //   setallowdModuleHolder,
                              //   userInfo.ID
                              // );
                            }
                          }}
                        >
                          {/* <item.icon
                            className={
                              item.id == p.SelectedModule
                                ? "mt-1 ml-2 h-5 w-5     text-black "
                                : " mt-1 ml-2 h-5 w-5   text-black "
                            }
                            aria-hidden="true"
                          /> */}
                          <span
                            className={
                              ArrayChecker(allowedModuleids, item.id)
                                ? SelectedModule == item.id
                                  ? "font-semibold  px-2 rounded-md my-1 mr-4  bg-trans20"
                                  : "font-semibold  px-2 rounded-md my-1 mr-4"
                                : "font-semibold   px-2 rounded-md my-1 mr-4 line-through   first-letter:"
                            }
                          >
                            {item.name}
                          </span>
                        </button>
                      </li>
                    )}
                  </>
                )}
              </>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}
