import React, { useEffect, useState } from "react";
import { DefButton } from "./ComponentList";

export default function Toast(p) {
  const [time, settime] = useState(0);

  const [duration, setDuration] = useState(3);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    let timerId = setInterval(() => {
      setDuration((prev) => prev - 1);
    }, 1000);
    console.log(timerId);

    return function cleanup() {
      console.log(`Clearing ${timerId}`);
      clearInterval(timerId);
    };
  }, []);
  useEffect(() => {
    if (duration <= 0) {
      p.setToastShow(false);
    }
  }, [duration]);

  return (
    <div className="fixed bottom-10 w-full px-4">
      <div className="w-[398px] shadow-md border rounded-md  h-[48px] p-2 float-right bg-white">
        {p.ToastShowMsg}
        <DefButton
          text="X"
          onClick={() => p.setToastShow(false)}
          type="2B"
          className="btn btn-primary btn-sm float-right p-0 m-0 px-2"
        />
      </div>
    </div>
  );
}
