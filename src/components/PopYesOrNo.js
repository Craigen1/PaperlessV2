import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { ITopContext } from "../hooks/TopContext";
import React from "react";
import Scanner from "./Scanner";
import POlist from "./POlist";

import { LoadingSpinner } from "../assets/SVGs";
import {
  ArrowNarrowLeftIcon,
  LockClosedIcon,
  PlusSmIcon,
} from "@heroicons/react/outline";
export function PopYesOrNo() {
  const { PopYesOrNo, setPopYesOrNo, popLabel, popTitle } =
    useContext(ITopContext);

  function closeModal() {
    setPopYesOrNo(false);
  }
  function closeModalx() {}

  return (
    <Transition appear show={PopYesOrNo} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModalx}>
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
              <Dialog.Panel className="w-full  py-4 max-w-md transform overflow-hidden rounded-2xl bg-transparent text-left align-middle   transition-all z-50">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div>
                    <div className=" md:hidden  grow flex flex-row  ">
                      <div className="flex text-base font-medium text-gray-900 hover:text-gray-700 ">
                        {/* <h6 className="">SCAN QR OR BAR CODE</h6>
                        <button
                          type="button"
                          className="absolute right-5 top-15 "
                          onClick={closeModal}
                        >
                          <PlusSmIcon className="w-8 text-gray-600 rotate-45" />
                        </button> */}
                      </div>
                    </div>
                  </div>
                </Dialog.Title>
                <div className="mx-4 text-center animate-bounce">
                  <h1 class=" font-bold text-gray-900">
                    <button
                      type="button"
                      class="w-40 inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      disabled={loading}
                      onClick={() => {
                        return false;
                      }}
                    >
                      <span>
                        Confirm <span aria-hidden="true"> → </span>
                      </span>
                    </button>
                  </h1>
                </div>

                <div className="mt-4">
                  {/* <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
