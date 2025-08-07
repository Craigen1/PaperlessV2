import React, { useContext, useEffect, useState } from "react";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "../ComponentList";
import ProrationAddHeaderComps from "./ProrationAddHeaderComps";
import ProrationAddVariant from "./ProrationAddVariant";
import ProrationAddMaterialUsage from "./ProrationAddMaterialUsage";
import ProrationAddMaterialPoSelection from "./ProrationAddMaterialPoSelection";
import ProrationAddMaterial from "./ProrationAddMaterial";
import {
  postProration,
  PostWater2,
  ProrationPostLogin,
  SaveAsDraft,
  VoidProration,
} from "./ProrationPost";
import { ITopContext } from "../../hooks/TopContext";
import { formatDate } from "date-fns";
import ProrationMaterialsAdd from "./ProrationMaterialsAdd";
import LineLoss from "./LineLoss/LineLoss";
import Toast from "../Toast";

export default function ProrationAddHeaderA() {
  const { userInfo, DateNow } = useContext(ITopContext);
  const [compValues, setcompValues] = useState("");
  const [ToastShow, setToastShow] = useState(false);
  const [ToastShowMsg, setToastShowMsg] = useState("");
  const [Choose, setChoose] = useState(false);
  const [showAddMaterials, setshowAddMaterials] = useState(false);
  const [AddMats, setAddMats] = useState(false);
  const [PostingLoading, setPostingLoading] = useState(false);
  const [ChosnProdOrders, setChosnProdOrders] = useState([]);
  const [ChosnRows, setChosnRows] = useState([]);
  const [MaterialUsage, setMaterialUsage] = useState([]);
  const [MaterialUsageStorage, setMaterialUsageStorage] = useState([]);
  const [ItemLines, setItemLines] = useState([]);
  const [msg, setmsg] = useState("");
  const [Water, setWater] = useState("");
  const [SaveAsDrafRes, setSaveAsDrafRes] = useState("");

  const GetFromDraft = async (e) => {
    console.log({ compValues });
    if (ChosnProdOrders.length == 0) return;
    await EXEC_SQL_InsertOne(
      775,
      setMaterialUsage,
      compValues.ProductionDate,
      compValues.Station,
      compValues.ProrationType
    );
  };

  const PostMeNow = async (e) => {
    if (Array.isArray(SaveAsDrafRes) == false) {
      setToastShowMsg("Save me as draft!");
      setToastShow(true);
      return;
    }

    if (SaveAsDrafRes.length <= 0) {
      setToastShowMsg("Save me as draft!");
      setToastShow(true);
      return;
    }

    setmsg("");
    ProrationPostLogin(
      ItemLines,
      MaterialUsage,
      compValues,
      ChosnProdOrders,
      userInfo,
      formatDate(DateNow[0], "yyyy-MM-dd"),
      setPostingLoading,
      setmsg,
      setWater,
      SaveAsDrafRes[0].DraftID
    );
  };

  const PostWater = async (e) => {
    console.log("asd");
    PostWater2(MaterialUsage, compValues, setWater, ChosnProdOrders);
  };

  useEffect(() => {
    if (Array.isArray(Water) && Water.length > 0) alert("Water Posted");
  }, [Water]);

  const SaveASDrafts = async (e) => {
    // let prorateBtn = document.getElementById("iProrateBtn");
    // prorateBtn.click();
    SaveAsDraft(
      ItemLines,
      MaterialUsage,
      compValues,
      ChosnProdOrders,
      userInfo,
      formatDate(DateNow[0], "yyyy-MM-dd"),
      setPostingLoading,
      setmsg,
      setWater,
      setSaveAsDrafRes
    );
  };

  useEffect(() => {
    console.log({ MaterialUsageStorage });
  }, [MaterialUsageStorage]);

  useEffect(() => {
    if (SaveAsDrafRes.length <= 0) return;
    if (SaveAsDrafRes[0].ErrorNumber == 0) {
      setToastShowMsg("Draft saved!");
      setToastShow(true);
    }
  }, [SaveAsDrafRes]);

  return (
    <div className="">
      <ProrationAddHeaderComps
        compValues={compValues}
        setcompValues={setcompValues}
        SaveAsDrafRes={SaveAsDrafRes}
      />
      <div className="flex">
        <DefButton type="11" text="Choose" onClick={() => setChoose(!Choose)} />
      </div>
      <ProrationAddVariant ChosnProdOrders={ChosnProdOrders} />
      <DefButton
        className="btn btn-primary btn-sm"
        text="Get From Draft"
        onClick={GetFromDraft}
      />
      <ProrationAddMaterialUsage
        setAddMats={setAddMats}
        setChosnRows={setChosnRows}
        setMaterialUsage={setMaterialUsage}
        setMaterialUsageStorage={setMaterialUsageStorage}
        setItemLines={setItemLines}
        ItemLines={ItemLines}
        MaterialUsage={MaterialUsage}
        compValues={compValues}
        ChosnProdOrders={ChosnProdOrders}
        userInfo={userInfo}
        formatedDate={formatDate(DateNow[0], "yyyy-MM-dd")}
        setPostingLoading={setPostingLoading}
        setmsg={setmsg}
        setWater={setWater}
        setSaveAsDrafRes={setSaveAsDrafRes}
      />
      {Choose && (
        <ProrationAddMaterialPoSelection
          compValues={compValues}
          setChoose={setChoose}
          setChosnProdOrders={setChosnProdOrders}
        />
      )}
      {AddMats && (
        <ProrationAddMaterial setAddMats={setAddMats} ChosnRows={ChosnRows} />
      )}
      <div>
        <div className="flex w-fit float-right gap-2">
          <DefButton
            text="Post Water Only"
            className="btn btn-primary btn-sm "
            onClick={PostWater}
          />
          <DefButton
            text="Save as Draft"
            id={"saveAsDraft"}
            className="btn btn-primary btn-sm    "
            onClick={SaveASDrafts}
            loading={PostingLoading}
          />
          <DefButton
            text="Post"
            className="btn btn-primary btn-sm "
            onClick={PostMeNow}
            loading={PostingLoading}
          />
        </div>

        <DefButton
          text="Add Materials"
          className="btn btn-primary btn-sm "
          onClick={() => setshowAddMaterials(!showAddMaterials)}
        />
      </div>
      {msg}
      {showAddMaterials && (
        <ProrationMaterialsAdd
          MaterialUsageStorage={MaterialUsageStorage}
          setMaterialUsage={setMaterialUsage}
          setshowAddMaterials={setshowAddMaterials}
        />
      )}
      <LineLoss MaterialUsage={MaterialUsage} />
      {ToastShow && (
        <Toast
          ToastShowMsg={ToastShowMsg}
          duration={3}
          setToastShow={setToastShow}
        />
      )}
    </div>
  );
}
