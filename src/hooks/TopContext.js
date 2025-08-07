import React, { createContext, useState } from "react";
const ITopContext = createContext();
const ITopProvider = (props) => {
  const [userid, setuserid] = useState(0);
  const [userInfo, setUserInfo] = useState({
    ID: 0,
    firstname: "",
    midname: "",
    lastname: "",
    username: "",
    password: "",
    Department: "",
    position: "",
    Mobilenumber: 0,
  });
  const [isMobile, setisMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pop, setPop] = useState(false);
  const [PopReset, setPopReset] = useState(false);
  const [popTitle, setpopTitle] = useState(false);
  const [popLabel, setpopLabel] = useState(false);
  const [allowedModuleids, setAllowedModuleids] = useState([]);
  const [module, setModule] = useState(3);
  const [moduleName, setModuleName] = useState("👋 Hi there! ");
  const [toastMsg, settoastMsg] = useState("👋 Hi there! ");
  const [toastVisible, settoastVisible] = useState(false);
  const [ScannerLoadingState, setScannerLoadingState] = useState(false);
  const [PopScannerModal, setPopScannerModal] = useState(false);
  const [PopPOListModal, setPopPOListModal] = useState(false);
  const [PopLoadBol, setPopLoadBol] = useState(false);
  const [SelectedPOnumInfo, setSelectedPOnumInfo] = useState({
    DocNum: "",
    ItemCode: "",
    ItemName: "",
  });
  const [qrInfo, setQrInfo] = useState({ type: "", data: "" });
  const [ResetModule, setResetModule] = useState(false);
  const [PopLogout, setPopLogout] = useState(true);
  const [BlockedPop, setBlockedPop] = useState(false);
  const [CanNavigate, setCanNavigate] = useState(true);
  const [GoBackToPreviousPage, setGoBackToPreviousPage] = useState(true);
  const [WeighingPrinterObject, setWeighingPrinterObject] = useState([{}]);
  const [PageNpagination, setPageNpagination] = useState({
    Page: 1,
    PageMaxPage: 50,
    PageRowCount: 5,
  });
  const [SearchParam, setSearchParam] = useState({
    SQLID: 34,
    SQLVAL: "",
  });

  const [PageCount, setPageCount] = useState({});
  const [SelectedPage, setSelectedPage] = useState(1);

  const [RedditSelectedArtleURL, setRedditSelectedArtleURL] = useState("");
  const [RedditisManual, setRedditisManual] = useState(false);
  const [RawArticleData, setRawArticleData] = useState();
  const [ArticleData, setArticleData] = useState();
  const [SelectedArticleDataTitle, setSelectedArticleDataTitle] = useState([]);
  const [SelectedArticleDataBody, setSelectedArticleDataBody] = useState([]);
  const [ProduceRedditPost, setProduceRedditPost] = useState(false);
  const [loading, setloading] = useState(false);

  let current = new Date();
  // const datei = `${current.getMonth()}-${
  //   current.getDate() + 1
  // }-${current.getFullYear()}`;
  current = current.toLocaleDateString("en-CA");
  const [DateNow, setDateNow] = useState(current);
  const [SelfBillingIDForPint, setSelfBillingIDForPint] = useState(0);
  const [RowsForPrintContx, setRowsForPrintContx] = useState([]);
  const [RowsForPrintContx2, setRowsForPrintContx2] = useState([]);
  const [SelectedModule, setSelectedModule] = useState(44);
  const [allowdModuleHolder, setallowdModuleHolder] = useState([]);
  const [RP_palletingInfo, setRP_palletingInfo] = useState([]);
  const [msg, setmsg] = useState({
    type: "",
    text: "",
  });

  const [retract2, setretract2] = useState(true);
  const [TaskTab, setTaskTab] = useState(0);
  const [PalletMarkerGRprintRow, setPalletMarkerGRprintRow] = useState([]);
  return (
    <ITopContext.Provider
      value={{
        PalletMarkerGRprintRow,
        setPalletMarkerGRprintRow,
        TaskTab,
        setTaskTab,
        RP_palletingInfo,
        setRP_palletingInfo,
        retract2,
        setretract2,
        msg,
        setmsg,
        allowdModuleHolder,
        setallowdModuleHolder,
        SelectedModule,
        setSelectedModule,
        RowsForPrintContx2,
        setRowsForPrintContx2,
        RowsForPrintContx,
        setRowsForPrintContx,
        SelfBillingIDForPint,
        setSelfBillingIDForPint,
        DateNow,
        setDateNow,
        loading,
        setloading,
        isMobile,
        setisMobile,
        RedditisManual,
        setRedditisManual,
        ProduceRedditPost,
        setProduceRedditPost,
        SelectedArticleDataBody,
        setSelectedArticleDataBody,
        SelectedArticleDataTitle,
        setSelectedArticleDataTitle,
        ArticleData,
        setArticleData,
        RawArticleData,
        setRawArticleData,
        RedditSelectedArtleURL,
        setRedditSelectedArtleURL,
        SearchParam,
        setSearchParam,
        SelectedPage,
        setSelectedPage,
        PageCount,
        setPageCount,
        PageNpagination,
        setPageNpagination,
        toastVisible,
        settoastVisible,
        toastMsg,
        settoastMsg,
        WeighingPrinterObject,
        setWeighingPrinterObject,
        GoBackToPreviousPage,
        setGoBackToPreviousPage,
        CanNavigate,
        setCanNavigate,
        BlockedPop,
        setBlockedPop,
        PopLogout,
        setPopLogout,
        PopReset,
        setPopReset,
        ResetModule,
        setResetModule,
        PopLoadBol,
        setPopLoadBol,
        SelectedPOnumInfo,
        setSelectedPOnumInfo,
        PopPOListModal,
        setPopPOListModal,
        ScannerLoadingState,
        setScannerLoadingState,
        qrInfo,
        setQrInfo,
        PopScannerModal,
        setPopScannerModal,
        userInfo,
        setUserInfo,
        userid,
        setuserid,
        isLoggedIn,
        setIsLoggedIn,
        pop,
        setPop,
        popLabel,
        setpopLabel,
        popTitle,
        setpopTitle,
        allowedModuleids,
        setAllowedModuleids,
        module,
        setModule,
        moduleName,
        setModuleName,
      }}
    >
      <>{props.children}</>
    </ITopContext.Provider>
  );
};
export { ITopContext, ITopProvider };
