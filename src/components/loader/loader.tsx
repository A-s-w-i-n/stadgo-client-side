// import React from "react";
import '../loader/loader.css'

const Loader = () => {
  return (
<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[10rem]">
  <div className="circle"></div>
  <div className="circle"></div>
  <div className="circle"></div>
  <div className="shadow"></div>
  <div className="shadow"></div>
  <div className="shadow"></div>
</div>
  );
};

export default Loader;
