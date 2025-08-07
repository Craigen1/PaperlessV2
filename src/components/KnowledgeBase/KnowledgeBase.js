import React from "react";
import KnowledgeBaseTopicFilter from "./KnowledgeBaseTopicFilter";
import KnowledgeBaseTopics from "./KnowledgeBaseTopics";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function KnowledgeBase() {
  const screenSize = useMediaQuery("(min-width:900px)");

  return (
    <div className={screenSize ? "flex" : ""}>
      <KnowledgeBaseTopicFilter screenSize={screenSize} />
      <KnowledgeBaseTopics />
    </div>
  );
}
