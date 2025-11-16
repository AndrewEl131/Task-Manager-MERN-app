import React from "react";

const ExplorerSortField = ({content}) => {
  return (
    <div className="w-full h-[1rem] text-center text-gray-400 cursor-context-menu">
      <h1>By {content}</h1>
      <div className="w-[80%] h-[1px] bg-gray-400 m-auto mt-1 cursor-context-menu"></div>
    </div>
  );
};

export default ExplorerSortField;
