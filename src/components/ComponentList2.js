import { PlusIcon, ViewGridIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import { DefButton, DefInput } from "./ComponentList";

export const CodeGen_P_Edit = (props) => {
  return (
    <>
      <div class="max-w-7xl mx-auto pt-4  pb-2">
        <h1 class="text-xl font-bold text-mainText">{props.text}</h1>
      </div>
    </>
  );
};

export const CodeGen_Input_Edit = (p) => {
  return (
    <>
      <div className="">
        <p className="m-0 p-0 my-1">{p.label}</p>
        <input
          className={`${p.className} placeholder-gray-800`}
          value={p.value}
          id={p.id}
          type={p.type}
          name={p.value}
          onChange={p.onChange}
          placeholder={p.placeholder}
        />
      </div>
    </>
  );
};

export const CodeGen_Label_Edit = (p) => {
  return (
    <>
      <div className="">
        <div className="flex">
          <div className="min-w-[3rem] max-w-[3rem] flex">
            <button>
              <PlusIcon className="w-6" />
            </button>
            <button>
              <ViewGridIcon className="w-6" />
            </button>
          </div>
          <input value="asdasd" className="p-0 m-0 border-0 rounded-none" />
        </div>
      </div>
    </>
  );
};
export const DefFiler = (p) => {
  const [selectedCol, setselectedCol] = useState(-1);
  const [filterables, setfilterables] = useState([]);
  const [filterablesOpen, setfilterablesOpen] = useState(false);
  const [filterablesFilter, setfilterablesFilter] = useState("");
  const [toFilterMap, settoFilterMap] = useState("");

  const getFilters = (value) => {
    setfilterablesFilter("");
    setfilterables(uniqueMap(p.rows, value));
    setfilterablesOpen(true);
  };

  const filterTheFilters = (e) => {
    const value = e.target.value;
    console.log({ value });
    setfilterablesFilter(value);
  };

  const filterRow = (e) => {
    p.setfilter({
      ColumnName: p.columns[selectedCol],
      filterValue: e,
    });
    // console.log(p.columns[selectedCol]);
    // console.log(e);
    // settoFilterMap(e);
    // let filteredMap = [];
    // console.log({ e });
    // // return;
    // p.rows.map((ee, i) => {
    //   console.log();
    //   if (ee[p.columns[selectedCol].name] != toFilterMap) return;
    //   filteredMap.push(ee);
    // });
    // console.log({ filteredMap });
  };

  return (
    <>
      <div className="my-2">
        <p>Search By</p>
        <div className="flex gap-x-2">
          {p.columns.map((e, i) => (
            <>
              <div className="relative">
                <button
                  className={
                    selectedCol === i
                      ? "px-2 py-1  rounded-full text-sm font-bold  bg-[#000] text-white hover:bg-[#000000d0]"
                      : "px-2 py-1  rounded-full text-sm font-bold  bg-[#00000015] text-black hover:bg-[#00000005]"
                  }
                  onClick={() => {
                    setselectedCol(i);
                    getFilters(e.name);
                  }}
                >
                  {e.name}
                </button>
                <div></div>
              </div>
            </>
          ))}

          <button
            className="px-2 py-1  rounded-full text-sm font-bold  bg-[#000] text-white"
            onClick={() => setselectedCol(-1)}
          >
            Reset
          </button>
        </div>
        {filterablesOpen && (
          <div className="fixed top-0 left-0 z-50 bg-trans50 w-full h-full">
            <div className="mt-4 max-w-[512px] bg-white rounded-md h-[95%] mx-auto ">
              <div className="flex justify-between px-2">
                <DefInput
                  label={`Search By : ${p.columns[selectedCol].name}`}
                  handler={filterTheFilters}
                  className=""
                />
                <DefButton
                  text="X"
                  onClick={() => setfilterablesOpen(false)}
                  className="btn btn-primary btn-sm"
                />
              </div>
              <div className="overflow-auto h-[80vh]  px-2">
                {Array.isArray(filterables) && filterables.length > 0 && (
                  <>
                    {filterables.map((e, i) => (
                      <div>
                        {filterablesFilter != "" ? (
                          <>
                            {e
                              .toLowerCase()
                              .includes(filterablesFilter.toLowerCase()) && (
                              <div key={i}>
                                <DefButton
                                  text={e}
                                  onClick={() => filterRow(e)}
                                  className="btn btn-primary btn-sm"
                                />
                              </div>
                            )}
                          </>
                        ) : (
                          <div key={i}>
                            <DefButton
                              text={e}
                              onClick={() => filterRow(e)}
                              className="btn btn-primary btn-sm"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// export function uniqueMap(map, FilterByIndex) {
//   const uniqueTags = [];
//   console.log({ map });
//   map.map((e) => {
//     console.log(e.[1]);
//     if (uniqueTags.indexOf(e.FilterByIndex) === -1) {
//       uniqueTags.push(e.FilterByIndex);
//     }
//   });
//   console.log({ uniqueTags });
//   return uniqueTags;
// }
export function uniqueMap(map, filterByIndex) {
  const uniqueTags = [];
  map.map((e, i, x) => {
    if (uniqueTags.indexOf(e[filterByIndex]) === -1) {
      uniqueTags.push(e[filterByIndex]);
    }
  });
  return uniqueTags;
}

// export function uniqueMap(map, filterByIndex) {
//   const uniqueTags = new Set();
//   console.log({ map });
//   console.log({ filterByIndex });
//   map.map((e, i, x) => {
//     console.log({ e });
//     uniqueTags.add(e);
//   });

//   const uniqueTagsArray = Array.from(uniqueTags);
//   console.log({ uniqueTagsArray });
//   return uniqueTagsArray;
// }

export const Pager = (p) => {
  function RederBox(e) {
    return (
      <button onClick={e.onClick} id={e.id}>
        <div
          id={e.id}
          className={`border-[1px] border-black h-[32px] rounded-md text-center pt-[2px] px-[10px] font-bold ${
            e.active ? "bg-black text-white" : ""
          }`}
        >
          {e.label}
        </div>
      </button>
    );
  }
  const selectedRowConst = (e) => {
    const { id } = e.target;
    let x = p.selectedRow;
    if (id == 0 && x > 1) p.setselectedRow(x - 1);
    if (id == 2 && x < Math.ceil(p.rows.length / p.rowsPerPage))
      p.setselectedRow(x + 1);
  };

  return (
    <>
      <div className="mt-2">
        <div className="flex gap-x-2">
          <RederBox
            id={0}
            onClick={selectedRowConst}
            label={"<"}
            active={true}
          />
          <RederBox
            onClick={[]}
            id={1}
            label={`${p.selectedRow} out of ${Math.ceil(
              p.rows.length / p.rowsPerPage
            )}`}
            active={true}
          />
          <RederBox
            id={2}
            onClick={selectedRowConst}
            label={">"}
            active={true}
          />
        </div>
      </div>
    </>
  );
};
