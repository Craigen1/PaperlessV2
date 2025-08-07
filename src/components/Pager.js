import React, { useContext, useEffect, useState } from "react";
import { ITopContext } from "../hooks/TopContext";
import {
  delay,
  EXEC_SQL,
  pageBg,
  pageBtnLeft,
  pageBtnMid,
  pageBtnRight,
} from "./ComponentList";

export default function Pager() {
  const {
    PageNpagination,
    setPageNpagination,
    SelectedPage,
    setSelectedPage,
    SearchParam,
  } = useContext(ITopContext);
  const [PageCount, setPageCount] = useState([]);
  const [ishide, setishide] = useState(true);
  const [pages, setpages] = useState([{}]);
  const addPage = async () => {
    {
      setpages([{}]);
      await delay(1000);
      // Array(PageCount[0].count)
      //   .fill(1)
      //   .map((el, i) => {
      //     setpages((p) => [
      //       ...p,
      //       {
      //         id: i + 1,
      //         page: i + 1,
      //       },
      //     ]);
      //     console.log(i);
      //   });
    }
    // ]);
  };

  const getPageSQL = async () => {
    setishide(false);
    await EXEC_SQL(SearchParam.SQLID, setPageCount, SearchParam.SQLVAL);
    await delay(100);
    await addPage();
    setishide(true);

    console.log("x1");
  };

  useEffect(() => {
    const setPagex = async () => {
      await addPage();
    };
    setPagex();
    console.log({ pages });
  }, [PageNpagination]);
  useEffect(() => {
    getPageSQL();
  }, [SearchParam]);

  return (
    <>
      <div>
        <div className=" w-full group round-le inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">
          <div className={pageBg}>
            <button
              type="button"
              className={pageBtnLeft}
              onClick={async () => {
                if (SelectedPage <= 1) return;
                await setSelectedPage(SelectedPage - 1);
                console.log(SelectedPage);
                await getPageSQL();
              }}
            >
              <span aria-hidden="true"> ← </span>
            </button>

            {/* <button type="button" className={pageBtnMid} onClick={() => {}}>
              <span aria-hidden="true"> 1 </span>
            </button> */}
            <select
              id="page"
              name="page"
              className="w-10 bg-transparent m-0 p-0  text-mainTextblack"
              value={SelectedPage}
              onChange={async (e) => {
                setSelectedPage(parseInt(e.target.value));
                await getPageSQL();
              }}
            >
              {PageCount.map((item, index) => (
                <option value={index}>{index}</option>
              ))}
            </select>
            <button
              type="button"
              className={pageBtnRight}
              onClick={async () => {
                if (SelectedPage >= 10) return;

                await setSelectedPage(SelectedPage + 1);
                console.log(SelectedPage);
              }}
            >
              <span aria-hidden="true"> → </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
