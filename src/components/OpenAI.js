import React, { useEffect, useState } from "react";
import {
  createNoSubstitutionTemplateLiteral,
  unchangedTextChangeRange,
} from "typescript";
import { LoadingSpinner } from "../assets/SVGs";
import { ConfirmButton, setixDate, smalBtn } from "./ComponentList";

export default function OpenAI() {
  // console.log(process.env.OPENAI_API_KEY);
  const [inputx, setInputx] = useState("");
  const [convd, setconvd] = useState(
    "I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with 'Unknown'"
  );

  const { Configuration, OpenAIApi } = require("openai");

  const [openAImsg, setOpenAImsg] = useState([]);

  const DEFAULT_PARAMS = {
    model: "text-davinci-002",
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  const [loadingx, setLoadingx] = useState(true);

  async function query(
    params = {
      // prompt: `${convd}${"\n\nQ:" + inputx + "\nA:"}`,
      prompt: inputx,
    }
  ) {
    setLoadingx(false);
    try {
      const params_ = { ...DEFAULT_PARAMS, ...params };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            String("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"),
        },
        body: JSON.stringify(params_),
      };
      console.log("https://api.openai.com/v1/completions", requestOptions);
      const response = await fetch(
        "https://api.openai.com/v1/completions",
        requestOptions
      );
      const data = await response.json();
      console.log({ params });
      console.log(data.choices[0].text);

      setOpenAImsg((e) => [...e, { msg: data.choices[0].text, type: "AI" }]);
      setconvd(convd + data.choices[0].text);
      // return data.choices[0].text;
      OnInput();
      goToDown();
    } catch (error) {}
    setLoadingx(true);
  }

  const tx = document.getElementsByTagName("textarea");
  const textareaviewDiv = document.getElementById("textareaview");
  const resizetextarea = () => {
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        "style",
        "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
      );
      tx[i].addEventListener("input", OnInput, false);
    }
  };

  const handleOnclick = async () => {
    setOpenAImsg((p) => [...p, { msg: inputx, type: "Human" }]);
    console.log("\n\nQ:" + inputx + "\nA:");
    setconvd(`${convd}${"\n\nQ:" + inputx + "\nA:"}`);

    await query();
    OnInput();
  };
  function OnInput() {
    try {
      this.style.height = 0;
      this.style.height = this.scrollHeight + "px";
    } catch (error) {}
  }
  function goToDown() {
    textareaviewDiv.scrollTo(0, 9999);
  }

  useEffect(() => {
    try {
      goToDown();
      resizetextarea();
      goToDown();
    } catch (error) {}
    // OnInput();
  }, [openAImsg]);

  return (
    <div>
      <div
        className="w-full   overflow-auto"
        style={{
          height: "80vh",
        }}
        id="textareaview"
      >
        {openAImsg.map((item, index) => (
          <>
            <div className="flex">
              {item.type == "AI" ? (
                <div className="w-2 bg-github_BorderColorActive  rounded-full"></div>
              ) : (
                ""
              )}

              <textarea
                defaultValue={item.msg}
                onChange={resizetextarea()}
                className={
                  item.type == "AI"
                    ? "  text-white w-full h-fit bg-github_FormBackGround py-1 px-4 resize-none"
                    : " text-right text-white w-full h-fit bg-transparent py-1 px-4 resize-none"
                }
              />
              {item.type != "AI" ? (
                <div className="w-2 bg-white  rounded-full"></div>
              ) : (
                ""
              )}
            </div>
          </>
        ))}
      </div>
      <div className="flex">
        <input
          id="input"
          value={inputx}
          name="input"
          autoComplete="input"
          onChange={(e) => {
            setInputx(e.target.value);
            // OnInput();
            goToDown();
          }}
          className="block w-full appearance-none rounded-md     px-3.5 py-1 text-mainText focus:border-0"
        ></input>

        <button
          type="button"
          className={smalBtn}
          disabled={!loadingx}
          onClick={() => handleOnclick()}
        >
          {loadingx ? (
            <span>Ask</span>
          ) : (
            <>
              <span>
                <LoadingSpinner />
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
