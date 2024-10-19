import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Line, Pie } from "react-chartjs-2";
import {
  getStatsStatuUser,
  getStatsUserByYear,
} from "../../../service/APIService";
import "./StatsUserAdmin.scss";

const StatsUserAdmin = ({ year }) => {
  const [listStatsUser, setListStatsUser] = useState(null);
  const [listStatsStatusUser, setListStatsStatusUser] = useState(null);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fetchStatsData = async () => {
    try {
      const [userStatsRes, statusStatsRes] = await Promise.all([
        getStatsUserByYear(year),
        getStatsStatuUser(year),
      ]);
      setListStatsUser(userStatsRes.data);
      setListStatsStatusUser(statusStatsRes.data);
    } catch (error) {
      console.error("Error fetching stats data", error);
    }
  };

  useEffect(() => {
    fetchStatsData();
  }, [year]);

  // chart bar
  const dataset = listStatsUser
    ? Object.entries(listStatsUser).map(([key, value]) => ({
        month: monthNames[key - 1],
        users: value || 0,
      }))
    : [];

  // chart pie
  const pieData = listStatsStatusUser && {
    labels: ["INACTIVE", "ACTIVE"],
    datasets: [
      {
        label: "Total User",
        data: [
          listStatsStatusUser.countInactive,
          listStatsStatusUser.countActive,
        ],
        backgroundColor: ["#e30019", "#0083db"],
        hoverOffset: 4,
      },
    ],
  };

  // chart line
  const lineData = {
    labels: monthNames,
    datasets: [
      {
        label: "User Activity",
        data: listStatsUser ? Object.values(listStatsUser) : Array(12).fill(0),
        fill: false,
        borderColor: "#e30019",
      },
    ],
  };

  const lineConfig = {
    type: "line",
    data: lineData,
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },
      scales: {
        y: {
          min: 0,
          max: 20,
        },
      },
    },
  };

  return (
    <>
      <div className="bg-stats-user">
        {/* chart bar */}
        <div style={{ width: "75%" }}>
          <BarChart
            dataset={dataset}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "month",
                tickPlacement: "middle",
                tickLabelPlacement: "middle",
              },
            ]}
            yAxis={[
              {
                max: 20,
              },
            ]}
            series={[
              {
                dataKey: "users",
                label: `Total Users created accounts in ${year}`,
                color: "#e30019",
              },
            ]}
            height={500}
          />
        </div>
        {/* chart pie */}
        <div style={{ width: "25%" }}>
          {pieData && (
            <Pie
              data={pieData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "User Status Distribution",
                  },
                },
              }}
            />
          )}
        </div>
      </div>
      {/* chart line */}
      <div style={{ width: "90%", margin: "auto", marginTop: "20px" }}>
        <Line data={lineData} options={lineConfig.options} />
      </div>
    </>
  );
};

export default StatsUserAdmin;
