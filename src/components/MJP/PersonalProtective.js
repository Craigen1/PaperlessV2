import React from "react";
import { useState, useEffect } from "react";

export const MyList = ({ name, onClickVal }) => {
  return (
    <>
      <div className="flex items-center py-1">
        <input type="checkbox" className="w-4 h-5" onClick={onClickVal} />
        <label className=" font-medium px-2">{name}</label>
      </div>
    </>
  );
};

export default function PersonalProtective({ setPPE }) {
  const [viewList, setViewList] = useState(true);
  const [valList, setValList] = useState(Array(10).fill(false));

  function toggleHandle(index) {
    setValList((valList) =>
      valList.map((val, i) => (i === index ? !val : val))
    );
  }

  const handleCheckboxChange = (index) => {
    toggleHandle(index);
  };

  useEffect(() => {
    setPPE(valList);
  }, [valList]);

  return (
    <>
      <main>
        <div className="grid sm:grid-cols-2">
          <div className="grid col-span-2 py-2 bg-[#FCFCFC]">
            <div className="p-1">
              <button
                className="font-bold"
                type="button"
                onClick={() => setViewList(!viewList)}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                  </svg>
                  <h4 className="md:hidden flex px-1">PPE</h4>
                  <h4 className="hidden md:flex px-1">
                    Personal Protective Equipment
                  </h4>
                </div>
              </button>
              {viewList ? (
                <>
                  <div className="text-sm w-72">
                    <div className="rounded-sm px-2 py-1">
                      <i className="text-xs text-[#8D4DD0]">
                        *Mark check if worker/s has PPE
                      </i>
                      {[
                        "Hard hat with chin strap",
                        "Safety eye goggles/face shield/safety glasses",
                        "Dust mask or respirator",
                        "Ear muffs or ear plugs",
                        "Aprons",
                        "Safety shoes/boots with steel toe",
                        "Gloves",
                        "Full body harness with lifeline",
                        "Gloves & Boots",
                        "Chemical Suit",
                      ].map((item, index) => (
                        <MyList
                          key={index}
                          name={item}
                          onClickVal={() => handleCheckboxChange(index)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
