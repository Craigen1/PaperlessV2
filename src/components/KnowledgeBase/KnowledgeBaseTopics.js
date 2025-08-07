import React, { useState } from "react";
import KnowledgeBaseTopicsChild from "./KnowledgeBaseTopicsChild";

export default function KnowledgeBaseTopics() {
  const [TopcList, setTopcList] = useState([
    {
      thumbnailLink:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/git_vs_github2.jpg",
      title: "Git a& GitHub Crash Course: Create a Respository From Scratch! ",
      details:
        "Learn how to create a Git repository, clone it, make changes, and submit changes to GitHub in less than 30 minutes",
      author: "MIS Team",
      totalMins: "10",
      totalLecture: "10",
      Departmnent: "Production",
      level: "All Levels",
    },

    {
      thumbnailLink:
        "https://assets-global.website-files.com/6411daab15c8848a5e4e0153/641b3f9ce3cdde01161582b2_629712455650ab2e848fe8c4_logo-wordpress.png",
      details:
        "Learn how to create a Git repository, clone it, make changes, and submit changes to GitHub in less than 30 minutes",
      author: "MIS Team",
      totalMins: "10",
      totalLecture: "10",
      Departmnent: "Production",
      level: "All Levels",
      title: "Git a& GitHub Crash Course: Create a Respository From Scratch! ",
    },

    {
      thumbnailLink:
        "https://i0.wp.com/sonix.ai/resources/wp-content/uploads/2022/11/how-to-get-youtube-transcript.png?fit=1388%2C900&ssl=1",
      details:
        "Learn how to create a Git repository, clone it, make changes, and submit changes to GitHub in less than 30 minutes",
      author: "MIS Team",
      totalMins: "10",
      totalLecture: "10",
      Departmnent: "Production",
      level: "All Levels",
      title: "Git a& GitHub Crash Course: Create a Respository From Scratch! ",
    },
    {
      thumbnailLink:
        "https://creately.com/static/assets/guides/network-diagram-guide-tutorial/network-diagram-guide-tutorial.png",
      details:
        "Learn how to create a Git repository, clone it, make changes, and submit changes to GitHub in less than 30 minutes",
      author: "MIS Team",
      totalMins: "10",
      totalLecture: "10",
      Departmnent: "Production",
      level: "All Levels",
      title: "Git a& GitHub Crash Course: Create a Respository From Scratch! ",
    },
  ]);

  return (
    <div>
      {TopcList.map((item, index) => (
        <KnowledgeBaseTopicsChild item={item} />
      ))}
    </div>
  );
}
