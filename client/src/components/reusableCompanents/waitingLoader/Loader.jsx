import React, { useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import successAudio from "../../../assets/soundEffects/success-sound.mp3";
import "./Loader.scss";
import { useNavigate } from "react-router-dom";

function Loader() {
  const navigate = useNavigate();
  useEffect(() => {
    // Create an Audio object with the path to your sound file
    const orderPlacedSound = new Audio(successAudio);

    // Function to play the sound
    const playOrderPlacedSound = () => {
      orderPlacedSound.play();
    };

    // Call the playOrderPlacedSound function when the component mounts (order is placed)
    playOrderPlacedSound();

    setTimeout(() => {
      navigate("/");
    }, 3000);
    // Cleanup function to pause the sound if the component unmounts
    return () => {
      orderPlacedSound.pause();
    };
  }, []);

  return (
    <>
      <section id="order-placed">
        <div>
          <h1>ODER PLACED</h1>
          <CheckIcon className="check-icon"></CheckIcon>{" "}
        </div>
      </section>
    </>
  );
}

export default Loader;
