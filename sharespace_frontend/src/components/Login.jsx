import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import shareVideo from "../assets/share2.mp4";
import logo from "../assets/logo-no-background.png";
import { client } from "../client";
import { fetchUser } from "../utils/fetchUser";
import { userQuery } from "../utils/data";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const createOrGetUser = (response) => {
    const decoded = jwt_decode(response.credential);

    localStorage.setItem("user", JSON.stringify(decoded));
    const { name, picture, sub } = decoded;

    const doc = { _id: sub, _type: 'user', title: 'User', userName: name, image: picture };

    client.createIfNotExists(doc).then((res) => {
      console.log("user", res);
      navigate("/", { replace: true });
    }).catch((err)=>{
      console.log(err);
    });
  };

  const userInfo = fetchUser();
  useEffect(() => {
    if (userInfo) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          typeof="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          <div className="shadow-2xl">
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  createOrGetUser(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
