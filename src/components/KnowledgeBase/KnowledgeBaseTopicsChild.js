import React, { useState } from "react";

export default function KnowledgeBaseTopicsChild(p) {
  return (
    <div className="flex hover:bg-trans20 p-2 rounded-sm">
      <div>
        <img
          src={p.item.thumbnailLink}
          alt="loading..."
          className="max-w-[250px] min-w-[250px] max-h-[150px] min-h-[150px] object-cover mt-2 ml-2"
        />
      </div>
      {/* dets */}
      <div className="mx-4 w-full">
        <p className="m-0 p-0 text-xl font-semibold">{p.item.title}</p>
        <p className="m-0 p-0 mt-2">{p.item.details}</p>
        <p className="m-0 p-0 text-sm text-trans50 mt-2">-{p.item.author}</p>
        <p className="m-0 p-0 text-sm text-trans50">{`${p.item.totalMins} total mins | ${p.item.totalLecture} lecture`}</p>
        <p className="m-0 p-0 text-sm text-trans50">{p.item.level}</p>
      </div>
    </div>
  );
}
