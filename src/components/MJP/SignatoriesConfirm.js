import React from "react";
import { DefInput } from "../ComponentList";

export default function SignatoriesConfirm({ setSignatories }) {
  const DataHandler = (e) => {
    const { id, value } = e.target;
    setSignatories((p) => ({ ...p, [id]: value }));
  };

  return (
    <>
      <div className="mt-2">
        <div className="flex flex-col">
          <div>
            <div className="py-1">
              <label>Conformed requirements:</label>{" "}
              <label>Contractor Representative</label>
              <input className="h-8" onChange={DataHandler} />
            </div>
            <div className="py-1">
              <label>Discussed and reviewed by:</label>{" "}
              <label>Plant Safety Officer</label>
              <input className="h-8" onChange={DataHandler} />
            </div>
            <div className="py-1">
              <label>Approved to start work:</label>{" "}
              <label>Responsible Engineer</label>
              <input className="h-8" onChange={DataHandler} />
            </div>
            <div className="py-1">
              <label>Authorized and commended by:</label>{" "}
              <label>Plant Manager</label>
              <input className="h-8" onChange={DataHandler} />
            </div>
          </div>
        </div>
        <div className="flex items-center font-medium justify-center px-2 pt-2 text-xs">
          <i>
            Signatories confirm having read, understood and accepted their
            responsibilities as defined by work permit system.
          </i>
        </div>
      </div>
    </>
  );
}
