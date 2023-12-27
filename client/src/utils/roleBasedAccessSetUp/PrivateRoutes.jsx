import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoutes = ({ children, requiredRole }) => {
  const navigate = useNavigate();

  const [userDeatils, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (Cookies.get("userDetails") !== undefined) {
        let storedUserDetails = JSON.parse(Cookies.get("userDetails"));
        console.log("storedDatil : ", storedUserDetails);
        setUserDetails(storedUserDetails);
      }
      // setLoading(false);
    };

    fetchData();
  }, []);

  // handling user route like if logged in no need to show login page else show login page
  if (userDeatils != null && requiredRole === "user") {
    // create a access - denied page for this..
    console.log("userDetails are : ", userDeatils);
    return <Navigate to="/" />;
  }

  // handling adming routes here
  if (requiredRole === "admin") {
    if (userDeatils !== null && userDeatils.role == "admin") {
      return children;
    } else {
      return (
        <>
          <h1>
            Your Not Authorised to use this route :: #Login as Admin First
          </h1>
        </>
      );
    }
  }

  return children;
};

export default PrivateRoutes;
