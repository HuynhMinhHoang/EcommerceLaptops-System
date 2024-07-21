import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import "./TableProductList.scss";
import { Button } from "primereact/button";

const TableProductList = ({
  toast,
  fetchListProducts,
  listProducts,
  setEditProduct,
}) => {
  useEffect(() => {
    fetchListProducts();
  }, []);

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

  const actionBodyTemplate = (product) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pen-to-square"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => setEditProduct(product)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          // onClick={() => onDeleteProduct(product)}
        />
      </div>
    );
  };

  // const onEditProduct = (product) => {
  //   toast.current.show({
  //     severity: "info",
  //     summary: "Edit Product",
  //     detail: `Editing product: ${product.nameProduct}`,
  //   });
  // };

  // const onDeleteProduct = (product) => {
  //   toast.current.show({
  //     severity: "warn",
  //     summary: "Delete Product",
  //     detail: `Deleting product: ${product.nameProduct}`,
  //   });
  // };

  const footer = `In total there are ${
    listProducts ? listProducts.length : 0
  } products.`;

  return (
    <div className="card">
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
