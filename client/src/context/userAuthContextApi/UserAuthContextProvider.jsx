import React, { useEffect, useState } from "react";
import userAuthContext from "./userAuthContext.js";
import Cookies from "js-cookie";

const UserAuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  let isUserExist = Cookies.get("userToken");
  useEffect(() => {
    if (isUserExist) {
      setUserToken(isUserExist);
    }
  }, []);

  return (
    <userAuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </userAuthContext.Provider>
  );
};
export default UserAuthContextProvider;
