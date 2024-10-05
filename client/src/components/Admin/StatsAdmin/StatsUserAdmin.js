import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Pie } from "react-chartjs-2";
import {
  getStatsStatuUser,
  getStatsUserByYear,
} from "../../../service/APIService";
import "./StatsUserAdmin.scss";

const StatsUserAdmin = ({ year }) => {
  const [listStatsUser, setListStatsUser] = useState(null);
  const [listStatsStatusUser, setListStatsStatusUser] = useState(null);

  const fetchStatsData = async () => {
    try {
      let userStatsRes = await getStatsUserByYear(year);
      setListStatsUser(userStatsRes.data);

      let statusStatsRes = await getStatsStatuUser(year);
      setListStatsStatusUser(statusStatsRes.data);
    } catch (error) {
      console.error("Error fetching stats data", error);
    }
  };

  useEffect(() => {
    fetchStatsData();
  }, [year]);

  const dataset = listStatsUser
    ? Object.entries(listStatsUser).map(([key, value]) => ({
        month: `Month ${key}`,
        users: value || 0,
      }))
    : [];

  const pieData = listStatsStatusUser
    ? {
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
      }
    : null;

  return (
    <>
      <div className="bg-stats-user">
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
    </>
  );
};

export default StatsUserAdmin;
