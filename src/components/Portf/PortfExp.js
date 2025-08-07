import React from "react";

export default function PortfExp() {
  const techused1 = [
    {
      label: "SAP B1",
    },
    {
      label: "SAP B1 SDK",
    },
    {
      label: "SAP B1 Service Layer",
    },

    {
      label: "MSSQL",
    },
    {
      label: "Crystal Report",
    },
    {
      label: "Reactjs",
    },
    {
      label: "Node",
    },
    {
      label: "Express",
    },
    {
      label: "Tailwind",
    },
  ];

  const techused2 = [
    {
      label: "SAP B1",
    },
    {
      label: "SAP B1 SDK",
    },

    {
      label: "MSSQL",
    },
    {
      label: "Crystal Report",
    },
  ];

  const techused3 = [
    {
      label: "VB6",
    },
    {
      label: "MySQL",
    },
  ];
  return (
    <div>
      <div className="mx-auto w-full max-w-screen-md px-4 mt-4 hover:bg-trans20 rounded-md py-2">
        <p className="text-xl font-bold p-0 m-0 ">EXPERIENCE</p>
        <div className="m-0">
          {/* YEAR */}
          <p className="p-0 m-0 font-bold">2020 - PRESENT</p>
          <p className="text-lg font-bold p-0 m-0">
            Innovative Packaging Industry - Valenzuela City - Main
          </p>
          <p className="text-lg font-semibold p-0 m-0">Lead Programmer</p>
          <p className="font-semibold text-trans-80">
            SAP Administrator | Database Administrator
            <br></br>
            <div className="h-2" />
            Deliver high-quality, robust production code for a diverse array of
            projects for the company and other branches, including automation of
            users recurring tasks, SAP B1 Add-on Module, and in-house projects.
            Provide mentorship, share knowledge within the MIS department
            [programmers], collaborate and conduct training for other
            departments.
          </p>
        </div>
        <div className=" gap-2">
          {techused1.map((item, index) => (
            <div className="px-2 mt-1 mx-0.5 inline-block rounded-full bg-red-500 text-white w-fit whitespace-nowrap">
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-screen-md px-4 mt-4 hover:bg-trans20 rounded-md py-2 ">
        <div className="m-0">
          <p className="p-0 m-0 font-bold">2018 - 2020</p>
          <p className="text-lg font-bold p-0 m-0">
            Innovative Packaging Industry - Valenzuela City - Main
          </p>
          <p className="text-lg font-semibold p-0 m-0">Programmer</p>
          <p className="font-semibold text-trans-80">
            SAP Developer | Database Administrator
            <br></br>
            <div className="">
              Worked with MIS team and other departments to design Major add-on
              module , designs Crystal reports and query reports for top-level
              users.
            </div>
          </p>
        </div>
        <div className=" gap-2 ">
          {techused2.map((item, index) => (
            <div className="px-2 mt-1 mx-0.5 inline-block rounded-full bg-red-500 text-white w-fit whitespace-nowrap">
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-screen-md px-4 mt-4 hover:bg-trans20 rounded-md py-2">
        <div className="m-0">
          <p className="p-0 m-0 font-bold">2017 - 2018 </p>
          <p className="text-lg font-bold p-0 m-0">
            Innovative Packaging Industry - Cagayan De Oro - Branch
          </p>
          <p className="text-lg font-semibold p-0 m-0">Programmer</p>
          <p className="font-semibold text-trans-80">
            Jr. Programmer | Database Administrator
            <br></br>
            <div className="">
              Collaborates with Lead Branch Programmer,Developed, maintained and
              dispached producction code on EDS applicatiion.
            </div>
          </p>
        </div>
        <div className=" gap-2 ">
          {techused3.map((item, index) => (
            <div className="px-2 mt-1 mx-0.5 inline-block rounded-full bg-red-500 text-white w-fit whitespace-nowrap">
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
