import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { ITopContext } from "../hooks/TopContext";
import React from "react";
import { DefaultButtonStyle } from "./ComponentList";
export function PopBox() {
  const { pop, setPop, popLabel, popTitle, setloading } =
    useContext(ITopContext);

  function closeModal() {
    setPop(false);
    setloading(false);
  }

  return (
    <Transition appear show={pop} as={Fragment}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="border-l-8 border-l-main w-full max-w-md transform overflow-hidden   bg-mainButton p-6 text-left align-middle shadow-xl transition-all z-50 rounded-r-xl rounded-b-xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-mainText"
                >
                  {popTitle}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-mainText">{popLabel}</p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className={DefaultButtonStyle}
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
