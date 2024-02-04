import '../App.css';
const Loading =()=>
<div className="loading">
  <div></div>
  <div></div>
</div>  

// import React, { useEffect, useRef } from "react";
// import lottie from "lottie-web";

// function Loading1() {
//   const container = useRef(null);

//   useEffect(() => {
//     lottie.loadAnimation({
//       container: container.current,
//       renderer: "svg",
//       loop: true,
//       autoplay: true,
//       animationData: require("../animations/loading1.json"),
//     });
//   }, []);

//   return (
//     <div>
//       <div style={{ marginTop: "-70px" }} ref={container}></div>
//     </div>
//   );
// }

export default Loading;
