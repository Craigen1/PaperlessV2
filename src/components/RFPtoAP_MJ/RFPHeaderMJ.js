import React, { useContext, useEffect, useState } from "react";
import { RFPContentMJ } from "./RFPContentMJ";
import { ToastNotificationMJ } from "../ComponentList";
import { ITopContext } from "../../hooks/TopContext";
import { Branches, header, contents } from "./ArrayMJ";
import { YourRecentRFPMJ } from "./YourRecentRFPMJ";

export const RFPHeaderMJ = () => {
  const { userInfo } = useContext(ITopContext);

  const [loading1, setLoading1] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMSG, setError] = useState("");
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
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setHeaderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e, rowIndex) => {
    const { name, value } = e.target;
    setDscription((prev) => {
      const updated = [...prev];
      const row = { ...updated[rowIndex], [name]: value };
      if (name === "glCode") {
        const code = value.split(" - ")[0].trim();
        const matchedGL = contents
          .find((c) => c.id === "glCode")
          ?.subArr.find((gl) => gl.code === code);
        row.glCode = code;
        row.glName = matchedGL?.id || "";
      }

      updated[rowIndex] = row;
      return updated;
    });
  };

  const sendEmail = async (dataRFP) => {
    const emailTo = headerData.approverEmail;
    try {
      const res = await fetch("send-emailMJ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailTo.trim(),
          rfpNum: dataRFP,
          requestor: headerData.payee,
          forBranch: headerData.branch,
          forRemarks: headerData.paymentFor,
          sINumber: headerData.sInum,
        }),
      });
      const data = await res.json();
      console.log("DATA EMAIL:", data);
    } catch (err) {
      console.log(err);
    }
  };

  const createAPasDraft = async (x) => {
    const today = new Date().toISOString().split("T")[0];
    const apPayload = {
      DocType: "dDocument_Service",
      CardCode: "VPTC000001",
      NumAtCard: x.RFPCode + "/" + headerData.sInum,
      U_APP_NatureOfAPV: "2",
      U_ReceivedDate: today,
      U_SINo: headerData.sInum,
      BPL_IDAssignedToInvoice: parseInt(
        Branches.find((item) => item.code === headerData.branch).id
      ),
      Comments: headerData.paymentFor,
      U_APP_FOR: headerData.paymentFor,
      U_SupplierName: `(P) - ${headerData.payee}`,
      DocumentLines: dscription
        .filter(
          (item) =>
            item.description.trim() &&
            item.costCenter.trim() &&
            item.section.trim() &&
            item.glCode.trim() &&
            item.amount.trim()
        )
        .map((item) => ({
          ItemDescription: item.description.trim(),
          CostingCode2: item.costCenter.trim(),
          CostingCode3: item.section.trim(),
          AccountCode: item.glCode.trim(),
          UnitPrice: parseFloat(item.amount),
        })),
    };
    try {
      const response = await fetch("B1POST", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: apPayload,
          objectType: "PurchaseInvoices",
        }),
      });
      const data = await response.json();
      if (data.error.code === -2028) {
        sendEmail(x);
        setMessage("Success! Your AP Draft is ready.");
      } else if (data.error.message) {
        setError(`Oopps!: ${data.error.message}`);
        try {
          const resp = await fetch("updateStatusMJ", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ x }),
          });
          const updt = await resp.json();
          setLoading1(false);
          console.log("UpdateStatus:", updt);
        } catch (err) {
          console.log(err);
        }
      }
      console.log("AP", apPayload);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading1(false);
      setDscription(
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
    }
  };

  function isEmpty(value) {
    return (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "") ||
      (typeof value === "number" && Number.isNaN(value))
    );
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
    const validateRFP1 = RFP1.length === 0 ? true : false;
    const validateORFP = Object.values(ORFP).some(isEmpty);
    console.log({ ORFP, RFP1 });
    console.log({ validateORFP, validateRFP1 });

    try {
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
        const x = await res.json();
        console.log(x.RFPCode);
        if (x) {
          createAPasDraft(x);
        }
      } else if (validateORFP || validateRFP1) {
        setLoading1(false);
        setError("Please complete all required fields before submitting.");
        try {
          const resp = await fetch("updateStatusMJ", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ x }),
          });
          const updt = await resp.json();
          console.log("UpdateStatus:", updt);
        } catch (err) {
          console.log(err);
        }
      } else {
        setError("Please complete all required fields before submitting.");
        setLoading1(false);
      }
      console.log("Dscription:", dscription);
    } catch (err) {
      console.log(err);
    } finally {
      console.log(headerData);
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
      }, 10000);

      return () => clearTimeout(timerErr);
    }
  }, [message, errorMSG]);

  return (
    <div className="flex flex-col md:flex-row gap-6 border-t-2 border-[#E5E7EB] px-4 py-6 bg-[#f9fafb]">
      {/* Main Form Container */}
      <div className="w-full md:w-[70%] mx-auto bg-white shadow-md rounded-xl">
        <div className="space-y-6">
          {/* Header */}
          <header className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-[#5A67D8] to-[#4C51BF] text-white rounded-t-xl shadow-md">
            <h1 className="text-2xl font-semibold tracking-wide">
              A/P Invoice
            </h1>
          </header>

          {/* Info Banner */}
          <section className="px-6">
            <div className="text-sm text-[#4B5563] py-3 px-4 bg-[#F9FAFB] rounded-md border border-[#E5E5E5]">
              <strong className="text-[#4C51BF]">Developer Note:</strong> This
              request form automatically generates an A/P Invoice in SAP B1 and
              requires approval.
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
              dscription={dscription}
              handleChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end px-6 pb-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-[#4C51BF] text-white text-sm font-medium rounded-md shadow-md hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#5A67D8] transition duration-200"
            >
              {loading1 ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Component */}
      <div className="w-full md:w-[30%]">
        <YourRecentRFPMJ />
      </div>
    </div>
  );
};
