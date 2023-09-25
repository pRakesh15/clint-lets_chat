import React, { useEffect } from "react";
import "./chart.css";
import { user } from "./Register";
import logo from "../Images/logo.png";
import io from "socket.io-client";
import { IoSendSharp } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { useState } from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";
import { data } from "autoprefixer";

// import { MdOutlineLightMode } from "react-icons/md"
let socket;

const ENDPOINT = "https://letsschat.onrender.com";
function Chart() {
  const [myid, setMyid] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState(null);
  const[image,setImage]=useState(null);
  const[rimage,setRimage]=useState(null);
 
  const sendM = (e) => {
   
      
  
    
      const message = document.getElementById("chart").value;
    socket.emit("message", {type:"message", message, myid });

    document.getElementById("chart").value = null;

};
const sendFile=(e)=>
{

     const reader=new FileReader();
     reader.onload=(event)=>
     {
      const dataUrl=event.target.result;
      socket.emit("sendFile",{type:"file",data:dataUrl});
     }
    
      setImage();
      
}

const send=(event)=>
{
sendM();
sendFile();
}

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", (socket) => {
      // alert("connected");
    });

    socket.on("MyId", (id) => {
      setMyid(id);
    });

    socket.emit("joined", { user });

    socket.on("wellcome", (data) => {
      setMessages([...messages, data]);
    });
    socket.on("userJoin", (data) => {
      setMessages([...messages, data]);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
    });
    return () => {
      socket.emit("disconnectt");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
    });
 
    return () => {
      socket.off();
    };
  }, [messages]);
  useEffect(() => {
    socket.on("reciveFile", (data) => {
      setRimage([...rimage,data.data])
      console.log(rimage)
    });
 
    return () => {
      socket.off();
    };
  }, [rimage]);

  const textchange = (e) => {
    setText(e.target.value);
    // setText(image)
  };

  const filechange=(e)=>

  {
    setImage(e.target.files.item(0));
  
    setText(image)
  
    
  }

  return (
    <div className=" h-screen w-fit    sm:w-fit  sm:h-screen lg:flex lg:items-center xl:flex xl:items-center bg-cyan-100">
      <div className="  h-screen w-[100%] m-0 pb-0 lg:h-screen xl:h-screen">
        <div className="flex bg-gray-700 h-12 box-border  items-center lg:justify-center xl:justify-center">
          <img src={logo} alt="logo" className="w-28  mr-24 -ml-6 lg:w-24 lg:-mt-5 lg:-mb-5 lg:ml-1  xl:w-24  xl:-mt-5  xl:-mb-5  xl:ml-1" />
          <div className="ml-28 text-2xl -mr-11 lg:ml-[1300px] xl:ml-[1300px] xl:mr-6 lg:mr-6">
            <MdDarkMode className="cursor-pointer text-2xl w-16  " />
          </div>
        </div>
        <ScrollToBottom className="h-[85%] w-[100%]  box-border  bg-stone-100">
          {messages.map((item, i) => {
            return (
              <div key={item.id}>
                <Message
                  Message={item.message}
                  user={item.user === user ? "" : item.user}
                  type="message"
                  classs={item.user === user ? "right" : "left"}
                />
              </div>
            );
          })}
        </ScrollToBottom>

        <div className="input flex bg-gray-900">
          <label htmlFor="upLodeFile">
            {" "}
            <GrAttachment className="w-20 mt-[18px]  -ml-4 text-2xl  cursor-pointer" />
          </label>
          <input
            type="file"
            onChange={filechange}
            id="upLodeFile"
            className="hidden invisible"
          />

          <input
            type="text"
            onSubmit={(e) => (e === "Enter" ? send() : null)}
            onChange={textchange}
            id="chart"
            placeholder="Type a message"
            className="bg-gray-900 h-12 w-[90%] text-white text-xl outline-none"/>
        
          <button
            onClick={(e) => (!text ? e.preventDefault() : send())}
            className="bg-transparent outline-none h-14 w-[5%] flex  items-center ml-10 lg:ml-14 xl:ml-14 ">
            {!text ? "" : <IoSendSharp className="w-24 xl:w-28 lg:w-28 text-3xl text-white " />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chart;
