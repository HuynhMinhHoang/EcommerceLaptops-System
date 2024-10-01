import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import "./TableProductList.scss";
import { Button } from "primereact/button";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { deleteProduct } from "../../../service/APIService";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TableProductList = ({
  toast,
  fetchListProducts,
  listProducts,
  setEditProduct,
  setIsUpdate,
  page,
  setPage,
  size,
  setSize,
  totalItems,
}) => {
  const handleChangePage = (event, value) => {
    setPage(value);
    fetchListProducts(value, size);
  };

  useEffect(() => {
    fetchListProducts(page, size);
  }, [page, size]);

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const imageBodyTemplate = (product) => {
    const imageSrc =
      product.images.length > 0
        ? product.images[0].thumbnail
        : "default-image-url";
    return (
      <img
        src={imageSrc}
        alt=""
        style={{
          width: "6rem",
          boxShadow:
            "0 4px 10px rgba(0, 0, 0, .03), 0 0 2px rgba(0, 0, 0, .06), 0 2px 6px rgba(0, 0, 0, .12)",
          borderRadius: "5px",
        }}
      />
    );
  };

  const priceBodyTemplate = (product) => {
    return formatCurrency(product.price);
  };

  const statusBodyTemplate = (product) => {
    return (
      <Tag
        value={product.status ? "ACTIVE" : "INACTIVE"}
        severity={product.status ? "success" : "danger"}
      />
    );
  };

  const categoryBodyTemplate = (product) => {
    return product.category ? product.category.nameCategory : "N/A";
  };

  const changeIsUpdate = (product) => {
    setIsUpdate(true);
    setEditProduct(product);
  };

  const actionBodyTemplate = (product) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pen-to-square"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => changeIsUpdate(product)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => showAlertDelete(product.idProduct)}
        />
      </div>
    );
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id);
      console.log("response", response);
      if (response && response.status === 200) {
        fetchListProducts();
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Delete Product successfully",
        });
      }
    } catch (e) {
      console.error("Error when deleting product:", e);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error when deleting product",
      });
      return;
    }
  };

  const showAlertDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete this item?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        confirmButton: "btn-delete",
        cancelButton: "btn-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval;
        Swal.fire({
          title: "Deleting the product is in progress!",
          timer: 2500,
          allowOutsideClick: false,
          allowEscapeKey: false,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {}, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          handleDeleteProduct(id);
        });
      } else if (result.isDismissed) {
        toast.current.show({
          severity: "info",
          summary: "Notification",
          detail: "Delete action was cancelled!",
        });
      }
    });
  };

  const footer = () => {
    return (
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(totalItems / size)}
          page={page}
          onChange={handleChangePage}
          shape="rounded"
        />
      </Stack>
    );
  };

  return (
    <div className="card-product">
      <DataTable
        value={listProducts}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="idProduct" header="STT"></Column>
        <Column
          field="nameProduct"
          header="Name"
          className="text-name"
        ></Column>
        <Column
          header="Image"
          body={imageBodyTemplate}
          className="bg-image"
        ></Column>
        <Column field="price" header="Price" body={priceBodyTemplate}></Column>
        <Column header="Category" body={categoryBodyTemplate}></Column>
        <Column
          field="quantity"
          header="Quantity"
          // className="text-name"
        ></Column>
        <Column header="Status" body={statusBodyTemplate}></Column>
        <Column
          header="Actions"
          body={actionBodyTemplate}
          className="bg-action"
        ></Column>
      </DataTable>
    </div>
  );
};

export default TableProductList;
