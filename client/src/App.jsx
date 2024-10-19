import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { path } from "./utils/Constants";
import GoToTop from "./components/Header/GoToTop";

const App = ({ toast }) => {
  const location = useLocation();
  const excludeFooter = [
    `${path.HOMEPAGE}/${path.LOGIN}`,
    `${path.HOMEPAGE}/${path.REGISTER}`,
  ].includes(location.pathname);
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
            <Header toast={toast} />
          </div>
          <div className="main-container">
            <Outlet />
            <GoToTop />
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

// function App() {
//   return (
//     <div>
//       <h1>Hello Vite + React!</h1>
//     </div>
//   );
// }

// export default App;
