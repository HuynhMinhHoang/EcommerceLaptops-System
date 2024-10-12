import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DashBoard.scss";
import Chart from "chart.js/auto";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ImgUser from "../../../assets/user.png";
import ImgProduct from "../../../assets/product.png";
import ImgOrder from "../../../assets/order.png";
import StatsUserAdmin from "../StatsAdmin/StatsUserAdmin";
import StatsProductAdmin from "../StatsAdmin/StatsProductAdmin";
import StatsOrderAdmin from "../StatsAdmin/StatsOrderAdmin";
import { getStatsUserByYear } from "../../../service/APIService";
import dayjs from "dayjs";

const DashBoard = () => {
  const currentYear = new Date().getFullYear();
  const user = useSelector((state) => state.userRedux.user);
  const [year, setYear] = useState(currentYear);
  const [activeComponentStats, setActiveComponentStats] = useState("users");

  console.log("year", year);

  const renderComponentStats = () => {
    switch (activeComponentStats) {
      case "users":
        return <StatsUserAdmin year={year} />;
      case "products":
        return <StatsProductAdmin />;
      case "orders":
        return <StatsOrderAdmin />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="content-container">
        {/* <div className="page-heading">Profile Statistics</div> */}

        <div className="page-content">
          <div className="page-content-left">
            <div className="bg-item-header">
              <div
                className="bg-item1"
                onClick={() => setActiveComponentStats("users")}
              >
                <div className="bg-avt user">
                  <img src={ImgUser} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Users</p>
                  <p>
                    {/* {listStats?.users?.total !== undefined
                      ? listStats.users.total
                      : 0} */}
                  </p>
                </div>
              </div>

              <div
                className="bg-item1"
                // onClick={() => setActiveComponentStats("products")}
              >
                <div className="bg-avt product">
                  <img src={ImgProduct} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Products</p>
                </div>
              </div>

              <div
                className="bg-item1"
                // onClick={() => setActiveComponentStats("orders")}
              >
                <div className="bg-avt order">
                  <img src={ImgOrder} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Orders</p>
                </div>
              </div>

              <div className="bg-item1 bg-item-profile">
                <div className="bg-profile">
                  <div className="bg-avt profile">
                    <img src={user.avt} alt="avt" />
                  </div>

                  <div className="bg-text">
                    <p>{user.fullName}</p>
                    <p>{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-chart">
              <div className="title-stats">Statistics System</div>

              <div className="bg-chart-date">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker", "DatePicker", "DatePicker"]}
                  >
                    <DatePicker
                      label={"Select Year"}
                      views={["year"]}
                      value={dayjs().year(year)}
                      onChange={(y) => {
                        setYear(y.$y);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              {renderComponentStats()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
