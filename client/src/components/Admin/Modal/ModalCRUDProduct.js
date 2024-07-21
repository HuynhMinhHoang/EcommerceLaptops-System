import React, { useEffect, useState } from "react";
import "./ModalCRUDProduct.scss";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { MdAttachMoney } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { MdOutlineDescription } from "react-icons/md";
import { InputSwitch } from "primereact/inputswitch";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Dropdown } from "primereact/dropdown";
import { BiCategory } from "react-icons/bi";
import { Button } from "primereact/button";
import { createProduct, getListCategory } from "../../../service/APIService";
import { ProgressSpinner } from "primereact/progressspinner";

const ModalCRUDProduct = ({ toast, fetchListProducts, editProduct }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [listCategory, setListCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchListCategory();
  }, []);

  useEffect(() => {
    fetchDataInputEdit();
  }, [editProduct]);

  const onFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size <= 1048576); 
    const invalidFiles = files.filter((file) => file.size > 1048576);
  
    if (invalidFiles.length > 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Files larger than 1MB are not allowed!",
      });
    }
  
    setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };
  

  const removeImage = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const formatFileSize = (size) => {
    if (size < 1024) {
      return size + " B";
    } else if (size < 1048576) {
      return (size / 1024).toFixed(2) + " KB";
    } else {
      return (size / 1048576).toFixed(2) + " MB";
    }
  };

  const handleCreateProduct = async () => {
    if (!productName) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Product name cannot be empty!",
      });
      return;
    }
    if (price <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Price cannot be empty!",
      });
      return;
    }
    if (!description) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Description cannot be empty!",
      });
      return;
    }
    if (quantity <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Minimum quantity is 1!",
      });
      return;
    }
    if (!selectedCategory) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Category must be selected!",
      });
      return;
    }
    if (uploadedFiles.length === 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "At least one file must be uploaded!",
      });

      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("categoryId", selectedCategory.idCategory);
    formData.append("status", status);
    uploadedFiles.forEach((file, index) => {
      formData.append(`imageUrls[${index}]`, file);
    });

    try {
      const res = await createProduct(formData);
      console.log(res);
      if (res && res.data.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: res.data.message,
        });
        fetchListProducts();
        resetInput();
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error creating product!",
      });
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchListCategory = async () => {
    try {
      const res = await getListCategory();
      if (res && res.status === 200) {
        setListCategory(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching list category:", error);
    }
  };

  const resetInput = () => {
    setProductName("");
    setPrice(0);
    setDescription("");
    setStatus(false);
    setQuantity(0);
    setSelectedCategory(null);
    setUploadedFiles([]);
  };

  const fetchDataInputEdit = () => {
    if (editProduct) {
      setProductName(editProduct.nameProduct || "");
      setPrice(editProduct.price || 0);
      setDescription(editProduct.description || "");
      setStatus(editProduct.status || false);
      setQuantity(editProduct.quantity || 0);
      setSelectedCategory(
        listCategory.find(
          (c) => c.idCategory === editProduct.category.idCategory
        ) || null
      );
      if (editProduct.images && editProduct.images.length > 0) {
        const files = editProduct.images.map((img) => {
          return {
            name: editProduct.nameProduct,
            size: 0,
            url: img.thumbnail,
          };
        });
        console.log("files Product", files);

        setUploadedFiles(files);
      }
    }
  };

  return (
    <>
      <div className="form-product-container">
        <div className="form-input">
          <div className="title">ManageProduct</div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <HiOutlinePencil style={{ fontSize: "20px" }} />
            </span>
            <InputText
              placeholder="Name Product"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <MdAttachMoney style={{ fontSize: "20px" }} />
            </span>
            <InputNumber
              placeholder="Price"
              value={price}
              onValueChange={(e) => setPrice(e.value)}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <MdOutlineDescription style={{ fontSize: "20px" }} />
            </span>
            <InputText
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <MdOutlineProductionQuantityLimits style={{ fontSize: "20px" }} />
            </span>
            <InputNumber
              inputId="withoutgrouping"
              value={quantity}
              onValueChange={(e) => setQuantity(e.value)}
              useGrouping={false}
            />
          </div>

          <div className="p-inputgroup flex-1 select-category">
            <span className="p-inputgroup-addon">
              <BiCategory style={{ fontSize: "20px" }} />
            </span>
            <Dropdown
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.value)}
              options={listCategory}
              optionLabel="nameCategory"
              optionValue="idCategory"
              placeholder="Select Category"
              className="w-full md:w-14rem"
            />
          </div>

          <div className="p-inputgroup flex-1 switch">
            <span className="p-inputgroup-addon">Status</span>
            <InputSwitch
              checked={status}
              onChange={(e) => setStatus(e.value)}
            />
          </div>

          <div className="bg-upload">
            <div className="bg-input-upload">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={onFileSelect}
                style={{ display: "none" }}
              />
              <label htmlFor="file-upload" className="custom-img-btn">
                <i className="pi pi-fw pi-images icon-up"></i>
              </label>
            </div>
            <div className="preview">
              {uploadedFiles.length === 0 ? (
                <p>Please choose product photo!</p>
              ) : (
                uploadedFiles.map((file, index) => (
                  <div className="preview-image" key={index}>
                    <div className="bg-img">
                      <img
                        src={file.url || URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                      />
                    </div>

                    <div className="bg-name">{file.name}</div>

                    {file.size > 0 && (
                      <div className="bg-size">{formatFileSize(file.size)}</div>
                    )}

                    <div className="bg-cancel">
                      <span onClick={() => removeImage(index)}>
                        <i className="pi pi-fw pi-times" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-inputgroup flex-1 btn-save">
            {loading === true ? (
              <ProgressSpinner
                style={{ width: "45px", height: "45px" }}
                strokeWidth="8"
                animationDuration=".5s"
                className="custom-spinner"
              />
            ) : (
              <Button
                label={editProduct ? "Save change" : "Create Product"}
                icon={editProduct ? "pi pi-save" : "pi pi-check"}
                className={editProduct ? "button-save" : "button-create"}
                onClick={handleCreateProduct}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCRUDProduct;
