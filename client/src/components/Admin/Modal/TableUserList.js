import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import "./TableUserList.scss";
import { Button } from "primereact/button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TableUserList = ({
  toast,
  fetchListUser,
  listUser,
  setUpdateUser,
  setIsUpdate,
  page,
  setPage,
  size,
  setSize,
  totalItems,
}) => {
  const [visibleEmails, setVisibleEmails] = useState({});

  const handleChangePage = (event, value) => {
    setPage(value);
    fetchListUser(value, size);
  };

  useEffect(() => {
    fetchListUser(page, size);
  }, [page, size]);

  const toggleEmailVisibility = (userId) => {
    setVisibleEmails((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const emailBodyTemplate = (user) => {
    return (
      <div className="tb-email">
        {visibleEmails[user.idAccount] ? user.email : ""}
        <Button
          icon={visibleEmails[user.idAccount] ? "pi pi-eye-slash" : "pi pi-eye"}
          className="p-button-text p-button-plain p-ml-2"
          onClick={() => toggleEmailVisibility(user.idAccount)}
        />
      </div>
    );
  };

  const genderBodyTemplate = (user) => {
    return user.gender ? user.gender : "N/A";
  };

  const addressBodyTemplate = (rowData) => {
    return rowData.address ? rowData.address : "N/A";
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };
  const dateOfBirthBodyTemplate = (user) => {
    return formatDate(user.dateOfBirth);
  };

  const statusBodyTemplate = (user) => {
    console.log(user.status);
    return (
      <Tag
        value={user.status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
        severity={user.status === "ACTIVE" ? "success" : "danger"}
      />
    );
  };

  const changeIsUpdate = (user) => {
    setIsUpdate(true);
    setUpdateUser(user);
  };

  const actionBodyTemplate = (user) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pen-to-square"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => changeIsUpdate(user)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => handleDelete(user)}
        />
      </div>
    );
  };

  const avtBodyTemplate = (user) => {
    const imageSrc = user.avt ? user.avt : "default-image-url";
    return (
      <img
        src={imageSrc}
        alt="Avatar"
        style={{
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow:
            "0 4px 10px rgba(0, 0, 0, .03), 0 0 2px rgba(0, 0, 0, .06), 0 2px 6px rgba(0, 0, 0, .12)",
        }}
      />
    );
  };

  const roleBodyTemplate = (user) => {
    return user.role ? user.role.nameRole : "N/A";
  };

  const handleDelete = (user) => {
    toast.current.show({
      severity: "warn",
      summary: "Delete User",
      detail: `Deleting user: ${user.username}`,
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
    <div className="card-user">
      <DataTable
        value={listUser}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="idAccount" header="ID"></Column>
        <Column
          field="username"
          header="Username"
          className="text-name"
        ></Column>
        <Column header="Avatar" body={avtBodyTemplate}></Column>
        <Column field="fullName" header="Full Name"></Column>
        <Column
          field="gender"
          header="Gender"
          body={genderBodyTemplate}
        ></Column>
        <Column
          field="dateOfBirth"
          header="Date of Birth"
          body={dateOfBirthBodyTemplate}
        ></Column>
        <Column field="email" header="Email" body={emailBodyTemplate}></Column>
        <Column field="phone" header="Phone"></Column>
        <Column
          field="address"
          header="Address"
          body={addressBodyTemplate}
        ></Column>
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
        ></Column>
        <Column header="Role" body={roleBodyTemplate}></Column>
        <Column
          header="Actions"
          body={actionBodyTemplate}
          className="bg-action"
        ></Column>
      </DataTable>
    </div>
  );
};

export default TableUserList;
