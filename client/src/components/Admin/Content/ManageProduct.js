import React, { useEffect, useRef, useState } from "react";
import "./ManageProduct.scss";
import ModalCRUDProduct from "../Modal/ModalCRUDProduct";
import TableProductList from "../Modal/TableProductList";
import { getListProductAdmin } from "../../../service/APIService";
import { Toast } from "primereact/toast";

const ManageProduct = () => {
  const toast = useRef(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const [editProduct, setEditProduct] = useState();

  useEffect(() => {
    fetchListProducts();
  }, []);

  const fetchListProducts = async () => {
    const res = await getListProductAdmin();
    if (res && res.data.status === 200) {
      setListProducts(res.data.data.reverse());
    } else {
      console.log("Error fetching products!");
    }
  };
  return (
    <>
      <div>
        <div className="crud-product-container">
          <div className="form-product">
            <ModalCRUDProduct
              toast={toast}
              fetchListProducts={fetchListProducts}
              editProduct={editProduct}
              setEditProduct={setEditProduct}
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
            />
          </div>

          <div className="table-product">
            <TableProductList
              toast={toast}
              listProducts={listProducts}
              fetchListProducts={fetchListProducts}
              setEditProduct={setEditProduct}
              setIsUpdate={setIsUpdate}
            />
          </div>
        </div>
      </div>
      <Toast ref={toast} position="bottom-right" />
    </>
  );
};

export default ManageProduct;
