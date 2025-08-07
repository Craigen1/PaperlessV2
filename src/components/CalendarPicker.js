import React, { useEffect, useRef, useState } from "react";
import GoodsIssue from "./GoodsIssue";
import { DefButton, DefMenus, DefTable } from "./ComponentList";
import validator from "validator";
import CalendarDatePicker from "./CalendarDatePicker";
export default function CalendarPicker(props) {
  const DatePickers = useRef(null);
  const [SelectedMenuId, setSelectedMenuId] = useState(0);
  const [OpenCalendarHolder, setOpenCalendarHolder] = useState(true);
  const [selectedFrom, setselectedFrom] = useState(true);
  const [selectedTo, setselectedTo] = useState(false);
  const [CalendarSize, setCalendarSize] = useState(0);
  const [CalendarSizeh, setCalendarSizeh] = useState(0);
  const menus = [
    {
      id: 0,
      text: "Request",
    },
    {
      id: 1,
      text: "History",
    },
  ];

  const [days, setDays] = useState([]);
  const today = new Date();
  const [MonthHolder, setMonthHolder] = useState(today.getMonth());
  const [YearHolder, setYearHolder] = useState(today.getFullYear());
  const [FromDateHolder, setFromDateHolder] = useState(today);
  const [ToDateHolder, setToDateHolder] = useState(today);

  const [PlaceHolderFromDateHolder, setPlaceHolderFromDateHolder] =
    useState(today);
  const [PlaceHolderToDateHolder, setPlaceHolderToDateHolder] = useState(today);
  const OpenCalendar = (e) => {
    if (OpenCalendarHolder) {
      setselectedTo(false);
      setselectedFrom(false);
    } else {
      setselectedTo(false);
      setselectedFrom(true);
    }

    setOpenCalendarHolder(!OpenCalendarHolder);
  };
  //   const [MonthHolder, setMonthHolder] = useState(today.getMonth());

  //   const [daysArray, setdaysArray] = useState([]);
  //   function getMonthName (monthNumber) {
  //     const date = new Date();
  //     date.setMonth(monthNumber - 1);

  //     return date.toLocaleString("en-US", {
  //       month: "long",
  //     });
  //     }
  const CalButtonsComp = [
    {
      label: "Today",
    },
    {
      label: "Yesterday",
    },

    {
      label: "Last 7 Days",
    },
    {
      label: "Last 30 Days",
    },

    {
      label: "This Month",
    },
    {
      label: "This Year",
    },
  ];
  const FunctionsHandler = (e) => {
    const { name } = e.target;
    let z = new Date();
    let y = new Date();
    if (name == "Today") {
      z = new Date(z.getFullYear(), z.getMonth(), z.getDate());
      y = new Date(z.getFullYear(), z.getMonth(), z.getDate());
    } else if (name == "Yesterday") {
      z = new Date(z.getFullYear(), z.getMonth(), z.getDate() - 1);
      y = new Date(y.getFullYear(), y.getMonth(), y.getDate() - 1);
    } else if (name == "Last 7 Days") {
      z = new Date(z.getFullYear(), z.getMonth(), z.getDate() - 7);
      y = new Date(y.getFullYear(), y.getMonth(), y.getDate());
    } else if (name == "Last 7 Days") {
      z = new Date(z.getFullYear(), z.getMonth(), z.getDate() - 7);
      y = new Date(y.getFullYear(), y.getMonth(), y.getDate());
    } else if (name == "Last 30 Days") {
      z = new Date(z.getFullYear(), z.getMonth() - 1, z.getDate());
      y = new Date(y.getFullYear(), y.getMonth(), y.getDate());
    } else if (name == "This Month") {
      z = new Date(z.getFullYear(), z.getMonth(), 1);
      y = new Date(y.getFullYear(), y.getMonth() + 1, 0);
    } else if (name == "This Year") {
      z = new Date(z.getFullYear(), 0, 1);
      y = new Date(y.getFullYear(), 11, 31);
    }

    setFromDateHolder(z);
    setPlaceHolderFromDateHolder(z);

    setToDateHolder(y);
    setPlaceHolderToDateHolder(y);
  };
  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  };
  //   const [MonthHolderName, setMonthHolderName] = useState(
  //     getMonthName(today.getMonth() + 1)
  //   );
  function isEqualThatDay(day1, day2) {
    return (
      day1.getDate() == day2.getDate() &&
      day1.getMonth() == day2.getMonth() &&
      day1.getFullYear() == day2.getFullYear()
    );
  }

  const HandleCalendarClick = (e) => {
    const { id, value, name } = e.target;
    // console.log({valu});
    let newDate = new Date(value);
    let x = new Date(
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      newDate.getDate()
    );
    // console.log({ newDate });
    if (selectedTo) {
      setToDateHolder(newDate);
      setPlaceHolderToDateHolder(newDate);
      setselectedTo(false);
      setselectedFrom(true);
      return;
    }

    if (selectedFrom) {
      setFromDateHolder(newDate);
      setPlaceHolderFromDateHolder(newDate);
      setselectedTo(true);
      setselectedFrom(false);
      return;
    }
  };

  const renderRows = () => {
    const rows = [];
    let currentRow = [];
    getDaysInMonth(YearHolder, MonthHolder).forEach((day, index) => {
      // console.log("x");
      currentRow.push(
        <td
          key={index}
          className={
            FromDateHolder <= day.date && ToDateHolder >= day.date
              ? isEqualThatDay(FromDateHolder, day.date)
                ? isEqualThatDay(FromDateHolder, ToDateHolder)
                  ? " bg-black text-white rounded-md"
                  : " bg-black text-white rounded-l-md"
                : isEqualThatDay(ToDateHolder, day.date)
                ? " bg-black text-white rounded-r-md"
                : " bg-black text-white "
              : ""
          }
        >
          <button
            className={`w-full h-8   text-center ${day.type}`}
            id={index}
            value={day.date}
            name={day.type}
            onClick={HandleCalendarClick}
          >
            {day.date.getDate()}
          </button>
        </td>
      );
      if (currentRow.length === 7) {
        rows.push(
          <tr className="border-b-2  border-white" key={index}>
            {currentRow}
          </tr>
        );
        currentRow = [];
      }
    });

    return rows;
  };
  function getDaysInMonth(year, month) {
    const daysArray = [];

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Get the last day of the previous month
    const previousMonthLastDay = new Date(year, month, 0).getDate();
    // Push past days from previous month
    for (
      let i = previousMonthLastDay;
      i > previousMonthLastDay - new Date(year, month, 1).getDay();
      i--
    ) {
      daysArray.push({ date: new Date(year, month - 1, i), type: "past" });
    }
    daysArray.reverse();

    // Push days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({
        date: new Date(year, month, i),
        type:
          year === today.getFullYear() && month === today.getMonth()
            ? "present"
            : "present",
      });
    }
    // Push future days from future month
    const remainingDays = 42 - daysArray.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push({ date: new Date(year, month + 1, i), type: "future" });
    }
    // console.log({ daysArray });

    return daysArray;
  }
  //   const daysArray = ;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const MoveMonthHolder = (e) => {
    const { id } = e.target;
    if (id == "left" && MonthHolder == 0) {
      setMonthHolder(11);
      setYearHolder(YearHolder - 1);
      return;
    }

    if (id == "right" && MonthHolder == 11) {
      setMonthHolder(0);
      setYearHolder(YearHolder + 1);

      return;
    }

    if (id == "right") setMonthHolder(MonthHolder + 1);
    if (id == "left") setMonthHolder(MonthHolder - 1);
    console.log({ MonthHolder });
  };

  useEffect(() => {
    if (DatePickers != null) {
      setCalendarSize(DatePickers.current.clientWidth);
      setCalendarSizeh(DatePickers.current.clientHeight);
      setOpenCalendarHolder(false);
    }
  }, [DatePickers]);

  useEffect(() => {
    props.setFrom(FromDateHolder);
    props.setTo(ToDateHolder);
    console.log({ FromDateHolder, ToDateHolder });
  }, [FromDateHolder, ToDateHolder]);

  useEffect(() => {
    let z = new Date();
    setFromDateHolder(new Date(z.getFullYear(), z.getMonth() + 1, z.getDate()));
    setPlaceHolderFromDateHolder(
      new Date(z.getFullYear(), z.getMonth(), z.getDate())
    );
    setToDateHolder(new Date(z.getFullYear(), z.getMonth() + 1, z.getDate()));
    setPlaceHolderToDateHolder(
      new Date(z.getFullYear(), z.getMonth(), z.getDate())
    );
  }, []);

  // useEffect(() => {
  //   // try {
  //   //   document.addEventListener("click", function (e) {
  //   //     if (document.getElementById("clickbox").contains(e.target)) {
  //   //       console.log("in");
  //   //     } else {
  //   //     }
  //   //   });
  //   // } catch (error) {}
  // }, []);
  const CalendarCompact = (p) => {
    return (
      <>
        <div className="w-12 text-sm">
          <div className="">
            <div>
              <div className="bg-mainLink  rounded-t-md font-semibold text-white">
                {p.date.toString().substring(3, 7).toUpperCase()}
              </div>
              <div className="bg-gray-710 rounded-b-md font-semibold">
                {p.date.getDate()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div>
        {/* {SelectedMenuId == 1 ? <GoodsIssue /> : <GoodsIssueHistory />} */}

        <div className="flex   w-fit" ref={DatePickers}>
          {OpenCalendarHolder ? (
            <>
              <CalendarDatePicker
                setDatePicker={setFromDateHolder}
                DatePicker={PlaceHolderFromDateHolder}
                selected={selectedFrom}
              />
              <CalendarDatePicker
                setDatePicker={setToDateHolder}
                DatePicker={PlaceHolderToDateHolder}
                selected={selectedTo}
              />
            </>
          ) : (
            <button
              className="flex  rounded-md"
              onClick={OpenCalendar}
              style={{
                width: CalendarSize,
                height: CalendarSizeh,
              }}
            >
              <div className=" flex gap-x-2">
                <CalendarCompact date={FromDateHolder} />
                <span className="mt-2">-</span>
                <CalendarCompact date={ToDateHolder} />
              </div>
            </button>
          )}

          {/* <button className="ml-1">
            <p
              className={
                OpenCalendarHolder
                  ? `font-semibold text-2xl -rotate-90 p-0 m-0 active:scale-90 transition-transform  text-center pr-1`
                  : `font-semibold text-2xl rotate-90 p-0 m-0 active:scale-90 transition-transform  text-center`
              }
            >
              {">"}
            </p>
          </button> */}
        </div>
        <div
          className={
            !OpenCalendarHolder
              ? "frame  pt-2 absolute z-50 mt-2    opacity-0  invisible m-0"
              : "frame  pt-2 absolute z-50 mt-2     opacity-100   m-0"
          }
          style={{
            width: CalendarSize,
          }}
          id="clickbox"
        >
          <div className="flex">
            <button
              id="left"
              onClick={MoveMonthHolder}
              className="font-semibold text-3xl"
            >
              {"<"}
            </button>
            <div className="w-full">
              <div className="text-2xl font-semibold text-center w-full ">
                {monthNames[MonthHolder]}
              </div>
              <div className=" font-semibold text-center w-full ">
                {YearHolder}
              </div>
            </div>
            <button
              id="right"
              onClick={MoveMonthHolder}
              className="font-semibold text-3xl"
            >
              {">"}
            </button>
          </div>
          <div></div>
          <table className="w-full p-1">
            <thead>
              <tr className="h-6  font-semibold">
                <td
                  style={{
                    minWidth: "20px",
                    maxWidth: "20px",
                  }}
                  className="text-center"
                >
                  Su
                </td>
                <td
                  style={{
                    minWidth: "20px",
                    maxWidth: "20px",
                  }}
                  className="text-center"
                >
                  Mo
                </td>
                <td
                  style={{
                    minWidth: "20px",
                    maxWidth: "20px",
                  }}
                  className="text-center"
                >
                  Tu
                </td>
                <td
                  style={{
                    minWidth: "20px",
                    maxWidth: "20px",
                  }}
                  className="text-center"
                >
                  We
                </td>
                <td
                  style={{
                    minWidth: "20px",
                    maxWidth: "20px",
                  }}
                  className="text-center"
                >
                  Th
                </td>
                <td
                  style={{
                    minWidth: "20px",
                    maxWidth: "20px",
                  }}
                  className="text-center"
                >
                  Fr
                </td>
                <td
                  style={{
                    minWidth: "20px",
                    maxWidth: "20px",
                  }}
                  className="text-center"
                >
                  Sa
                </td>
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </table>
          <div className="grid grid-2 gap-1 grid-cols-2 mb-2">
            {CalButtonsComp.map((p, i) => (
              <>
                <div className="w-full">
                  <DefButton
                    text={p.label}
                    name={p.label}
                    type="2"
                    className="w-full px-2 h-10  "
                    onClick={FunctionsHandler}
                  />
                </div>
              </>
            ))}
          </div>
          <DefButton onClick={OpenCalendar} text="Update" />
        </div>
      </div>
    </>
  );
}
