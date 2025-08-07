import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { ITopContext } from "../hooks/TopContext";
import React from "react";
import { DefaultButtonStyle } from "./ComponentList";
export function PopLogout() {
  const { BlockedPop, setBlockedPop, moduleName, setModule, setCanNavigate } =
    useContext(ITopContext);
  function closeModal() {
    setBlockedPop(false);
  }

  return (
    <Transition appear show={BlockedPop} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-50">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 "
                >
                  Confirm Navigation
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-black">
                    Are you sure you want leave{" "}
                    <span className="rounded-md bg-gray-700 px-2 mx-0.5 font-semibold">
                      {moduleName}
                    </span>
                    Module
                  </p>
                </div>

                <div className="flex flex-grow ">
                  <div className="">
                    <button
                      type="button"
                      className={DefaultButtonStyle}
                      onClick={() => {
                        setModule(1);
                        closeModal();
                        setCanNavigate(true);
                      }}
                    >
                      Yes
                    </button>
                  </div>

                  <div className="absolute right-6">
                    <button
                      type="button"
                      className={DefaultButtonStyle}
                      onClick={closeModal}
                    >
                      Resume
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
