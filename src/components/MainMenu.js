import React, { useContext, useEffect, useState } from "react";
import Home from "./Home";
import Header from "./Header";
import { ITopContext } from "../hooks/TopContext";
import InventoryTransfer from "./InventoryTransfer";
import Printer from "./printers/Printer";
import UsageSlip from "./UsageSlip";
import POlist from "./POlist";
import { PopLoad } from "./PopLoad";
import Weighing from "./Weighing";
import { delay } from "./ComponentList";
import { useNavigate } from "react-router-dom";
import FeedBack from "./FeedBack";
import UserSettings from "./UserSettings";
import UserMaster from "./UserMaster";
import UsageSlipMaster from "./UsageSlipMaster";
import MaterialUsage from "./MaterialUsage";
import ScanToTransfer from "./Logistics/ScanToTransfer";
import RedditPost from "./Reddit/RedditPost";
import RedditProduce from "./Reddit/RedditProduce";
import MaterialUsage2 from "./MaterialUsage2";
import UsageSlipMaster2 from "./UsageSlipMaster2";
import { LoadingSpinner } from "../assets/SVGs";

export default function MainMenu() {
  const {
    userid,
    setModule,
    module,
    PopLoadBol,
    ResetModule,
    setResetModule,
    blocked,
    setblocked,
    toastMsg,
    toastVisible,
    settoastVisible,
    ProduceRedditPost,
  } = useContext(ITopContext);
  const [isMobile, setIsMobile] = useState(true);

  let history = useNavigate();
  function handleLoginPush() {
    history("/");
    console.log("pushed");
  }

  const iResetModule = async () => {
    const iCurModule = module;
    setModule(1);
    await delay(150);
    setModule(iCurModule);

    console.log("setted", iCurModule);
  };

  useEffect(() => {
    // resets module blocked done transaction
    if (ResetModule) {
      iResetModule();
      setResetModule(false);
    }
  }, [ResetModule]);
  useEffect(() => {
    if (userid === 0) {
      handleLoginPush();
    }
    return;
  }, [userid]);

  useEffect(() => {
    if (!blocked) {
      //logout
      return;
    }
    const unblock = navigator.block(() => {
      // alert("retry");
      setblocked(false);
    });

    return unblock;
  }, [blocked]);
  useEffect(() => {
    const setInvisible = async () => {
      await delay(2500);
      settoastVisible(false);
    };
    setInvisible();
  }, [toastVisible]);

  const [logs, setlogs] = useState([
    {
      marginLeft: "0px",
      marginTop: "0px",
      zIndex: "10",
      bgColor: "#E4DCCF",
    },
    {
      marginLeft: "-50px",
      marginTop: "25px",
      zIndex: "10",
      bgColor: "#E4DCCF",
    },
    {
      marginLeft: "-50px",
      marginTop: "50px",
      zIndex: "10",
      bgColor: "#E4DCCF",
    },
    {
      marginLeft: "-50px",
      marginTop: "25px",
      zIndex: "9",
      bgColor: "#E4DCCF",
    },
    {
      marginLeft: "-50px",
      marginTop: "0px",
      zIndex: "8",
      bgColor: "#E4DCCF",
    },
    {
      marginLeft: "-150px",
      marginTop: "-25px",
      zIndex: "7",
      bgColor: "#E4DCCF",
    },
    {
      marginLeft: "-150px",
      marginTop: "-50px",
      zIndex: "6",
      bgColor: "#E4DCCF",
    },
    {
      marginLeft: "-150px",
      marginTop: "-25px",
      zIndex: "7",
      bgColor: "#E4DCCF",
    },
  ]);
  return (
    <div className=" m-0 font-sans">
      <>
        {/* {console.log(userid)} */}
        {PopLoadBol ? <PopLoad /> : <></>}
        {userid === 0 ? (
          <>{/* <Login /> */}</>
        ) : (
          <>
            {ProduceRedditPost ? (
              <RedditProduce />
            ) : (
              <>
                <div className="">
                  {/* <div className="max-w-md  min-w-md  mx-auto"> */}
                  <div className="w-full z-50 ">{/* <Header /> */}</div>
                  {module === 1 ? <Home /> : <></>}
                  {module === 2 ? <InventoryTransfer show={true} /> : <></>}
                  {module === 3 ? <UsageSlip /> : <></>}
                  {module === 4 ? <Weighing /> : <></>}
                  {module === 5 ? <Printer /> : <></>}
                  {module === 6 ? <POlist /> : <></>}
                  {module === 7 ? <MaterialUsage2 /> : <></>}
                  {module === 8 ? <ScanToTransfer /> : <></>}

                  {module === 101 ? <FeedBack /> : <></>}
                  {module === 102 ? <UserSettings id={userid} /> : <></>}
                  {module === 103 ? <UserMaster /> : <></>}
                  {module === 104 ? <UsageSlipMaster2 /> : <></>}

                  {/* {module === 3 ? <Weighting /> : <></>} */}
                  {/* </div> */}
                  {module === 9 ? <RedditPost /> : <></>}
                </div>
              </>
            )}
          </>
        )}
      </>

      {toastVisible ? (
        <div className="fixed top-20 w-10/12 justify-center flex">
          <div className="text-white font-mono  px-2 py-1 rounded-md bg-mainButton border">
            📝 {toastMsg}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* <button
        className="bg-gray-900 px-1 rounded-md"
        onClick={() => {
          settoastVisible(true);
        }}
      >
        showToast
      </button> */}
    </div>
  );
}
