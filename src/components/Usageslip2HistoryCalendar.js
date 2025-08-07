import React, { useEffect, useState } from "react";
import CalendarPicker from "./CalendarPicker";
import { DefButton } from "./ComponentList";

export default function Usageslip2HistoryCalendar(p) {
  const [To, setTo] = useState("");
  const [From, setFrom] = useState("");
  useEffect(() => {
    p.setFrom(From);
    p.setTo(To);
    console.log({ To, From });
  }, [To, From]);

  return (
    <div className="      frame ">
      <CalendarPicker setFrom={setFrom} setTo={setTo} />
    </div>
  );
}
