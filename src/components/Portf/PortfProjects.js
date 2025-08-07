import React from "react";
import { TwitterCheckBadge } from "../Svg/TwitterCheckBadge";

export default function PortfProjects() {
  const Projects = [
    {
      title: "License Request Module",
      company: "@InnovativePack",
      dateDone: "23 Aug 2022",
      longTextLabel: "23 Aug 2022",
      techUsed: [
        {
          label: "SAP B1",
        },
        {
          label: "SAP SDK ",
        },
        {
          label: "Service Layer ",
        },

        {
          label: "ReactJs",
        },
        // {
        //   label: "Express",
        // },
        // {
        //   label: "NodeJs",
        // },
        {
          label: "MSSQL",
        },
      ],
      VidPicLink:
        "https://drive.google.com/file/d/1shnPC9uLsRx4JfQJDwLClEhz-87yTTBE/preview",
    },

    {
      title: "Interbranch Delivery",
      company: "@InnovativePack",
      dateDone: "23 Aug 2022",
      longTextLabel: "23 Aug 2022",
      techUsed: [
        {
          label: "SAP B1",
        },
        {
          label: "SAP SDK ",
        },

        {
          label: "MSSQL",
        },
      ],
      VidPicLink:
        "https://drive.google.com/file/d/1shnPC9uLsRx4JfQJDwLClEhz-87yTTBE/preview",
    },

    {
      title: "Proration",
      company: "@InnovativePack",
      dateDone: "23 Aug 2022",
      longTextLabel: "23 Aug 2022",
      techUsed: [
        {
          label: "SAP B1",
        },
        {
          label: "SAP SDK ",
        },

        {
          label: "MSSQL",
        },
      ],
      VidPicLink:
        "https://drive.google.com/file/d/1shnPC9uLsRx4JfQJDwLClEhz-87yTTBE/preview",
    },

    {
      title: "'Paperless'",
      company: "@InnovativePack",
      dateDone: "23 Aug 2022",
      longTextLabel: "23 Aug 2022",
      techUsed: [
        {
          label: "SAP B1",
        },
        {
          label: "SAP SDK ",
        },

        {
          label: "MSSQL",
        },
      ],
      VidPicLink:
        "https://drive.google.com/file/d/1shnPC9uLsRx4JfQJDwLClEhz-87yTTBE/preview",
    },
  ];

  return (
    <>
      <div>
        {Projects.map((item, index) => (
          <>
            <div className="mx-auto w-full max-w-screen-xs flex hover:bg-trans20 ">
              {/* <img
          className="rounded-full    w-11 h-11 border border-black invisible transparent"
          src="https://scontent-hkt1-1.xx.fbcdn.net/v/t39.30808-6/356024493_6986536961360801_2098604543028986501_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeH2tjqXiTguMM8xX0hQrClM3r8ThLb8eQjevxOEtvx5CNvRUJCMtmpkbn6r2sQE834JRqRaTT5HsZc0O2so_nZH&_nc_ohc=Ox8soBHgiKcAX_MVC6x&_nc_ht=scontent-hkt1-1.xx&oh=00_AfDZienzqd7jrGDcAt18p-AxaRmqROP7a0wv_-ltBif7_w&oe=64E4481F"
        /> */}
              <div className="mt-2 mx-2 w-full">
                <div className="flex">
                  <span className="font-bold">{item.title}</span>
                  <TwitterCheckBadge className="w-5 h-5 m-0.5" />
                  <span className="text-gray-800">{item.company}</span>
                  <span className="text-gray-800 ml-2">{item.dateDone}</span>
                </div>

                <div className="w-full">
                  <span className="font-semibold">{item.longTextLabel}</span>
                  <br></br>
                  {/* <span className="mr-2">Tech:</span> */}
                  {item.techUsed.map((item, index) => (
                    <>
                      <div className="px-1 py-0 mt-1 mx-0.5 inline-block rounded-full bg-red-500 text-white w-fit whitespace-nowrap">
                        {item.label}
                      </div>
                    </>
                  ))}
                  <iframe
                    src="https://drive.google.com/file/d/1shnPC9uLsRx4JfQJDwLClEhz-87yTTBE/preview"
                    className="w-full h-64 bg-WhiteMode-FromBackground000 rounded-md mt-2"
                    allow="autoplay"
                  ></iframe>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
