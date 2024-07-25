import React, { useEffect, useState } from "react";
import "./ManageUser.scss";
import ModalCRUDUser from "../Modal/ModalCRUDUser";
import { getListUser } from "../../../service/APIService";
import TableUserList from "../Modal/TableUserList";
const ManageUser = ({ toast }) => {
  const [listUser, setListUser] = useState();

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
            <ModalCRUDUser toast={toast} />
          </div>

          <div className="table-product">
            <TableUserList fetchListUser={fetchListUser} listUser={listUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUser;
