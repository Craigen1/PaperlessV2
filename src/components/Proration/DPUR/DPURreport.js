import React, { useEffect, useState } from "react";
import { DefButton } from "../../ComponentList";
import DPURHeaderInfo from "./DPURHeaderInfo";
import DPURFooterInfoNAI from "./DPURFooterInfoNAI";
import DPURFooterInfo from "./DPURFooterInfo";
import { useUserStore } from "../../userStore/useUserStore";

export default function DPURreport(p) {
  const [Header, setHeader] = useState([
    {
      label: "Item Code",
      rowSpan: 2,
      colSpan: 1,
    },
    {
      label: "Item Name",
      rowSpan: 2,
      colSpan: 1,
    },
    {
      label: "UoM",
      rowSpan: 2,
      colSpan: 1,
    },
    {
      label: "Production Usage",
      rowSpan: 1,
      colSpan: 2,
    },
    {
      label: "Production Rejects",
      rowSpan: 2,
      colSpan: 1,
    },
    {
      label: "TOTAL USAGE",
      rowSpan: 2,
      colSpan: 1,
    },
    {
      label: "Qty Processed in SAP R3",
      rowSpan: 2,
      colSpan: 1,
    },
    // {
    //   label: "Production Sample",
    //   rowSpan: 2,
    //   colSpan: 1,
    // },
    {
      label: "BATCH CODE",
      rowSpan: 2,
      colSpan: 1,
    },
    {
      label: "Remarks",
      rowSpan: 2,
      colSpan: 1,
    },
  ]);
  const [HeaderMachine, setHeaderMachine] = useState([]);
  function TotalUsage(e) {
    let a = 0,
      f = 0,
      p = 0;
    if (e.a != null) a = e.a;
    if (e.f != null) f = e.f;
    if (e.p != null) p = e.p;
    return <>{a + f + p}</>;
  }
  function Lines(x) {
    return (
      <>
        <tr>
          <td clpssName="DPUR_TD "></td>
          <td className="border-[1px] " colSpan={Header.length}>
            {x.headerLabel}
          </td>
        </tr>

        {p.Usage.filter((ee) => ee.ItemGroup == x.headerLabel).map((e, i) => (
          <>
            <tr>
              <td className="DPUR_TD  ">{e.ItemCode}</td>
              <td className="DPUR_TDL ">{e.Dscription}</td>
              <td className="DPUR_TD ">{e.UomCode}</td>
              <td className="DPUR_TD ">
                {e.Quantity == null ? "-" : e.Quantity}
              </td>

              <td className="DPUR_TD ">
                {e.U_FormulaAdj == null ? "-" : e.U_FormulaAdj}
              </td>

              <td className="DPUR_TD ">
                {e.U_Reject == null ? "-" : e.U_Reject}
              </td>
              <td className="DPUR_TD ">
                <TotalUsage
                  a={e.totalusage2}
                  f={e.U_FormulaAdj}
                  p={e.U_Reject}
                />
              </td>

              <td className="DPUR_TD ">
                {e.QtyInSAPR3 == 0 ? "-" : e.QtyInSAPR3}
              </td>
              {Array.isArray(HeaderInfo) && HeaderInfo.length > 0 && (
                <>
                  {HeaderInfo[0].clientt == "NAI" && (
                    <>
                      <td
                        className="DPUR_TD  "
                        rowSpan={e.rowSpan}
                        colSpan={e.colSpan}
                      >
                        {e.ProductionSample}
                      </td>
                    </>
                  )}
                </>
              )}
              <td className="DPUR_TD ">{e.BatchNum}</td>
              <td className="DPUR_TD ">{e.U_Remarks}</td>
            </tr>
          </>
        ))}
      </>
    );
  }
  useEffect(() => {
    if (Array.isArray(p.Machine)) {
      setHeaderMachine([]);
      setHeaderMachine((e) => [
        ...e,
        {
          label: "B",
          rowSpan: 2,
          colSpan: 1,
        },
      ]);
      p.Machine.map((x) => {
        setHeaderMachine((e) => [
          ...e,
          {
            label: x.Machine,
            rowSpan: 2,
            colSpan: 1,
          },
        ]);
      });

      setHeaderMachine((e) => [
        ...e,
        {
          label: "Sample",
          rowSpan: 2,
          colSpan: 1,
        },
        {
          label: "Equivalent",
          rowSpan: 2,
          colSpan: 1,
        },
        {
          label: "Batch Code",
          rowSpan: 2,
          colSpan: 1,
        },
      ]);
    }
  }, [p.Machine]);

  useEffect(() => {
    console.log({ p });
  }, [p]);

  const [machineSums, setmachineSums] = useState([]);
  const [EquivalentTotal, setEquivalentTotal] = useState(0);
  const [lastMnfD, setlastMnfD] = useState("01");
  const [SampleEQ, setSampleEQ] = useState(0);
  const [HeaderInfo, setHeaderInfo] = useState([]);
  const {
    setMachineSummation_MJ,
    setEquivalentTotal_MJ,
    setSampleEQ_MJ,
    setLastMnfD_MJ,
    machineSummation_MJ,
  } = useUserStore();
  let newMachineSums = {};
  useEffect(() => {
    setmachineSums([]);
    setEquivalentTotal(0);
    setMachineSummation_MJ([]);
    setEquivalentTotal_MJ(0);
    setSampleEQ_MJ(0);
    if (!Array.isArray(p.Machine)) return;
    if (!Array.isArray(p.Output)) return;

    p.Machine.map((m) => {
      let machineSum = 0;
      let sum = 0;
      let sumsample = 0;

      p.Output.map((e) => {
        if (e.U_TransType == "C") machineSum += e[m.Machine];
        sum += e.sum;
        if (e.U_TransType == "S") sumsample += e.sum;
        setlastMnfD(e.MnfSerial);
        setLastMnfD_MJ(e.MnfSerial);
      });
      newMachineSums[m.Machine] = machineSum;
      setmachineSums((e) => ({ ...e, [m.Machine]: machineSum }));
      setMachineSummation_MJ(newMachineSums);
      setEquivalentTotal(sum);
      setEquivalentTotal_MJ(sum);
      setSampleEQ(sumsample);
      setSampleEQ_MJ(sumsample);
    });
  }, [p.Output]);

  useEffect(() => {
    console.log({ machineSums });
  }, [machineSums]);

  return (
    <div className="overflow-auto">
      <DPURHeaderInfo
        SearchValues={p.SearchValues}
        setHeaderInfo={setHeaderInfo}
      />

      <div className="flex">
        <table>
          <tr>
            {Array.isArray(Header) && (
              <>
                {Header.map((e, i) => (
                  <>
                    {e.label == "BATCH CODE" &&
                      Array.isArray(HeaderInfo) &&
                      HeaderInfo.length > 0 && (
                        <>
                          {HeaderInfo[0].clientt == "NAI" && (
                            <>
                              <td
                                className="DPUR_TD  "
                                rowSpan={e.rowSpan}
                                colSpan={e.colSpan}
                              >
                                Production Sample
                              </td>
                            </>
                          )}
                        </>
                      )}
                    <td
                      className="DPUR_TD  "
                      rowSpan={e.rowSpan}
                      colSpan={e.colSpan}
                    >
                      {e.label}
                    </td>
                  </>
                ))}
              </>
            )}
          </tr>
          <tr>
            <td className="DPUR_TD ">Actual</td>
            <td className="DPUR_TD ">Formula Adj.</td>
          </tr>

          <Lines headerLabel={"Raw Materials"} />
          <Lines headerLabel={"Packaging Materials"} />
          <Lines headerLabel={"Consumables"} />
        </table>
        <table className="h-fit">
          <tr>
            {HeaderMachine.map((e, i) => (
              <>
                <td
                  className="DPUR_TD  "
                  rowSpan={e.rowSpan}
                  colSpan={e.colSpan}
                >
                  {e.label}
                </td>
              </>
            ))}
          </tr>
          <tr></tr>
          {Array.isArray(p.Output) && (
            <>
              {p.Output.map((e) => (
                <>
                  <tr>
                    <td className="DPUR_TD ">{e.MnfSerial}</td>
                    {Array.isArray(p.Machine) &&
                      p.Machine.map((x) => (
                        <>
                          <td className="DPUR_TD ">
                            {e.U_TransType == "S" ? "-" : e[x.Machine]}
                          </td>
                        </>
                      ))}
                    {/* {p.Machine.map((x) => (
                      <>
                        <td className="DPUR_TD ">{e[x.Machine]}</td>
                      </>
                    ))} */}
                    <td className="DPUR_TD ">
                      {e.U_TransType == "S" ? e.sum : "-"}
                    </td>
                    <td className="DPUR_TD ">{e.sum}</td>
                    <td className="DPUR_TD ">{e.Batch}</td>
                  </tr>
                </>
              ))}
            </>
          )}

          <tr>
            <td> &nbsp;</td>
          </tr>
          <tr>
            <td className="DPUR_TD ">{lastMnfD}</td>
            {p.Machine.map((x) => (
              <>
                <td className="DPUR_TD ">{machineSums[x.Machine]}</td>
              </>
            ))}
            <td className="DPUR_TD ">{SampleEQ}</td>
            <td className="DPUR_TD bg-primary text-white">{EquivalentTotal}</td>
            <td className="DPUR_TD "></td>
          </tr>
        </table>
      </div>
      {/* <DefButton onClick={(e) => console.log(p.Output)} text="See Button" /> */}
      {Array.isArray(HeaderInfo) && (
        <>
          {HeaderInfo.length > 0 && (
            <>
              {HeaderInfo[0].clientt == "NAI" ? (
                <>
                  <DPURFooterInfoNAI
                    HeaderInfo={HeaderInfo}
                    SampleEQ={SampleEQ}
                    EquivalentTotal={EquivalentTotal}
                    lastMnfD={lastMnfD}
                    Usage={p.Usage}
                  />
                </>
              ) : (
                <>
                  <DPURFooterInfo
                    HeaderInfo={HeaderInfo}
                    SampleEQ={SampleEQ}
                    EquivalentTotal={EquivalentTotal}
                    lastMnfD={lastMnfD}
                    Usage={p.Usage}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
