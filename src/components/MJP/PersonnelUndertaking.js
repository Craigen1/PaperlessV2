import React from "react";
import { useState, useEffect } from "react";
import { DefButton } from "../ComponentList";

export function EditList({ item, setUpdateState, onUpdate }) {
  const [name, setName] = useState(item.name);
  const [email, setEmail] = useState(item.email);

  const handleUpdate = () => {
    onUpdate({ name, email });
    setUpdateState(false);
  };

  const handleCancel = () => {
    setUpdateState(false);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2 border">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-28 md:w-36 border-[#8D4DD0] border-[1.5px]"
          type="text"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-28 md:w-36 border-[#8D4DD0] border-[1.5px]"
          type="text"
        />
        <div></div>
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

export default function PersonnelUndertaking(p) {
  const [show, setShow] = useState(true);
  const [InputName, setInputName] = useState("");
  const [InputEmail, setInputEmail] = useState("");
  const [input, setInput] = useState([]);
  const [updateState, setUpdateState] = useState(false);

  const handlerNew = () => {
    if (
      InputName.length == 0 ||
      InputEmail.length == 0 ||
      InputName == undefined ||
      InputEmail == undefined
    )
      return;
    setInput((e) => [...e, { email: InputEmail, name: InputName }]);
  };

  const handleClick = () => {
    setShow(!show);
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
    p.setTableSample(input);
  }, [input]);

  return (
    <>
      <main>
        <div>
          <p className="text-sm px-2 py-2">
            {!show ? (
              <>
                <p>
                  1. All contractor’s personnel, management and workers should
                  attend the SHE Seminar and other General Orientation. <br />
                  2. Report to the Area Manager or Supervisor before start and
                  at the end of the work. <br />
                  3. Cordon the area or site of work / provide warning signs /
                  lines.
                </p>
                <button
                  className="text-[#8D4DD0] underline"
                  onClick={handleClick}
                >
                  See all
                </button>
              </>
            ) : (
              <>
                <p>
                  1. All contractor’s personnel, management and workers should
                  attend the SHE Seminar and other General Orientation. <br />
                  2. Report to the Area Manager or Supervisor before start and
                  at the end of the work. <br />
                  3. Cordon the area or site of work / provide warning signs /
                  lines.
                  <br />
                  4. Display both the responsible Engineer’s and Contractor’s
                  Supervisors names on the site of the work. <br />
                  5. Provide a First Aid Kit. <br />
                  6. Make available a stand-by personnel trained to respond to
                  emergency incidents. <br />
                  7. Do not bore holes thru or any part of the building which
                  will affect the stability of the structure unless approved.
                  <br />
                  8. Do not remove vital members of building frame unless
                  approved by the Maintenance Department Head. <br />
                  9. Return removed guard of shafts, belts and pulleys, chains,
                  sprockets and gears. <br />
                  10. Provide adequate lighting for work and for work performed.
                  <br />
                  11. Do not block access to pull junction boxes and emergency
                  devices. <br />
                  12. Do not use electrical / instrument conduits as means of
                  support for as an extension for grounding. <br />
                  13. Dispose waste according to MSDS and company environmental
                  regulations (Daily). <br />
                  14. Secure standard safe scaffolding erection with the support
                  and bases. Never stepped on a scaffold platform without
                  railings. <br />
                  15. Extension cords and power strips are for TEMPORARY use
                  only. <br />
                  16. Personnel who have not undergone Materials Training will
                  not be allowed to handle chemicals.
                </p>
                <button
                  className="text-[#8D4DD0] underline"
                  onClick={handleClick}
                >
                  See less
                </button>
              </>
            )}
          </p>
        </div>

        <div className="px-2 py-2 h-72">
          <h3 className="font-bold mb-3">Personnel Undertaking the Job</h3>
          <div className="grid md:grid-cols-4 text-xs md:text-sm">
            <div className="w-44 h-48 px-2 py-1">
              <div className="my-1">
                <label>
                  Your Name <i className="text-xs">(required)</i>
                </label>
                <input
                  className="w-40 h-9"
                  onChange={(e) => setInputName(e.target.value)}
                  id="name"
                  value={InputName}
                  required
                />
              </div>
              <div className="my-1">
                <label>
                  Email <i className="text-xs">(required)</i>
                </label>
                <input
                  className="w-40 h-9"
                  onChange={(e) => setInputEmail(e.target.value)}
                  id="email"
                  value={InputEmail}
                  type={"email"}
                  required
                />
              </div>
              <div className="my-1">
                <label>Status</label>
                <input className="w-40 h-9" defaultValue="...." />
              </div>
              <div>
                <DefButton
                  text="Add workers"
                  onClick={handlerNew}
                  className="my-2 w-full h-8 bg-[#8D4DD0] "
                />
              </div>
            </div>

            <div className="shadow-sm md:w-[38rem] px-1 py-2 rounded-md">
              <div className="grid grid-cols-4 gap-4 md:gap-24 border py-2 rounded-sm px-1">
                <div className="font-medium text-black w-11 h-5">Name</div>
                <div className="font-medium text-black w-11 h-5">Email</div>
                <div className="font-medium text-black w-11 h-5">Status</div>
                <div className="font-medium text-black w-11 h-5">Action</div>
              </div>
              <div>
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
                      <div className="hover:bg-gray-500">
                        <div className="grid grid-cols-4 gap-3 text-xs md:text-sm md:gap-24 border px-1 rounded-sm py-1">
                          <div className="flex w-40">
                            <span>{item.name}</span>
                          </div>
                          <div className="flex w-40">
                            <span>{item.email}</span>
                          </div>
                          <div className="flex w-40">
                            <>....</>
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
