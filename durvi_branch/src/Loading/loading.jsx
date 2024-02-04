import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

function Loading() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../animations/loading1.json"),
    });
  }, []);

  return (
    <div>
      <h1 className="text-center" style={{ marginTop: "10px" }}>
        Loading.....
      </h1>

      <div ref={container}></div>
    </div>
  );
}

export default Loading;
