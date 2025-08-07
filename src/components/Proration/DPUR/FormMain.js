import React, { useState } from "react";
import FormSelectorCrt from "./FormSelectorCrt";
import FormQ from "./FormQ";

export default function FormMain() {
  const [formSelector, setformSelector] = useState(0);
  return (
    <>
      <div>
        <button className="border btn btn-primary btn-sm px-2">
          + Blank Form
        </button>
        {formSelector === 0 && (
          <FormSelectorCrt setformSelector={setformSelector} />
        )}
      </div>
      <div>
        {formSelector != 0 && (
          <FormQ
            formSelector={formSelector}
            setformSelector={setformSelector}
          />
        )}
      </div>
    </>
  );
}
