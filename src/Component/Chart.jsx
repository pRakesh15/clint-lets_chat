import React, { useEffect } from "react";
import "./chart.css";
import { user } from "./Register";
import logo from "../Images/logo.png";
import io from "socket.io-client";
import { IoSendSharp } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { useState } from "react";
import Message from "./Message";

import ScrollToBottom from "react-scroll-to-bottom";
// import { MdOutlineLightMode } from "react-icons/md"
let socket;

const ENDPOINT = "https://letsschat.onrender.com";
function Chart() {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const[text,setText]=useState(null)

  const send = () => {
    const message = document.getElementById("chart").value;

    socket.emit("message", { message, id });
    
    document.getElementById("chart").value = null;
  };

  

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    //for onn the connection for socket***
   
    socket.on("connect", (socket) => {
      alert("connected");
      
    });
    setId(socket.id);
    // console.log(socket)

    //emit is use to pass data from Oneend to  Anotherend*
    socket.emit("joined", { user })

    socket.on("wellcome", (data) => {
      setMessages([...messages, data]);


    })
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

const textchange = (e) => {
  setText(e.target.value);
};

  return (
    <div className="flex justify-center items-center  bg-gray-700">
      <div className="container  h-screen">
        <div className="flex bg-green-900 h-12 box-border justify-center items-center">
          <img src={logo} alt="logo" className="w-24 -mt-5 -mb-5 -ml-10" />
          <div className="ml-[1350px] text-2xl">
            <MdDarkMode className="cursor-pointer text-2xl w-16" />
          </div>
        </div>
        <ScrollToBottom className="h-[85%] bg-gray-700">
          {messages.map((item, i) => {
            return (
              <div key={item.id}>
                <Message
                  Message={item.message}
                  user={item.user === user ? "" : item.user}
                  classs={item.user === user ? "right" : "left"}
                />
              </div>
            );
          })}
        </ScrollToBottom>
        <div className="input flex bg-gray-900">
          <input
            type="text"

            onKeyPress={(e)=>e==='Enter'?send():null}
            onChange={textchange}
            id="chart"
            placeholder="Type a message"
            
            className="bg-gray-900 h-14 w-[90%] text-white text-xl outline-none"
          />
          <button
            onClick={(e) => (!text ? e.preventDefault() : send())}
        
            className="bg-transparent outline-none h-14 w-[5%] flex justify-center items-center ml-14 "
          >
          {
           !text ?'' :<IoSendSharp className="w-28 text-3xl text-white " /> 
          }
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chart;
