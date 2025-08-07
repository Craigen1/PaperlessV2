/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import React from "react";
import { ArrowSmLeftIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { ITopContext } from "../hooks/TopContext";
import { loginWallpaper, solutions } from "./ComponentList";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let history = useNavigate();

  const {
    setuserid,
    userInfo,
    module,
    setModule,
    setCanNavigate,
    setModuleName,
  } = useContext(ITopContext);
  return (
    <>
      <Popover className="relative  z-40 max-w-md">
        <img
          src={loginWallpaper}
          alt="Logo"
          className="self-center   sm:h-96 w-fit  absolute  -z-50  "
          style={{ width: "100%", top: -290 }}
        />
        <div className=" flex justify-between items-center  ">
          <div className="flex justify-between items-center   py-6 ">
            <div className="flex justify-start ">
              <a href="#">
                <span className="sr-only">Workflow</span>
              </a>
            </div>
            <div className="  grow flex flex-row  ">
              <div className="flex text-base font-medium text-mainText hover:text-gray-700 ">
                {module === 1 ? (
                  <div className="grow flex flex-row mt-1">
                    👋 Hi there, {userInfo.firstname} {userInfo.lastname}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setModule(1);
                    }}
                    className="flex justify-start "
                  >
                    <ArrowSmLeftIcon className="w-8 text-mainText" />
                    <div>
                      <h6 className="mt-1.5  text-mainText  ">
                        {/* {solutions[module].emoji} {solutions[module].name} */}
                        Back
                      </h6>
                    </div>

                    {/* <div className="absolute left-1/2 -ml-4 ">
                
                    </div> */}

                    <div className="w-64 mx-2">
                      <h6 className="mt-1.5  text-mainText  ">
                        {solutions[module].emoji} {solutions[module].name}
                      </h6>
                    </div>
                  </button>
                )}
              </div>
              <div className="flex">
                <div className="absolute   right-4 h-5 z-10">
                  <Popover.Button className="  rounded-md p-2 inline-flex  text-gray-900 hover:text-gray-500  focus:outline-none focus:ring-2 focus:ring-inset ">
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <Popover.Group as="nav" className=" md:flex space-x-10">
              <Popover className="relative">
                {() => (
                  <>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className=" z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                        <div className="content-center rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="px-5 py-5 bg-gray-50  ">
                            <div>
                              <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                                Modules
                              </h3>
                              <ul role="list" className="mt-4 space-y-4">
                                {solutions.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                  >
                                    {/* <item.icon
                                    className="flex-shrink-0 h-6 w-6 text-gray-600"
                                    aria-hidden="true"
                                  /> */}
                                    <span className="ml-3">{item.emoji}</span>
                                    <span className="ml-3 text-base font-medium text-mainText">
                                      {item.name}
                                    </span>
                                  </a>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </Popover.Group>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel>
            <div className="rounded-lg shadow-2xl bg-mainButton float-right mt-2 mr-4 ">
              <div className="py-6 px-3 space-y-4">
                <div className="grid grid-cols-1 gap-y-2 gap-x-2 ">
                  <button
                    className="text-base font-medium border-l-main border-l-8 w-full  mx-0 text-left px-2  only: text-mainText hover:text-gray-700 "
                    onClick={() => {
                      setCanNavigate(false);
                      setModule(102);
                      setModuleName("UserSettings");
                    }}
                  >
                    User Settings
                  </button>

                  <button
                    className="text-base font-medium border-l-main border-l-8 w-full  mx-0 text-left px-2 bg-gra text-mainText hover:text-gray-700"
                    onClick={() => {
                      setCanNavigate(true);
                      setuserid(0);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
}
