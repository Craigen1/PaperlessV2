import {
  BriefcaseIcon,
  CakeIcon,
  ExternalLinkIcon,
  LinkIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import React from "react";

export default function PortfHeader() {
  return (
    <>
      <div className="mx-auto max-w-screen-md frame mt-2 h-40"></div>
      <div className="mx-auto max-w-screen-md -mt-20 pl-6">
        <img
          className="rounded-full border-black   w-36 lg:w-48"
          style={{
            borderWidth: "6px ",
          }}
          src="https://scontent-hkt1-1.xx.fbcdn.net/v/t39.30808-6/356024493_6986536961360801_2098604543028986501_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeH2tjqXiTguMM8xX0hQrClM3r8ThLb8eQjevxOEtvx5CNvRUJCMtmpkbn6r2sQE834JRqRaTT5HsZc0O2so_nZH&_nc_ohc=Ox8soBHgiKcAX_MVC6x&_nc_ht=scontent-hkt1-1.xx&oh=00_AfDZienzqd7jrGDcAt18p-AxaRmqROP7a0wv_-ltBif7_w&oe=64E4481F"
        />
        <h1 className="  gap-x-2 items-center font-extrabold text-WhiteMode-Font">
          Deanmark Famoleras
        </h1>

        <div class="leading-tight">
          <p class="mb-2 text-lg">
            A Jack of all Trades in the digital realm! 🎩💻
          </p>
          <p class="mb-2 text-lg">
            {/* Lead Programmer, SAP B1 Developer, Database Admin */}
          </p>
        </div>

        <div className="flex gap-4 my-4 text-lg ">
          <div className="flex  gap-1">
            <BriefcaseIcon className="w-7 font-black" />
            Available
          </div>

          <div className="flex  gap-1">
            <CakeIcon className="w-7 font-black" />
            August 13th
          </div>

          <div className="flex  gap-1">
            <LinkIcon className="w-7 font-black" />
            <p className="m-0 p-0 text-red-500">Links</p>
          </div>
        </div>
      </div>
    </>
  );
}
