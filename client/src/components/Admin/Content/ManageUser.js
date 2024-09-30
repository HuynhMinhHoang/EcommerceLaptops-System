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
  useEffect(() => {
    fetchListUser();
  }, []);

  const fetchListUser = async () => {
    const res = await getListUser();
    if (res && res.status === 200) {
      setListUser(res.data.reverse());
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
            />
          </div>

          <div className="table-product">
            <TableUserList
              fetchListUser={fetchListUser}
              listUser={listUser}
              setUpdateUser={setUpdateUser}
              setIsUpdate={setIsUpdate}
            />
          </div>
        </div>
      </div>
      <Toast ref={toast} position="bottom-right" />
    </>
  );
};

export default ManageUser;
