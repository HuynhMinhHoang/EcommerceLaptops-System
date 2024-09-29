import React, { useEffect, useRef, useState } from "react";
// import Languages from "../../Header/Languages";
import NavDropdown from "react-bootstrap/NavDropdown";
import { toast } from "react-toastify";
import { FcBusinessman } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../../../services/APIService";
import { doLogout } from "../../../redux/action/userAction";
import Swal from "sweetalert2";
import "./DashBoard.scss";
import Chart from "chart.js/auto";
// import { statsDashBoard } from "../../../services/APIService";

import ImgUser from "../../../assets/user.png";
import ImgQuizz from "../../../assets/quizz.png";
import ImgQuestion from "../../../assets/question.png";
import ImgAnswer from "../../../assets/answer.png";
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/Constants";

const DashBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userRedux.user);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [listStats, setListStats] = useState(null);
  const chartRef = useRef(null);
  const doughnutChartRef = useRef(null);

  //   const fetchListStats = async () => {
  //     try {
  //       let res = await statsDashBoard();
  //       console.log("<<<<", res.DT.others);
  //       setListStats(res.DT);
  //     } catch (error) {
  //       console.log("Error fetching stats:", error);
  //     }
  //   };

  useEffect(() => {
    // fetchListStats();
  }, []);

  useEffect(() => {
    let barChartInstance = null;
    let doughnutChartInstance = null;

    if (listStats) {
      const barLabels = ["Quizzes", "Questions", "Answers"];
      const barData = {
        labels: barLabels,
        datasets: [
          {
            label: "Stats Bar Systems",
            data: [
              listStats?.others?.countQuiz ?? 0,
              listStats?.others?.countQuestions ?? 0,
              listStats?.others?.countAnswers ?? 0,
            ],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: [
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(255, 99, 132)",
            ],
            borderWidth: 1,
          },
        ],
      };

      const barConfig = {
        type: "bar",
        data: barData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      const doughnutLabels = ["Quizzes", "Questions", "Answers"];
      const doughnutData = {
        labels: doughnutLabels,
        datasets: [
          {
            label: "Stats Doughnut Systems ",
            data: [
              listStats?.others?.countQuiz ?? 0,
              listStats?.others?.countQuestions ?? 0,
              listStats?.others?.countAnswers ?? 0,
            ],
            backgroundColor: [
              "rgba(173, 216, 230, 0.8)",
              "rgba(192, 192, 192, 0.8)",
              "rgba(144, 238, 144, 0.8)",
            ],
            hoverOffset: 4,
          },
        ],
      };

      const doughnutConfig = {
        type: "doughnut",
        data: doughnutData,
      };

      if (chartRef.current) {
        barChartInstance = new Chart(chartRef.current, barConfig);
      }

      if (doughnutChartRef.current) {
        doughnutChartInstance = new Chart(
          doughnutChartRef.current,
          doughnutConfig
        );
      }
    }

    return () => {
      if (barChartInstance) {
        barChartInstance.destroy();
      }
      if (doughnutChartInstance) {
        doughnutChartInstance.destroy();
      }
    };
  }, [listStats]);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(doLogout());
      setLoading(false);
      navigate(`${path.HOMEPAGE}/${path.LOGIN}`, { replace: true });
    }, 1000);
  };

  const showAlertLogout = () => {
    Swal.fire({
      title: "Bạn muốn thoát tài khoản?",
      showDenyButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: "warning",
      confirmButtonText: "Đồng ý",
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  return (
    <>
      <div className="dash-container">
        <div className="bg-item">
          {/* <Languages /> */}

          <NavDropdown title="Setting" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <FcBusinessman className="settings-icon" />
              <p>{user.fullName}</p>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={showAlertLogout}>
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>

      <div className="content-container">
        <div className="page-heading">Profile Statistics</div>

        <div className="page-content">
          <div className="page-content-left">
            <div className="bg-item-header">
              <div className="bg-item1">
                <div className="bg-avt user">
                  <img src={ImgUser} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Total Users</p>
                  <p>
                    {listStats?.users?.total !== undefined
                      ? listStats.users.total
                      : 0}
                  </p>
                </div>
              </div>

              <div className="bg-item1">
                <div className="bg-avt quizz">
                  <img src={ImgQuizz} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Total Quizzes</p>
                  <p>
                    {listStats?.others?.countQuiz !== undefined
                      ? listStats.others.countQuiz
                      : 0}
                  </p>
                </div>
              </div>

              <div className="bg-item1">
                <div className="bg-avt question">
                  <img src={ImgQuestion} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Total Questions</p>
                  <p>
                    {listStats?.others?.countQuestions !== undefined
                      ? listStats.others.countQuestions
                      : 0}
                  </p>
                </div>
              </div>

              <div className="bg-item1">
                <div className="bg-avt answer">
                  <img src={ImgAnswer} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Total Answers</p>
                  <p>
                    {listStats?.others?.countAnswers !== undefined
                      ? listStats.others.countAnswers
                      : 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-chart">
              <div className="title-stats">System Statistics</div>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>

          <div className="page-content-right">
            <div className="bg-profile">
              <div className="bg-avt profile">
                <img src={user.avt} alt="avt" />
              </div>

              <div className="bg-text">
                <p>{user.fullName}</p>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="bg-chart-profile">
              <canvas ref={doughnutChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
