import React from "react";

export default function FormSelectorCrt(p) {
  const onclickHandler = (e) => {
    p.setformSelector(e.target.id);
  };
  return (
    <div>
      <button
        className="border btn btn-primary btn-sm px-2"
        onClick={onclickHandler}
        id={1}
      >
        Google Form
      </button>
      <button
        className="border btn btn-primary btn-sm px-2"
        onClick={onclickHandler}
        id={2}
      >
        FireFox Form
      </button>
    </div>
  );
}
