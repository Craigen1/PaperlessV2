import React from "react";
import { useState } from "react";
import { DefInput } from "../ComponentList";

export default function JobAuthorization({ setJobAuthorization }) {
  const [show, setShow] = useState(true);

  const ChangeHandler = (e) => {
    const { value, id } = e.target;
    setJobAuthorization((p) => ({ ...p, [id]: value }));
  };

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="px-2 py-2">
        <h3 className="font-bold mb-3">Job Authorization</h3>
        <div className="text-sm">
          1. A work permit is required for all work done in applications
          mentioned in the front herof and shall include other works that can
          critical services such as fire alarms systems, water service, power
          supply & other company property damages. <br />
          2. This work permit is valid only for 1 month, though will depend on
          agreed timeline. <br />
          3.Working hours will be
          <div>
            <div className="my-2">
              <label className="font-medium px-3">From:</label>
              <input
                className="h-9 max-w-[8rem]"
                type="time"
                onChange={ChangeHandler}
              />
            </div>
            <div className="my-2">
              <label className="font-medium px-[25px]">To:</label>
              <input
                className="h-9 max-w-[8rem]"
                type="time"
                onChange={ChangeHandler}
              />
            </div>
          </div>
          {show ? (
            <>
              <p className="mt-2">
                4. Work will be stopped anytime due to non-compliance to the
                requirements. <br />
                5. Three copies of the work permit are to be prepared: Original
                copy: retained by the party / personnel who will do the job and
                must be displayed on site at all times during the duration of
                the work for ready reference and strict compliance. duplicate
                copy: copy of the area manager / engineer / project engineer who
                contracted the job. triplicate copy: for safety division
                documents control. <br />
                6. After completion of work, the original copy will be
                signed-off by the party who did the job, the responsible
                engineer and area manager, this and a contractors rating sheet
                is attached to the invoice for approval by the safety
                engineering department head. <br />
                7. If any changes in the current work process / procedure shall
                arise (while in the performance of this job), this work permit
                will be reviewed and fully evaluated to conform to these
                changes. a new work permit shall be issued if required.
              </p>
              <button
                className="text-[#8D4DD0] underline"
                onClick={handleClick}
              >
                See less
              </button>
            </>
          ) : (
            <>
              <button
                className="text-[#8D4DD0] underline mt-2"
                onClick={handleClick}
              >
                Show more
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
