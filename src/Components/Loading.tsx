import React from "react";
import loading from "../assets/images/loading.gif";
function Loading() {
  return (
    <div className="loading w-full h-full flex items-center justify-center">
      <img className="w-[50px] h-[50px]" src={loading} alt="Loading" />
    </div>
  );
}

export default Loading;
