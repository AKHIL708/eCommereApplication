import React, { useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
import("./Login.scss");

function Login() {
  const navigate = useNavigate();
  const [userCredentails, setUserCredentails] = useState({
    userName: "",
    password: "",
  });
  const HandleUserLogin = () => {
    if (
      userCredentails.userName.length < 5 &&
      userCredentails.password.length < 5
    ) {
      window.alert("Enter User-Name and password");
    } else {
      window.alert("logged in success");
      navigate("/");
    }
  };
  return (
    <>
      <section id="login">
        <div className="col">
          <header>
            <h1>Login</h1>
          </header>
          <div className="row">
            <p>User Name</p>
            <input
              value={userCredentails.userName}
              onChange={(e) =>
                setUserCredentails({
                  ...userCredentails,
                  userName: e.target.value,
                })
              }
              type="text"
              placeholder="UserName or Email"
            />
          </div>
          <div className="row">
            <p>Password</p>
            <input
              value={userCredentails.password}
              onChange={(e) =>
                setUserCredentails({
                  ...userCredentails,
                  password: e.target.value,
                })
              }
              type="text"
              placeholder="Password"
            />
          </div>
          <div className="row">
            <button onClick={() => HandleUserLogin()}>
              Login
              <ArrowRightAltIcon className="login-icon" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
