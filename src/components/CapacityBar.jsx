import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

function CapacityBar(props) {
      return(
      <ProgressBar completed={props.filled} bgColor="#00567e" baseBgColor="white"/>
      )
}

export default CapacityBar;