import React, { useEffect, useState } from "react";
import DeliveryScheduleTabs from "./DeliveryScheduleTabs";
import DeliveryScheduleSceduleV1 from "./DeliveryScheduleSceduleV1";
import { DefButton, EXEC_SQL } from "../ComponentList";
import DeliveryScheduleBooking from "./DeliveryScheduleBooking";
import DeliveryScheduleTimelIne from "./DeliveryScheduleTimelIne";

export default function DeliveryScheduleMain() {
  const [Upcomings, setUpcomings] = useState([]);
  const [activeTab, setactiveTab] = useState(1);
  const GetUpcomingSchedule = async () => {
    setUpcomings([]);
    await EXEC_SQL(929, setUpcomings);
  };

  useEffect(() => {
    GetUpcomingSchedule();
  }, []);

  return (
    <>
      <DeliveryScheduleTabs setactiveTab={setactiveTab} />
      {/* <DeliveryScheduleBooking /> */}
      {activeTab == 0 ? <DeliveryScheduleBooking /> : ""}
      {activeTab == 1 ? (
        <>
          <div className="frame py-2">
            <DefButton text="Refresh" onClick={GetUpcomingSchedule} />
          </div>
          <DeliveryScheduleSceduleV1 Upcomings={Upcomings} />
        </>
      ) : (
        ""
      )}
      {activeTab == 2 ? <DeliveryScheduleTimelIne /> : ""}
      {activeTab == 3 ? <DeliveryScheduleBooking /> : ""}
      {activeTab == 4 ? <DeliveryScheduleBooking /> : ""}
    </>
  );
}
