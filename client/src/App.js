// import "./App.scss";
// import Header from "./components/Header/Header";
// import { Route, Link, Routes, Outlet, useLocation } from "react-router-dom";

// const App = () => {
//   return (
//     <div className="app-container">
//       <div className="header-container">
//         <Header />
//       </div>
//       <div className="main-container"></div>
//       <div className="sidenav-container"></div>

//       <div className="app-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default App;
import React from "react";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useState, CSSProperties, useEffect } from "react";
import FadeLoader from "react-spinners/ClipLoader";
import { ThreeDots } from "react-loader-spinner";

const App = () => {
  const location = useLocation();
  const excludeFooter = ["/login", "/register"].includes(location.pathname);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {loading ? (
        <div className="bg-loading-web">
          <ThreeDots
            visible={true}
            height="100"
            width="100"
            color="#ec001c"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="app-container">
          <div className="header-container">
            <Header />
          </div>
          <div className="main-container">
            {/* <div className="app-content"> */}
            <Outlet />
            {/* </div> */}
          </div>

          {!excludeFooter && (
            <div className="footer-container">
              <Footer />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;
