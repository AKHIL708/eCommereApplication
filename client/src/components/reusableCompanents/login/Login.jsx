import React, { useContext, useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import userAuthContext from "../../../context/userAuthContextApi/userAuthContext.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import("./Login.scss");

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const [state, setState] = useState({
    open: false,
    message: "hello",
    severity: "success",
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open, message, severity } = state;

  const handleClick = ({ open, message, severity }) => {
    console.log(message, open, severity);
    setState({
      ...state,
      open,
      message,
      severity,
    });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // above handliing the snack bar
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { userToken, setUserToken } = useContext(userAuthContext);
  const [userCredentails, setUserCredentails] = useState({
    userName: "",
    password: "",
  });
  const HandleUserLogin = () => {
    const { userName, password } = userCredentails;
    if (userName.length < 5 || password.length < 5) {
      handleClick({
        open: true,
        message: "invalid Credentials",
        severity: "error",
      });
    } else {
      Cookies.set("userToken", "asdfgoasdfaksdfashdflasdf");
      let storedCookieToken = Cookies.get("userToken");
      setUserToken(storedCookieToken);
      navigate("/");
    }
  };
  if (userToken != null) {
    return navigate("/");
  }

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

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            <p style={{ fontFamily: "senRegular", fontSize: "1.2vw" }}>
              {" "}
              {message}
            </p>
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

export default Login;
