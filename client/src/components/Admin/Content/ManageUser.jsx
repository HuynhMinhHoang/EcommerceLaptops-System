import React, { useEffect, useRef, useState } from "react";
import "./ManageUser.scss";
import ModalCRUDUser from "../Modal/ModalCRUDUser";
import { getListUser } from "../../../service/APIService";
import TableUserList from "../Modal/TableUserList";
import { Toast } from "primereact/toast";

const ManageUser = () => {
  const toast = useRef(null);

  const [listUser, setListUser] = useState();
  const [updateUser, setUpdateUser] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchListUser(page, size);
  }, [page, size]);

  const fetchListUser = async (page, size) => {
    const res = await getListUser(page, size);
    console.log("res", res);
    if (res && res.status === 200) {
      setListUser(res.data.content);
      setTotalItems(res.data.totalElements);
    } else {
      console.log("Error fetching users!");
    }
  };

  return (
    <>
      <div>
        <div className="crud-user-container">
          <div className="form-product">
            <ModalCRUDUser
              toast={toast}
              setUpdateUser={setUpdateUser}
              updateUser={updateUser}
              fetchListUser={fetchListUser}
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
              page={page}
              size={size}
            />
          </div>

          <div className="table-product">
            <TableUserList
              fetchListUser={fetchListUser}
              listUser={listUser}
              setUpdateUser={setUpdateUser}
              setIsUpdate={setIsUpdate}
              page={page}
              setPage={setPage}
              size={size}
              setSize={setSize}
              totalItems={totalItems}
            />
          </div>
        </div>
      </div>
      <Toast ref={toast} position="bottom-right" />
    </>
  );
};

export default ManageUser;
