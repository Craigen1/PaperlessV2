import "../App.css";
import Main from "../components/MainMenu";
import Login from "../components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Routes,
  Route,
  UNSAFE_NavigationContext as NavigationContext,
  useLocation,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PopBox } from "./PopBox";
import { PopScanner } from "./PopScanner";
import { PopPOList } from "./PopPOList";
import { PopLogout } from "./PopLogout";
import { ITopContext } from "../hooks/TopContext";
import Approval from "./Approval";
import QueryManager from "./QueryManager";
import { LoadingSpinner } from "../assets/SVGs";
import LicenseRequest from "./LicenseRequest";
import WhatsNew from "./WhatsNew";
import ButtonTabs from "./Tutorial/ButtonTabs";
import GoodsIssue from "./GoodsIssue";
import GoTop from "./Tutorial/GoTop";
import Portf from "./Portf/Portf";
import CssT from "./Tutorial/CssT";
import Html5Scanner from "./Html5Scanner";
import ColorPicker from "./Tutorial/ColorPicker";
import Help from "./Help";
import ReportMain from "./Reports/ReportMain";
import GoodsIssueTest from "./GoodsIssueTest";
import DM_API from "./API/DM_API";
import ProjectsMain from "./ProjectAPIview/Project/ProjectListMain.js";
import LoginWrapperMJ from "./RFPtoAP_MJ/LoginWrapperMJ.js";

export default function AppIndex() {
  const { navigator } = useContext(NavigationContext);
  const { setBlockedPop, CanNavigate, loading, msg, setmsg } =
    useContext(ITopContext);
  const constUnBlock = () => {
    setBlockedPop(true);
  };
  useEffect(() => {
    if (CanNavigate) return;
    const unblock = navigator.block(() => {
      constUnBlock();
    });

    return unblock;
  }, [CanNavigate]);
  return (
    <>
      <PopBox />
      <PopScanner />
      <PopPOList />
      {/* <PopLogout /> */}

      <Routes>
        <Route path="/" element={<Ilogin />} />
        <Route path="/home" element={<IMain />} />
        <Route path="/projects" element={<ProjectsMain />} />
        <Route path="/approval" element={<IApproval />} />
        <Route path="/LicenseRequest" element={<ILicenseRequest />} />
        <Route path="/DMF_API" element={<DM_API />} />
        <Route path="/QueryManager" element={<IQuery />} />
        <Route path="/RFPApproval" element={<IRFPApproval />} />
      </Routes>

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-trans50 ">
          <div className="mx-auto w-fit">
            <LoadingSpinner className="mx-auto" type="2" />
          </div>
        </div>
      )}
    </>
  );
}

function Ilogin() {
  return <Login />;
}

function IMain() {
  return <Main />;
}

function IProjects() {
  return <ProjectsMain />;
}

function IApproval() {
  return <Approval />;
}
function IQuery() {
  return <QueryManager />;
}

function ILicenseRequest() {
  return <LicenseRequest />;
}

function IRFPApproval() {
  return <LoginWrapperMJ />;
}

function IWhatsNew() {
  return <WhatsNew />;
}
function Portfi() {
  return <Portf />;
}

function Tutorial() {
  return <ColorPicker />;
}
function GoGoodsIssue() {
  return <GoodsIssue />;
}

function IReport() {
  return <ReportMain />;
}
function IGoodsIssueTest() {
  return <GoodsIssueTest />;
}
function ChangePass() {
  return (
    <>
      <div className="max-w-3xl mx-auto mt-4">
        <Help
          title={"How To Change Password"}
          link={
            "https://app.tango.us/app/embed/7436899d-3613-4118-855e-6220ed5247da"
          }
        />
      </div>
    </>
  );
}
