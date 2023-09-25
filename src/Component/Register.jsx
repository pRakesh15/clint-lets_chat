import React, { useState } from "react";
import "./register.css";
import dlogo from "../Images/dlogo.png";
import { Link } from "react-router-dom";

let user;
const sendUser = () => {
  user = document.getElementById("userName").value;
};

function Register() {
  const [name, setName] = useState("");
  //Onchange event....
  const onChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className=" bg-black h-screen flex content-center justify-center ">
      <div className="bg-black flex flex-col content-center items-center  lg:mr-[2rem] ">
        <img src={dlogo} alt="" className=" h-56 w-56 mt-20 lg:h-32 lg:w-32 lg:mt-48" />
        <input
          type="text"
          onChange={onChange}
          id="userName"
          placeholder="Enter Your Name"
          className="border-2 border-sky-500 h-10 w-60 lg:h-10 lg:w-64 xl:h-10 xl:w-64 outline-none"
        />
        <Link
          onClick={(e) => (!name ? e.preventDefault() : null)}
          to={"/chart"}
        >
          <button
            onClick={sendUser}
            className="text-white bg-red-600 h-10 w-60 mt-9 text-[29px] lg:w-64 lg:h-10 lg:text-[22px] xl:w-64 xl:h-10  xl:text-[22px] "
          >
            Login
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Register;
export { user };



