import React, { useState } from "react";
import CalendarPicker from "./CalendarPicker";
import { DefButton } from "./ComponentList";
import Usageslip2HistoryCalendar from "./Usageslip2HistoryCalendar";
import Usageslip2HistoryLines from "./Usageslip2HistoryLines";

export default function Usageslip2History() {
  const today = new Date();
  const [To, setTo] = useState(today);
  const [From, setFrom] = useState(today);
  const [UsageSlipList, setUsageSlipList] = useState([]);

  return (
    <>
      {/* <Usageslip2HistoryCalendar
        setTo={setTo}
        setFrom={setFrom}
        setUsageSlipList={setUsageSlipList}
      />
      <br></br>
      <br></br> */}
      <Usageslip2HistoryLines To={To} From={From} />
    </>
  );
}
