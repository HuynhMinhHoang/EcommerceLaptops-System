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
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchListProducts(page, size);
  }, [page, size]);

  const fetchListProducts = async () => {
    const res = await getListProductAdmin(page, size);
    if (res && res.status === 200) {
      setListProducts(res.data.content);
      setTotalItems(res.data.totalElements);
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
              page={page}
              size={size}
            />
          </div>

          <div className="table-product">
            <TableProductList
              toast={toast}
              listProducts={listProducts}
              fetchListProducts={fetchListProducts}
              setEditProduct={setEditProduct}
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

export default ManageProduct;
