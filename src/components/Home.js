import React, { useContext, useEffect, useState } from "react";
import { ITopContext } from "../hooks/TopContext";
import { ArrayChecker } from "../functions/handler";

import {
  solutions,
  controlsList,
  toolList,
  loginWallpaper,
  inventoryModules,
  Label,
  Separator,
  DefaultButtonStyle,
  EXEC_SQL_InsertOne,
  handlResize,
  DefButton,
} from "./ComponentList";
import { Transition } from "@headlessui/react";
import {
  AdjustmentsIcon,
  ChatAlt2Icon,
  LoginIcon,
  MenuIcon,
  PencilIcon,
  UserIcon,
  UsersIcon,
  ViewGridIcon,
  XIcon,
} from "@heroicons/react/outline";
import IconViews from "./IconViews";
import MaterialUsage from "./MaterialUsage";
import InventoryTransfer from "./InventoryTransfer";
import UsageSlip from "./UsageSlip";
import Weighing from "./Weighing";
import Printer from "./printers/Printer";
import POlist from "./POlist";
import ScanToTransfer from "./Logistics/ScanToTransfer";
import FeedBack from "./FeedBack";
import UserSettings from "./UserSettings";
import UserMaster from "./UserMaster";
import UsageSlipMaster from "./UsageSlipMaster";
import RedditPost from "./Reddit/RedditPost";
import OpenAI from "./OpenAI";
import { DeviceTabletIcon, UploadIcon } from "@heroicons/react/outline";
import UsageSlipNTSS from "./Reddit/UsageSlipNTSS";
import RedditTemplate from "./Reddit/RedditTemplate";
import QueryManager from "./QueryManager";
import InventoryTransfer2 from "./InventoryTransfer2";
import MaterialUsage2 from "./MaterialUsage2";
import UsageSlipMaster2 from "./UsageSlipMaster2";
import Tools from "./tools/Tools";
import QueryMaker from "./QueryMaker";
import Msg from "./Msg";
import Charts from "./Charts";
import GetTickets from "./Zammad/GetTickets";
import SelfBillinDmp from "./SelfBilling/SelfBillinDmp";
import CostModel from "./AbcFiles/CostModel";
import MaterialUsagePM from "./MaterialUsagePM";
import SampleA from "./SampleA";
import SafetyMeasurementMain from "./MJP/SafetyMeasurementMain";
import JHAWorkSheetMain from "./MJP/JHAWorkSheetMain";
import FeedbackForm from "./MJP/FeedbackForm";
import HowTo from "./MJP/HowTo";
import GoodsReceiptEntry from "./GoodsReceiptEntry";
import ZimbraExtrator from "./ZimbraExtrator";
import DeliveryScheduleMain from "./DeliverySchedule/DeliveryScheduleMain";
import TaskManagerMain from "./TaskManager/TaskManagerMain";
import LicenseModule from "./LicenseModule";
import GoodsIssue from "./GoodsIssue";
import Html5Scanner from "./Html5Scanner";
import GoodsIssueMain from "./GoodsIssueMain";
import Menus from "./Menu/Menus";
import Usageslip2 from "./Usageslip2";
import ProcessMain from "./ProcessFlow/ProcessMain";
import IUserSettings from "./settings/IUserSettings";
import RP_PalletTag from "./Reports/RP_PalletTag";
import GoodsIssueTest from "./GoodsIssueTest";
import InventoryPushMain from "./InventoryPush/InventoryPushMain";
import PalletingMain from "./UniversalPalleting/PalletingMain";
import InventoryFifo from "./Queries/InventoryFifo";
import InventoryCount from "./OSH/IC/InventoryCount";
import PalletingOsh from "./UniversalPalleting/Palleting_OSH/PalletingOsh";
import DR_PalletTag from "./Reports/DR_PalletTag";
import { useMediaQuery } from "@uidotdev/usehooks";
import ProjectsMain from "./Projects/ProjectsMain";
import InventoryCountUsr from "./OSH/IC/USR/InventoryCountUsr";
import InventoryCountItemMsk from "./OSH/IC/ItemMask/InventoryCountItemMsk";
import StoreManager from "./OSH/IC/StoreManager/StoreManager";
import BegBalReport from "./OSH/IC/Report/BegBalReport";
import ComplianceReport from "./OSH/IC/Report/ComplianceReport";
import KnowledgeBase from "./KnowledgeBase/KnowledgeBase";
import ComplianceReportMain from "./OSH/IC/Report/ComplianceReportMain";
import InventoryReport from "./OSH/IC/Report/inventoryReportMain/InventoryReport";
import InventoryFifoAll from "./Queries/InventoryFifoAll";
import CodeTemp from "../CodeTemp/CodeTemp";
import Proration from "./Proration/Proration";
import DPRT from "./OSH/IC/Report/UlpWeekly/DPRT";
import Nav from "./Nav";
import TagDuplicate from "./TagDuplicate/TagDuplicate";
import DPUR from "./Proration/DPUR/DPUR";
import TPUR from "./Proration/TPUR/TPUR";
import SuplierMasterData from "./SuplierBrand/SuplierMasterData";
import BrandMasterData from "./SuplierBrand/BrandMasterData";
import InventoryReturn from "./InventoryReturn/InventoryReturn";
import JeReversal from "./JE_Reversal/JeReversal";
import ITR_ITReport from "./Reports/ITR_ITReport";
import DRImport from "./DR_Import/DRImport";
import { RFPHeaderMJ } from "./RFPtoAP_MJ/RFPHeaderMJ";
import { AutoPRMJ_Header } from "./AutoPRMJ/AutoPRMJ_Header";
export default function Home() {
  const [CodeCheck, setCodeCheck] = useState(false);
  const {
    userid,
    allowedModuleids,
    setAllowedModuleids,
    setModule,
    setModuleName,
    setCanNavigate,
    setPop,
    setpopTitle,
    setpopLabel,
    qrInfo,
    setQrInfo,
    userInfo,
    setuserid,
    isMobile,
    SelectedModule,
    setSelectedModule,
    allowdModuleHolder,
    setallowdModuleHolder,
    retract2,
    setretract2,
    setmsg,
  } = useContext(ITopContext);
  // console.log({ allowedModuleids });
  const [restricWiggle, setRestricWiggle] = useState(false);
  // const [SelectedModule, setSelectedModule] = useState(17);
  const [SelectedFolder, setSelectedFolder] = useState(0);
  const [SelectedModuleid, setSelectedModuleid] = useState(0);
  const [MoreOption, setMoreOption] = useState(false);
  const [HoldmyBeer, setHoldmyBeer] = useState([]);
  const [retract, setretract] = useState(true);
  const [retractSide, setretractSide] = useState(true);
  const [retractTools, setretractTools] = useState(false);
  const [retractProfile, setretractProfile] = useState(false);

  const [prodFolderCol, setProdFolderCol] = useState(true);
  const [LogFolderCol, setLogFolderCol] = useState(true);
  const [AdmFolderCol, setAdmFolderCol] = useState(true);
  const [TicketFolderCol, setTicketFolderCol] = useState(true);

  const [module, setmodule] = useState(0);
  const Modules = [
    {
      folder: "production",
      header: "Production",
    },
    {
      folder: "logistics",
      header: "Logistics",
    },
    {
      folder: "admin",
      header: "Administrator",
    },
    {
      folder: "sales",
      header: "Sales - A/R",
    },
    {
      folder: "accounting",
      header: "Cost Model",
    },
    {
      folder: "safety",
      header: "Safety Modules",
    },
  ];

  const HandlerResizeIfMoble = () => {
    // if (handlResize())
    setretract(false);
    setretractProfile(false);
    setretractTools(false);
  };

  useEffect(() => {
    if (!CodeCheck) return;
    setpopTitle("Scan Result");
    setpopLabel(qrInfo.data);
    setPop(true);
    setQrInfo({ type: "", data: "" });
  }, [qrInfo.data]);
  const getAllowed = async () => {
    await EXEC_SQL_InsertOne(47, setallowdModuleHolder, userInfo.ID);
  };

  const setAllowed = async () => {
    setAllowedModuleids([]);
    allowdModuleHolder.map((item, index) =>
      setAllowedModuleids((p) => [...p, item.module])
    );
  };

  useEffect(() => {
    getAllowed();
  }, []);

  useEffect(() => {
    setAllowed();
  }, [allowdModuleHolder]);

  const matches = useMediaQuery("(min-width:900px)");
  useEffect(() => {
    setretract2(matches);
  }, [matches]);

  return (
    <div className="max-h-[100vh]">
      <div className="    mx-auto  ">
        {/* {retract2 ? (
          <div
            className={
              !matches
                ? "frame   w-[265px] max-w-[100%] min-w-[100%] h-[100vh] overflow-x-hidden resize-x rounded-none"
                : "frame   w-[265px] max-w-[350px] min-w-[200px] h-[100vh] overflow-x-hidden resize-x rounded-none"
            }
          >
            {!matches && (
              <>
                <button
                  className="absolute z-50   "
                  onClick={() => {
                    !matches && setretract2(!retract2);
                  }}
                >
                  <div className="  rounded-md  hover:bg-trans20">
                    <XIcon className="text-black w-6 h-6" />
                  </div>
                </button>
                <br></br>
              </>
            )}
            <Menus
              setSelectedModuleid={setSelectedModuleid}
              setSelectedModule={setSelectedModule}
              setretract2={setretract2}
              matches={matches}
            />
          </div>
        ) : (
          ""
        )} */}
        <Nav
          setSelectedModuleid={setSelectedModuleid}
          setSelectedModule={setSelectedModule}
          setretract2={setretract2}
        />
        <div className="  ">
          {retract2 && !matches && <></>}

          <div className="overflow-hidden  px-2 mx-2" id="containerx">
            <div className="scaleUpCenter">
              {solutions.map((item, index) => (
                <>
                  {item.id == SelectedModule && item.id != 0 && (
                    <div className="flex justify-between">
                      <p className="text-4xl font-bold ml-2">{item.name}</p>
                      <div className="flex flex-col items-center justify-center">
                        <p
                          onClick={() => alert("This is under development!")}
                          className="flex items-center gap-1 text-md font-bold cursor-pointer text-[#5a5a5a] hover:text-[#60b32a] duration-200"
                        >
                          <svg
                            width="2em"
                            height="2em"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
                          </svg>
                          {userInfo.firstname + " " + userInfo.lastname}
                        </p>
                        <span
                          onClick={() => {
                            setCanNavigate(true);
                            setuserid(0);
                            setSelectedModule(44);
                            setAllowedModuleids([]);
                            setmsg({
                              type: "",
                              text: ``,
                            });
                          }}
                          className="text-[#f13c3c] cursor-pointer text-md text-center border rounded-md font-medium px-3 py-1"
                        >
                          Logout
                        </span>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
            <br />
            {SelectedModule === 2 ? <InventoryTransfer2 show={true} /> : <></>}
            {SelectedModule === 3 ? <Usageslip2 /> : <></>}
            {SelectedModule === 4 ? <Weighing /> : <></>}
            {SelectedModule === 5 ? <Printer /> : <></>}
            {SelectedModule === 6 ? <POlist /> : <></>}
            {SelectedModule === 7 ? <MaterialUsage2 /> : <></>}
            {SelectedModule === 8 ? <ScanToTransfer /> : <></>}
            {SelectedModule === 101 ? <FeedBack /> : <></>}
            {SelectedModule === 102 ? <UserSettings id={userid} /> : <></>}
            {SelectedModule === 103 ? <UserMaster /> : <></>}
            {SelectedModule === 201 ? <UsageSlipMaster /> : <></>}
            {SelectedModule === 104 ? <UsageSlipMaster2 /> : <></>}
            {SelectedModule === 9 ? <RedditPost /> : <></>}
            {SelectedModule === 13 ? <RedditTemplate /> : <></>}
            {SelectedModule === 10 ? <OpenAI /> : <></>}
            {SelectedModule === 11 ? <UserMaster /> : <></>}
            {SelectedModule === 12 ? <UsageSlipNTSS /> : <></>}
            {SelectedModule === 14 ? <QueryManager /> : <></>}
            {SelectedModule === 15 ? <QueryMaker /> : <></>}
            {SelectedModule === 16 ? <Msg /> : <></>}
            {SelectedModule === 17 ? <Charts /> : <></>}
            {SelectedModule === 18 ? <ZimbraExtrator /> : <></>}
            {SelectedModule === 19 ? <SelfBillinDmp /> : <></>}
            {SelectedModule === 21 ? <MaterialUsagePM /> : <></>}
            {SelectedModule === 22 ? <SafetyMeasurementMain /> : <></>}
            {SelectedModule === 23 ? <JHAWorkSheetMain /> : <></>}
            {SelectedModule === 26 ? <FeedbackForm /> : <></>}
            {SelectedModule === 24 ? <GoodsReceiptEntry /> : <></>}
            {SelectedModule === 25 ? <DeliveryScheduleMain /> : <></>}
            {SelectedModule === 27 ? <TaskManagerMain /> : <></>}
            {SelectedModule === 28 ? <LicenseModule /> : <></>}
            {SelectedModule === 29 ? <GoodsIssueMain /> : <></>}
            {SelectedModule === 30 ? <HowTo /> : <></>}
            {SelectedModule === 31 ? <KnowledgeBase /> : <></>}
            {SelectedModule === 32 ? <IUserSettings /> : <></>}
            {SelectedModule === 33 ? <RP_PalletTag /> : <></>}
            {SelectedModule === 34 ? <GoodsIssueTest /> : <></>}
            {SelectedModule === 36 ? <InventoryCount /> : <></>}
            {SelectedModule === 37 ? <InventoryPushMain /> : <></>}
            {SelectedModule === 38 ? <PalletingMain /> : <></>}
            {SelectedModule === 40 ? <InventoryFifo /> : <></>}
            {SelectedModule === 41 ? <PalletingOsh /> : <></>}
            {SelectedModule === 42 ? <DR_PalletTag /> : <></>}
            {SelectedModule === 43 ? <InventoryCountUsr /> : <></>}
            {SelectedModule === 42 ? <DR_PalletTag /> : <></>}
            {SelectedModule === 44 ? <ProjectsMain /> : <></>}
            {SelectedModule === 45 ? <InventoryCountItemMsk /> : <></>}
            {SelectedModule === 46 ? <StoreManager /> : <></>}
            {SelectedModule === 47 ? <BegBalReport /> : <></>}
            {SelectedModule === 48 ? <ComplianceReportMain /> : <></>}
            {SelectedModule === 49 ? <InventoryReport /> : <></>}
            {SelectedModule === 50 ? <InventoryFifoAll /> : <></>}
            {SelectedModule === 51 ? <Proration /> : <></>}
            {SelectedModule === 52 ? <DPRT /> : <></>}
            {SelectedModule === 53 ? <TagDuplicate /> : <></>}
            {SelectedModule === 55 ? <DPUR /> : <></>}
            {SelectedModule === 56 ? <TPUR /> : <></>}
            {SelectedModule === 57 ? <SuplierMasterData /> : <></>}
            {SelectedModule === 58 ? <BrandMasterData /> : <></>}
            {SelectedModule === 59 ? <InventoryReturn /> : <></>}
            {SelectedModule === 60 ? <JeReversal /> : <></>}
            {SelectedModule === 61 ? <ITR_ITReport /> : <></>}
            {SelectedModule === 62 ? <DRImport /> : <></>}
            {SelectedModule === 63 ? <RFPHeaderMJ /> : <></>}
            {SelectedModule === 64 ? <AutoPRMJ_Header /> : <></>}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div className="flex mx-auto max-w-[85rem] w-fit">
//       <div className="frame w-[300px]  h-[95vh]  mt-2">
//         <Menus
//           setSelectedModuleid={setSelectedModuleid}
//           setSelectedModule={setSelectedModule}
//           setretract2={setretract2}
//         />
//       </div>
//       <div className="">
//         <div className="  w-full " id="gotoxx">
//           {/* <IconViews /> */}
//           <div className=" max-w-6xl  ">
//             <>
//               <div
//                 className={
//                   retract2
//                     ? "absolute max-w-6xl w-full h-full bg-trans- mt-10 z-20 "
//                     : "absolute max-w-6xl w-full h-full bg-trans- mt-10 z-20 invisible"
//                 }
//               >
//                 <div className="frame w-fit  mt-2">
//                   <Menus
//                     setSelectedModuleid={setSelectedModuleid}
//                     setSelectedModule={setSelectedModule}
//                     setretract2={setretract2}
//                   />
//                 </div>
//               </div>
//             </>
//             <div className="bg-WhiteMode-Background000  w-full z-30 max-w-6xl ">
//               <div className="h-2"></div>
//               <div className=" frame   ">
//                 <button
//                   className="absolute z-50"
//                   onClick={() => {
//                     setretract2(!retract2);
//                   }}
//                 >
//                   <div className="  rounded-md  hover:bg-trans20">
//                     {!retract2 ? (
//                       <ViewGridIcon className="text-black w-6 h-6" />
//                     ) : (
//                       <XIcon className="text-black w-6 h-6" />
//                     )}
//                   </div>
//                 </button>
//                 <Label
//                   module={SelectedModule}
//                   className=" text-WhiteMode-ButtonBackground000 float-right w-full  "
//                 />
//               </div>
//               <div className="h-1"></div>
//             </div>
//             {SelectedModule === 2 ? <InventoryTransfer2 show={true} /> : <></>}
//             {SelectedModule === 3 ? <Usageslip2 /> : <></>}
//             {SelectedModule === 4 ? <Weighing /> : <></>}
//             {SelectedModule === 5 ? <Printer /> : <></>}
//             {SelectedModule === 6 ? <POlist /> : <></>}
//             {SelectedModule === 7 ? <MaterialUsage2 /> : <></>}
//             {SelectedModule === 8 ? <ScanToTransfer /> : <></>}
//             {SelectedModule === 101 ? <FeedBack /> : <></>}
//             {SelectedModule === 102 ? <UserSettings id={userid} /> : <></>}
//             {SelectedModule === 103 ? <UserMaster /> : <></>}
//             {SelectedModule === 201 ? <UsageSlipMaster /> : <></>}
//             {SelectedModule === 104 ? <UsageSlipMaster2 /> : <></>}
//             {SelectedModule === 9 ? <RedditPost /> : <></>}
//             {SelectedModule === 13 ? <RedditTemplate /> : <></>}
//             {SelectedModule === 10 ? <OpenAI /> : <></>}
//             {SelectedModule === 11 ? <UserMaster /> : <></>}
//             {SelectedModule === 12 ? <UsageSlipNTSS /> : <></>}
//             {SelectedModule === 14 ? <QueryManager /> : <></>}
//             {SelectedModule === 15 ? <QueryMaker /> : <></>}
//             {SelectedModule === 16 ? <Msg /> : <></>}
//             {SelectedModule === 17 ? <Charts /> : <></>}
//             {SelectedModule === 18 ? <ZimbraExtrator /> : <></>}
//             {SelectedModule === 19 ? <SelfBillinDmp /> : <></>}
//             {/* {SelectedModule === 20 ? <Menus /> : <></>} */}
//             {/* {SelectedModule === 21 ? <SampleA /> : <></>} */}
//             {SelectedModule === 21 ? <MaterialUsagePM /> : <></>}
//             {SelectedModule === 22 ? <SafetyMeasurementMain /> : <></>}
//             {SelectedModule === 23 ? <JHAWorkSheetMain /> : <></>}
//             {SelectedModule === 26 ? <FeedbackForm /> : <></>}
//             {SelectedModule === 24 ? <GoodsReceiptEntry /> : <></>}
//             {SelectedModule === 25 ? <DeliveryScheduleMain /> : <></>}
//             {SelectedModule === 27 ? <TaskManagerMain /> : <></>}
//             {SelectedModule === 28 ? <LicenseModule /> : <></>}
//             {SelectedModule === 29 ? <GoodsIssueMain /> : <></>}
//             {SelectedModule === 30 ? <HowTo /> : <></>}
//             {SelectedModule === 31 ? <ProcessMain /> : <></>}
//             {SelectedModule === 32 ? <IUserSettings /> : <></>}
//             {SelectedModule === 33 ? <RP_PalletTag /> : <></>}
//             {SelectedModule === 34 ? <GoodsIssueTest /> : <></>}
//             {SelectedModule === 36 ? <InventoryCount /> : <></>}
//             {SelectedModule === 37 ? <InventoryPushMain /> : <></>}
//             {SelectedModule === 38 ? <PalletingMain /> : <></>}
//             {SelectedModule === 40 ? <InventoryFifo /> : <></>}
//             {SelectedModule === 41 ? <PalletingOsh /> : <></>}
//             {SelectedModule === 42 ? <DR_PalletTag /> : <></>}

//             {/* add mo dito duplicate mo yung nasa taas */}
//             {/* <IconViews /> */}
//             {/* {SelectedModule != 16 ? <div className="h-screen"></div> : ""} */}
//             {/* <div className="h-full  w-fit absolute  bg-red-500  ml-auto flex flex-col">
//               <div className="w-10 h-10 bg-black mt-auto ml-auto mb-3 mr-5">
//                 s
//               </div>
//             </div> */}
//           </div>
//         </div>
//         {/* <div className=" fixed bottom-0 flex">
//           <div className="w-96 ml-16"></div>
//         </div>
//         <div></div> */}
//       </div>
//     </div>
