import React , {useEffect} from "react";

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional, adds smooth scrolling
    });
  }, []);
  return <></>;
}

export default ScrollToTop;
