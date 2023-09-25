import React, { useEffect, useState } from "react";
import "./message.css";
function Message(props) {

  if (props.user) {
  
      return (
        <div
          className={`box-content overflow-clip clear-both  rounded-md  mb-4 text-xl h-fit w-fit ml-4 mt-4 p-1 pl-2 ${props.classs}`}
        >
          {`${props.user}:${props.Message}`}
        </div>
      );
    
  
   
  } else {
    
      return (
        <div
          className={`box-content overflow-clip clear-both  rounded-md  mb-4 text-xl h-fit w-fit ml-4 mt-4 p-1 pl-2 ${props.classs}`}
        >
          {`You:${props.Message}`}
        </div>
      );
   
   
  }
}

export default Message;
