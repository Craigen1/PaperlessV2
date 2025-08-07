import React, { useEffect } from "react";
import { useState } from "react";
import { DefButton } from "../ComponentList";

export function EditList({ item, setUpdateState, onUpdate }) {
  const [date, setDate] = useState(item.date);
  const [time, setTime] = useState(item.time);
  const [remarks, setRemarks] = useState(item.remarks);

  const handleUpdate = () => {
    onUpdate({ date, time, remarks });
    setUpdateState(true);
  };

  const handleCancel = () => {
    setUpdateState(true);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2 border">
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-28 md:w-36 border-none"
          type="date"
        />
        <input
          onChange={(e) => setTime(e.target.value)}
          value={time}
          className="w-28 md:w-36 border-none"
          type="time"
        />
        <textarea
          onChange={(e) => setRemarks(e.target.value)}
          value={remarks}
          className="w-28 md:w-36 border"
          type="text"
        />
        <div>
          <button
            onClick={handleUpdate}
            className="text-white w-12 h-8 bg-[#8D4DD0] text-xs rounded-md my-1 mx-2 py-1"
          >
            Update
          </button>
          <button
            onClick={handleCancel}
            className="text-white w-12 h-8 bg-GitHub-Pallet100 text-xs rounded-md my-1 py-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default function SiteInspection(p) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [remarks, setRemarks] = useState("");
  const [yourname, setYourName] = useState("");
  const [datetoday, setDateToDay] = useState("");
  const [input, setInput] = useState([]);
  const [show, setShow] = useState(false);
  const [updateState, setUpdateState] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };
  const handlerNew = () => {
    if (
      date.length == 0 ||
      time.length == 0 ||
      remarks.length == 0 ||
      date == undefined ||
      time == undefined ||
      remarks == undefined
    )
      return;
    setInput((e) => [
      ...e,
      {
        time: time,
        date: date,
        remarks: remarks,
      },
    ]);
  };

  const handleDelete = (index) => {
    input.splice(index, 1);
    setInput([...input]);
    alert("Deleted successfuly!");
  };

  const handleEdit = (index) => {
    setUpdateState(index);
  };

  useEffect(() => {
    p.setTableSample2(input);
  }, [input]);

  useEffect(() => {
    p.setYname(yourname);
  }, [yourname]);

  useEffect(() => {
    p.setDtoday(datetoday);
  }, [datetoday]);

  return (
    <>
      <div className="px-2 py-2">
        <h3 className="font-bold mb-3">Date of Site Inspections</h3>
        <div className="grid md:grid-cols-4 gap-2 text-xs md:text-sm">
          <div className="w-44 h-64 px-2">
            <label>Date</label>
            <input
              className="w-40 h-9"
              onChange={(e) => setDate(e.target.value)}
              type="date"
              id="date"
              value={date}
              required
            />
            <label>Time</label>
            <input
              className="w-40 h-9"
              onChange={(e) => setTime(e.target.value)}
              type="time"
              id="time"
              value={time}
              required
            />
            <label>Remarks</label>
            <textarea
              className="w-40 border"
              cols={6}
              rows={4}
              onChange={(e) => setRemarks(e.target.value)}
              id="remarks"
              value={remarks}
              required
            />
            <div>
              <DefButton
                text="Add New"
                onClick={handlerNew}
                className="my-2 w-full bg-[#8D4DD0] h-8"
              />
            </div>
          </div>

          <div className="shadow-sm md:w-[38rem] px-1 py-2 rounded-md">
            <div className="grid grid-cols-4 gap-4 md:gap-24 border py-2 rounded-sm px-1 ">
              <div className="font-medium text-black w-11 h-5">Date </div>
              <div className="font-medium text-black w-11 h-5">Time </div>
              <div className="font-medium text-black w-11 h-5">Remarks </div>
              <div className="font-medium text-black w-11 h-5">Action </div>
            </div>
            <div className="hover:bg-gray-500">
              {input.map((item, index) =>
                updateState === index ? (
                  <EditList
                    key={index}
                    item={item}
                    setUpdateState={setUpdateState}
                    onUpdate={(updatedData) => {
                      const updateInput = [...input];
                      updateInput[index] = updatedData;
                      setInput(updateInput);
                    }}
                  />
                ) : (
                  <>
                    <div key={item.id}>
                      <div className="grid grid-cols-4 gap-3 md:gap-24 border px-1 rounded-sm py-1">
                        <div className="flex w-40">
                          <span>{item.date}</span>
                        </div>
                        <div className="flex w-40">
                          <span>{item.time}</span>
                        </div>
                        <div className="flex w-40">
                          <span>{item.remarks}</span>
                        </div>
                        <div className="flex w-20 font-medium">
                          <button
                            className="text-[#8D4DD0] mx-1"
                            onClick={() => handleEdit(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                          <button
                            className="text-GitHub-Pallet100 mx-3"
                            onClick={() => handleDelete(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
            <div className="w-56 ">
              {show ? (
                <>
                  <div className="mt-1 px-1">
                    <button
                      className="text-[#8D4DD0] hover:underline text-xs"
                      onClick={handleShow}
                    >
                      Show<i className="font-medium no-underline"> SHE</i>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="shadow-md rounded-md mt-1 px-1">
                    <div className="flex justify-between items-center">
                      <div className="text-md font-medium mt-1">
                        SHE briefing provided by:
                      </div>
                      <div className="mt-1">
                        <button
                          className="text-[#8D4DD0] text-xs font-medium underline"
                          onClick={handleShow}
                        >
                          Hide
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-col-2 gap-2 mt-2 text-sm">
                      <input
                        onChange={(e) => setYourName(e.target.value)}
                        placeholder="enter name here..."
                        type="text"
                        id="name"
                        value={yourname}
                        className="w-40 h-8 bg-[#96BBD1]"
                        required
                      />
                      <input
                        onChange={(e) => setDateToDay(e.target.value)}
                        type="date"
                        id="date"
                        value={datetoday}
                        className="w-40 h-8"
                        required
                      />
                    </div>
                    <div className="text-xs mt-1 py-1 px-1">
                      <i>
                        *That I have been briefed on Safety - Work & Procedures;
                        that I have read and understood all the conditions
                        applying to the job.
                      </i>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
