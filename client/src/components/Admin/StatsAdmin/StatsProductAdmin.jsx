import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./StatsProductAdmin.scss";
import { useState, useEffect } from "react";
import { getListAllProductStats } from "../../../service/APIService";

const StatsProductAdmin = ({ year }) => {
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    fetchListAllProductStats();
  }, [year]);

  const fetchListAllProductStats = async () => {
    const res = await getListAllProductStats(year);
    if (res && res.status === 200) {
      const productsWithStatistics = res.data.map((product) => ({
        ...product,

        statistic: (Math.random() * 100).toFixed(2),
      }));
      setListProducts(productsWithStatistics);
    }
  };

  const columns = [
    {
      field: "idProduct",
      headerName: "ID",
      width: 50,
      align: "center",
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      align: "center",
      renderCell: (params) => (
        <img
          src={params.row.images[0]?.thumbnail}
          alt={params.row.nameProduct}
          style={{
            width: "70px",
            height: "100%",
            objectFit: "cover",
            borderRadius: "5px",
            // border: "1px solid #e0e0e0",
            padding: "5px",
          }}
        />
      ),
    },
    { field: "nameProduct", headerName: "Name", width: 400, align: "left" },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      align: "center",
      valueFormatter: (params) => formatCurrency(params),
    },
    { field: "quantity", headerName: "Quantity", width: 100, align: "center" },
    {
      field: "createdAt",
      headerName: "Date Created",
      width: 200,
      align: "center",
      valueFormatter: (params) => formatDate(params),
    },
    {
      field: "statistic",
      headerName: "Statistic",
      width: 200,
      renderCell: (params) => {
        const percentage = parseFloat(params.value);
        const progressColor = getProgressColor(percentage);
        return (
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: `${percentage}%`,
                backgroundColor: progressColor,
              }}
            >
              <p>{percentage.toFixed(2)}%</p>
            </div>
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 170,

      renderCell: (params) => {
        const status = params.value ? "ACTIVE" : "INACTIVE";
        const color = params.value ? "#34c759" : "#ff3b30";
        return (
          <div
            style={{
              textAlign: "center",
              width: "100px",
              height: "32px",
              color: color,
              backgroundColor: "white",
              border: `1px solid ${color}`,
              borderRadius: "5px",
              padding: "2px 8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
          >
            <span
              style={{
                textAlign: "center",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: color,
                marginRight: "4px",
              }}
            ></span>
            {status}
          </div>
        );
      },
    },
  ];

  const getProgressColor = (percentage) => {
    if (percentage >= 70) return "#5DAB5D";
    if (percentage >= 40) return "#F1D092";
    return "#F44336";
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "";
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={listProducts}
        getRowId={(row) => row.idProduct}
        rowHeight={75}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

export default StatsProductAdmin;
