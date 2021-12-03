import React from "react";

import rotateImage from "../assets/img/favicon.png";

export default (props) => {
  const { show } = props;

  return (
    <div
      className={`preloader bg-soft flex-column justify-content-center align-items-center ${
        show ? "" : "show"
      }`}>
      <img
        className='loader-element animate__animated animate__jackInTheBox'
        src={rotateImage}
        height={40}
      />
    </div>
  );
};
