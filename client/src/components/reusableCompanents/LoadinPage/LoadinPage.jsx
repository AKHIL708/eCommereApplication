import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./LoadingPage.scss";

function LoadinPage() {
  return (
    <>
      <div id="Loading-page">
        <CircularProgress size={100} className="progress" />
        {/* <h1>Loading ..</h1> */}
      </div>
    </>
  );
}

export default LoadinPage;
