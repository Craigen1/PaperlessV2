import { useContext, useEffect, useState } from "react";
import { RFPContentMJ } from "./RFPContentMJ";
import { DefMenus, ToastNotificationMJ } from "../ComponentList";
import { ITopContext } from "../../hooks/TopContext";
import { Branches, header } from "./ArrayMJ";
import { YourRecentRFPMJ } from "./YourRecentRFPMJ";
import { handleChange, handleFailedStatus, sendEmail } from "./utils/functions";
import { useUserStore } from "../userStore/useUserStore";

export const RFPHeaderMJ = () => {
  const { userInfo } = useContext(ITopContext);
  const [loading1, setLoading1] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMSG, setError] = useState("");
  const [dim_center, setDim_Center] = useState([]);
  const [dim_section, setDim_Section] = useState([]);
  const [SelectedMenu, setSelectedMenu] = useState("0");
  const menus = [
    { id: 0, text: "Main" },
    { id: 1, text: "History" },
  ];

  const [headerData, setHeaderData] = useState({
    branch: "",
    sInum: "",
    paymentFor: "",
    payee: "",
    approverEmail: "",
  });
  const [dscription, setDscription] = useState(
    Array(5)
      .fill()
      .map(() => ({
        description: "",
        glCode: "",
        glName: "",
        costCenter: "",
        section: "",
        amount: "",
      }))
  );
  const { setHeaderDataZustand, setDscriptionZustand } = useUserStore();

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "paymentFor" && value.length > 300) {
      newValue = value.slice(0, 300);
    }
    if (name === "payee" && value.length > 140) {
      newValue = value.slice(0, 140);
    }
    if (name === "sInum" && value.length > 100) {
      newValue = value.slice(0, 100);
    }

    setHeaderData((prev) => ({ ...prev, [name]: newValue }));
    setHeaderDataZustand((prev) => ({ ...prev, [name]: newValue }));
  };

  function isEmpty(value) {
    return (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "") ||
      (typeof value === "number" && Number.isNaN(value))
    );
  }

  function hasEmptyFieldInRFP1(arr) {
    if (arr.length === 0) return true;
    return arr.some((item) => Object.values(item).some(isEmpty));
  }

  const handleSubmit = async () => {
    setLoading1(true);
    const ORFP = {
      oBranch: Branches.find((b) => b.code === headerData.branch)?.code || "",
      oRemarks: headerData.paymentFor,
      oPayee: headerData.payee,
      oApproverEmail: headerData.approverEmail + "@innovativepkg.com.ph",
      oUserAccountID: userInfo.ID,
      oUserAccountName: userInfo.firstname + " " + userInfo.lastname,
      oSINum: headerData.sInum,
    };
    const RFP1 = dscription
      .filter(
        (item) =>
          item.description.trim() &&
          item.costCenter.trim() &&
          item.section.trim() &&
          item.glCode.trim() &&
          item.amount.trim()
      )
      .map((item) => ({
        oDescription: item.description.trim(),
        oAcctCode: item.glCode.trim(),
        oCostCenter: item.costCenter.trim(),
        oSection: item.section.trim(),
        oAmount: parseFloat(item.amount),
      }));

    const hasInvalidNumbers = RFP1.some(
      (item) => !/^\d+$/.test(item.oCostCenter) || !/^\d+$/.test(item.oSection)
    );

    if (hasInvalidNumbers) {
      setError("Cost Center and Section must contain numbers only.");
      setLoading1(false);
      return;
    }

    const validateRFP1 = RFP1.length === 0 || hasEmptyFieldInRFP1(RFP1);
    const validateORFP = Object.values(ORFP).some(isEmpty);
    console.log({ ORFP, RFP1 });

    try {
      let x;
      if (!validateRFP1 && !validateORFP) {
        const res = await fetch("ORFPMJ", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            modelORFP: ORFP,
            modelRFP1: RFP1,
          }),
        });
        x = await res.json();
        console.log("X", x);
        if (x) {
          await sendEmail({
            x: x.RFPCode,
            headerData: headerData,
            setError,
            setLoading1,
          });
          x.RFPCode;
        }
      } else if ((validateORFP || validateRFP1) && x) {
        setError("Please complete all required fields before submitting.");
        await handleFailedStatus(x.RFPCode);
      } else {
        setError("Please complete all required fields before submitting.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setMessage("RFP created successfully and email notification sent.");
      setLoading1(false);
    }
  };

  useEffect(() => {
    if (message !== null) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    } else if (errorMSG !== null) {
      const timerErr = setTimeout(() => {
        setError(null);
      }, 6000);

      return () => clearTimeout(timerErr);
    }
  }, [message, errorMSG]);

  useEffect(() => {
    const cost_section = async () => {
      const res = await fetch("cost-sectionMJ", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setDim_Center(data.costCenterDim2);
      setDim_Section(data.costCenterDim3);
      console.log(data);
    };
    cost_section();
  }, []);

  return (
    <div>
      <DefMenus
        menus={menus}
        SelectedMenuId={SelectedMenu}
        setSelectedMenuId={setSelectedMenu}
      />
      <div className="flex flex-col md:flex-row gap-6 px-4 py-6 bg-[#f9fafb]">
        {SelectedMenu === "0" && (
          <div className="w-full md:w-[70%] mx-auto bg-white shadow-md rounded-xl">
            <div className="space-y-6">
              {/* Header */}
              <header className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-[#5ad875] to-[#67bf4c] text-white rounded-t-xl shadow-md">
                <h1 className="text-2xl font-semibold tracking-wide">
                  A/P Invoice
                </h1>
              </header>

              {/* Info Banner */}
              <section className="px-6">
                <div className="text-sm text-[#4B5563] py-3 px-4 bg-[#F9FAFB] rounded-md border border-[#E5E5E5]">
                  <strong className="text-[#4cbf65]">Developer Note:</strong>{" "}
                  This request form automatically generates an A/P Invoice in
                  SAP B1 and requires approval.
                </div>
              </section>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                {header.map((item, index) => (
                  <div key={index}>
                    <label
                      htmlFor={item.id}
                      className="block mb-2 text-sm font-medium text-[#374151]"
                    >
                      {item.label}
                    </label>
                    {item.subArr.length > 0 ? (
                      <>
                        <input
                          list={`list-${item.id}`}
                          onChange={handleChange1}
                          maxLength={item.id === "payee" ? 10 : undefined}
                          type={item.type}
                          name={item.name}
                          id={item.id}
                          required
                          placeholder={`Search ${item.label}`}
                          className="w-full px-4 py-2.5 rounded-lg border border-[#D1D5DB] focus:border-[#5A67D8] focus:ring-2 focus:ring-[#C3C7FD] text-sm transition duration-200 shadow-sm"
                        />
                        <datalist id={`list-${item.id}`}>
                          {item.subArr.map((data) => (
                            <option required key={data.id} value={data.code} />
                          ))}
                        </datalist>
                      </>
                    ) : (
                      <input
                        type={item.type}
                        id={item.id}
                        required
                        name={item.name}
                        onChange={handleChange1}
                        placeholder={`Enter ${item.label}`}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#D1D5DB] focus:border-[#5A67D8] focus:ring-2 focus:ring-[#C3C7FD] text-sm transition duration-200 shadow-sm"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Toast Messages */}
              <div className="px-6">
                {message && <ToastNotificationMJ message={message} />}
                {errorMSG && <ToastNotificationMJ error={errorMSG} />}
              </div>

              {/* Table Content Component */}
              <div className="px-6">
                <RFPContentMJ
                  setError={setError}
                  dim_center={dim_center}
                  dim_section={dim_section}
                  dscription={dscription}
                  handleChange={(e, rowIndex) =>
                    handleChange(
                      e,
                      rowIndex,
                      setDscription,
                      setDscriptionZustand
                    )
                  }
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end px-6 pb-6">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-[#4cbf4c] text-white text-sm font-medium rounded-md shadow-md hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#5A67D8] transition duration-200"
                >
                  {loading1 ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}

        {SelectedMenu === "1" && <YourRecentRFPMJ />}
      </div>
    </div>
  );
};
