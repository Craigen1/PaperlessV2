import React, { useEffect, useState } from "react";

export default function CalendarDatePicker(props) {
  const today = new Date();
  const [fromDatePicker, setfromDatePicker] = useState({
    From_month: props.DatePicker.getMonth(),
    From_day: props.DatePicker.getDate(),
    From_year: props.DatePicker.getFullYear(),
  });
  const [prevValidDate, setprevValidDate] = useState(today);
  const DatePickerhander = (e) => {
    const { id, value } = e.target;

    if (id == "From_month" && parseInt(value) > 12) return;
    if (id == "From_month" && parseInt(value) < 1) return;

    if (id == "From_day" && parseInt(value) > 31) return;
    if (id == "From_day" && parseInt(value) < 1) return;
    setfromDatePicker((e) => ({ ...e, [id]: value }));
    // console.log({ id, value });
  };
  const evaluate = (e) => {
    let isdatex =
      fromDatePicker.From_year +
      "/" +
      fromDatePicker.From_month +
      "/" +
      fromDatePicker.From_day;
    const x = new Date(isdatex);
    // console.log({ ...fromDatePicker });
    // console.log(x);
    // console.log(isdatex);
    setfromDatePicker((e) => ({ ...e, From_day: x.getDate() }));
    setfromDatePicker((e) => ({ ...e, From_month: x.getMonth() + 1 }));
    setfromDatePicker((e) => ({ ...e, From_year: x.getFullYear() }));

    props.setDatePicker(new Date(x.getFullYear(), x.getMonth(), x.getDate()));
  };

  // useEffect(() => {
  //   props.setDatePicker(
  //     new Date(
  //       fromDatePicker.From_year,
  //       fromDatePicker.From_month,
  //       fromDatePicker.From_day
  //     )
  //   );
  // }, [fromDatePicker]);

  useEffect(() => {
    setfromDatePicker({
      From_month: props.DatePicker.getMonth() + 1,
      From_day: props.DatePicker.getDate(),
      From_year: props.DatePicker.getFullYear(),
    });
  }, [props.DatePicker]);

  return (
    <>
      <div
        className={`flex gap-2 ${
          props.selected
            ? "border-2 border-trans50 rounded-md"
            : "border-2 border-transparent"
        }`}
      >
        <div className="border rounded-md w-fit">
          <input
            className="w-8 text-center  m-0 px-0 mx-0 border-none focus:border-none text-sm "
            type="number"
            onChange={DatePickerhander}
            id={"From_month"}
            value={fromDatePicker.From_month}
            onBlur={evaluate}
          />
          /
          <input
            className="w-8 text-center  m-0 px-0 mx-0 border-none focus:border-none text-sm"
            type="number"
            onChange={DatePickerhander}
            id={"From_day"}
            value={fromDatePicker.From_day}
            onBlur={evaluate}
          />
          /
          <input
            className="w-12 text-center  m-0 px-0 mx-0 border-none focus:border-none text-sm"
            type="number"
            onChange={DatePickerhander}
            id={"From_year"}
            value={fromDatePicker.From_year}
            onBlur={evaluate}
          />
        </div>
      </div>
    </>
  );
}
