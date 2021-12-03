import React, { useState, useEffect } from "react";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "./PageLoader.css";

export const PageLoader = (props) => {
  const [loaded, setLoaded] = useState(props.loaded);

  useEffect(() => {
    setLoaded(props.loaded);
  }, [props]);

  return (
    <div className={` ${loaded ? "disabled-container" : "enabled-container"}`}>
      <div
        className='loader'
        style={loaded ? { display: "block" } : { display: "none" }}>
        <Loader type='Audio' color='#CB0C9F' height={80} width={80} />
      </div>
    </div>
  );
};
