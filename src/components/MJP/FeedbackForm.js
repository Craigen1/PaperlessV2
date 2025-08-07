//Feedback Form
import React, { useContext, useEffect, useState } from "react";
import FBFHistory from "./FBFHistory";
import { FBFTimeline as MyTimeline } from "./FBFTimeline";
import { Fragment } from "react";
import { DefButton, EXEC_SQL_InsertOne } from "../ComponentList";
import { ITopContext } from "../../hooks/TopContext";

export default function FeedbackForm() {
  const [tab, setTab] = useState("1");
  const { userInfo } = useContext(ITopContext);
  const [con, setCon] = useState("");
  const [rate, setRate] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [Loading, setLoading] = useState(false);
  const [HandleReturn, setHandleReturn] = useState([]);

  const Timelines = [
    {
      id: 0,
      checked1: true,
      name: "State concern",
    },
    {
      id: 1,
      checked2: true,
      name: "Rate",
    },
    {
      id: 2,
      checked3: true,
      name: "Feedback",
    },
  ];

  const myNum = [
    {
      id: 1,
      disabled: true,
    },
    {
      id: 2,
      disabled: true,
    },
    {
      id: 3,
      disabled: true,
    },
    {
      id: 4,
      disabled: true,
    },
    {
      id: 5,
      disabled: true,
    },
  ];

  const handleCon = (e) => {
    setCon(e.target.value);
  };

  const handleRate = (item) => {
    setRate(item.id);
  };

  useEffect(() => {
    if (con === "" || con === null || con === undefined) {
      setRate(0);
      return;
    }
  }, [con]);

  useEffect(() => {
    if (rate === 0) {
      setFeedback("");
      return;
    }
  }, [rate]);

  const handleFeed = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async () => {
    if (con === undefined || rate === undefined || feedback === undefined) {
      return;
    }
    setLoading(!Loading);
    await EXEC_SQL_InsertOne(
      918,
      setHandleReturn,
      userInfo.ID,
      con,
      rate,
      feedback
    );
    setLoading(false);
  };
  useEffect(() => {
    console.log({ HandleReturn });
  }, [HandleReturn]);

  return (
    <>
      <div className="flex w-full bg-[#FFFFFF]">
        <button
          onClick={(e) => setTab(e.target.id)}
          className={
            tab == "1"
              ? `text-[#8D4DD0] h-[2rem] w-[5rem] px-2 mx-2 border-b-2 border-[#8D4DD0] font-medium my-2 ease-in-out duration-300`
              : `h-[2rem] w-[5rem] px-2 mx-2 font-medium my-2`
          }
          id={"1"}
        >
          Feedback
        </button>
        <p className="font-bold my-2">.</p>
        <button
          onClick={(e) => setTab(e.target.id)}
          className={
            tab == "2"
              ? `text-[#8D4DD0] h-[2rem] w-[5rem] px-2 mx-2 border-b-2 border-[#8D4DD0] font-medium my-2 ease-in-out duration-300`
              : `h-[2rem] w-[5rem] px-2 mx-2 font-medium my-2`
          }
          id={"2"}
        >
          History
        </button>
      </div>
      {tab === "1" ? (
        <>
          <div className="bg-[#FFFFFF] text-[#0E0D0D] p-4">
            <div className="grid grid-cols-3 w-full">
              {Timelines.map((item) => (
                <Fragment key={item.id}>
                  <div className="grid">
                    <div>{item.name}</div>
                  </div>
                </Fragment>
              ))}
              <MyTimeline
                checked={con === "" ? Timelines.checked1 : !Timelines.checked1}
              />
              <MyTimeline
                checked={rate === 0 ? Timelines.checked2 : !Timelines.checked2}
              />
              <MyTimeline
                checked={
                  feedback === "" ? Timelines.checked3 : !Timelines.checked3
                }
              />
            </div>
            <hr />
            <h1 className="font-bold text-3xl text-[#0E0D0D]">
              Share your <span className="text-[#8D4DD0]">Feedback</span>
            </h1>
            <div className="flex flex-col mt-2 max-w-xl">
              <label className="text-[#0E0D0D] text-lg">
                State your concern
              </label>
              <input
                disabled={false}
                className="h-9 max-w-md text-[#0E0D0D]"
                type="text"
                onChange={handleCon}
                id="1"
              />
            </div>
            <p className="text-[#0E0D0D] text-lg mt-3">
              Rate your experience using this Website.
            </p>
            <div className="flex justify-between m-3 font-medium text-xl">
              <div>Poor</div>
              <div>Excelent</div>
            </div>
            <div className="flex justify-around">
              {myNum.map((item) => (
                <Fragment key={item.id}>
                  <div className="grid place-items-center">
                    <button
                      disabled={
                        con === null || con === undefined || con === ""
                          ? item.disabled
                          : !item.disabled
                      }
                      id="2"
                      required
                      className="mb-2 border-black border-2 w-16 h-16 cursor-pointer hover:bg-[#9672D0] ease-out duration-300 rounded-sm"
                      style={{
                        backgroundColor: item.id === rate ? "#8D4DD0" : "",
                      }}
                      onClick={() => handleRate(item)}
                    >
                      {item.id}
                    </button>
                  </div>
                </Fragment>
              ))}
            </div>
            <hr />
            <div>
              <p className="text-[#0E0D0D] text-lg mt-4">
                Please share your feedback about your overall experience using
                our Website.
              </p>
              <textarea
                disabled={rate === 0 || con === "" ? true : false}
                id="3"
                className="border-black border-2"
                required
                onChange={handleFeed}
                cols={112}
                rows={9}
              />
            </div>
            <DefButton
              text="Send feedback"
              className="bg-[#8D4DD0] hover:bg-[#6C2CAF] border-none mt-2 h-11 rounded-md w-full text-white cursor-pointer"
              onClick={handleSubmit}
            />
          </div>
        </>
      ) : (
        <>
          <FBFHistory />
        </>
      )}
    </>
  );
}
