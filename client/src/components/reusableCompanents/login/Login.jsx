import React, { useContext, useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { v4 as uuid } from "uuid";
import userAuthContext from "../../../context/userAuthContextApi/userAuthContext.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import createDateString from "../../../utils/createDateString/CreateDate.js";
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

  const handleNotificationBar = ({ open, message, severity }) => {
    // console.log(message, open, severity);
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
  const [RegisterOrLogin, setRegisterOrLogin] = useState(true);
  const [userCredentails, setUserCredentails] = useState({
    email: "",
    password: "",
  });
  const [newUserRegister, setNewUserRegister] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const HandleUserLogin = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify([
      {
        column: "email",
        value: userCredentails.email,
      },
      {
        column: "password",
        value: userCredentails.password,
      },
    ]);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV}/users/login`,
      requestOptions
    );

    if (!response.ok) {
      const error = await response.text();
      handleNotificationBar({
        open: true,
        message: "invalid Credentials",
        severity: "error",
      });
      console.log(error);
      return;
    }

    const data = await response.json();
    if (data.message == "success") {
      // token receives
      let result = data.result[0];
      console.log(result);

      Cookies.set("userDetails", JSON.stringify(result));
      let storedUserData = JSON.parse(Cookies.get("userDetails"));
      setUserToken(storedUserData);
      // if(result.role == "admin"){
      //   return navigate("/admin/dashboard")
      // }
      navigate("/");
    }
  };

  const HandleNewUserRegister = async () => {
    if (newUserRegister.email == "" || newUserRegister.password == "") {
      handleNotificationBar({
        open: true,
        severity: "error",
        message: "enter Valid Details",
      });
    } else if (newUserRegister.password !== newUserRegister.confirmPassword) {
      handleNotificationBar({
        open: true,
        severity: "error",
        message: "Both Password Not Matching",
      });
    } else {
      console.log(createDateString());
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: uuid(),
        firstName: "",
        lastName: "",
        password: newUserRegister.password,
        email: newUserRegister.email,
        phoneNo: "",
        joinedDate: createDateString(),
        address: "",
        state: "",
        pincode: "",
        city: "",
        role: "user",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      let url = `${
        import.meta.env.VITE_REACT_APP_BASE_API_URL_DEV
      }/users/register`;
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        const error = await response.text();
        console.log(error);
        handleNotificationBar({
          open: true,
          message: "Error in registration try again",
          severity: "error",
        });
        return;
      }

      const data = await response.json();
      console.log(data);
      if (data.message == "success") {
        setRegisterOrLogin(true);
        setNewUserRegister({
          email: "",
          password: "",
          confirmPassword: "",
        });
        handleNotificationBar({
          open: true,
          message: "SuccessFully registered",
          severity: "success",
        });
      }
    }
  };

  return (
    <>
      <section id="login">
        {/* user Login */}

        {RegisterOrLogin && (
          <div className="col">
            <header>
              <h1>Login</h1>
            </header>
            <div className="row">
              <p>Email</p>
              <input
                value={userCredentails.email}
                onChange={(e) =>
                  setUserCredentails({
                    ...userCredentails,
                    email: e.target.value,
                  })
                }
                type="text"
                placeholder="Email"
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
            <div className="row">
              <p>
                {" "}
                Register as New User{" "}
                <span onClick={() => setRegisterOrLogin(false)}>Register</span>
              </p>
            </div>
          </div>
        )}

        {/* new User Registration */}
        {!RegisterOrLogin && (
          <div className="col">
            <header>
              <h1>New Register</h1>
            </header>
            <div className="row">
              <p>Email</p>
              <input
                value={newUserRegister.email}
                onChange={(e) =>
                  setNewUserRegister({
                    ...newUserRegister,
                    email: e.target.value,
                  })
                }
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="row">
              <p>Password</p>
              <input
                value={newUserRegister.password}
                onChange={(e) =>
                  setNewUserRegister({
                    ...newUserRegister,
                    password: e.target.value,
                  })
                }
                type="text"
                placeholder="Password"
              />
            </div>
            <div className="row">
              <p>Confirm Password</p>
              <input
                value={newUserRegister.confirmPassword}
                onChange={(e) =>
                  setNewUserRegister({
                    ...newUserRegister,
                    confirmPassword: e.target.value,
                  })
                }
                type="text"
                placeholder="confirm password"
              />
            </div>
            <div className="row register-login">
              <button onClick={() => HandleNewUserRegister()}>Register</button>
              <button onClick={() => setRegisterOrLogin(true)}>
                login <ArrowRightAltIcon className="login-icon" />
              </button>
            </div>
          </div>
        )}
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
