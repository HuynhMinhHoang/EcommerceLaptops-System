import React, { useState } from "react";
import "./ManageProduct.scss";
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
import { FileUpload } from "primereact/fileupload";
import { FaRegImages } from "react-icons/fa6";
import { createProduct } from "../../../service/APIService";
const ManageProduct = ({ toast }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [quantity, setQuantity] = useState(100);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
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

  const onSubmit = async () => {
    const formData = new FormData();

    formData.append("name", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("categoryId", selectedCategory.id);
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
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error creating product!",
      });
      console.error("Error creating product:", error);
    }
  };
//   console.log("Product Data", selectedCategory.id);

  const category = [
    { name: "New York", id: "1" },
    { name: "Rome", id: "2" },
    { name: "London", id: "3" },
    { name: "Istanbul", id: "4" },
    { name: "Paris", id: "5" },
  ];

  return (
    <>
      <div className="form-product-container">
        <div className="form-input">
          <div className="title">ManageProduct</div>
          {/* <label>Username</label> */}

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
              options={category}
              optionLabel="name"
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
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                      />
                    </div>

                    <div className="bg-name">{file.name}</div>

                    <div className="bg-size">{formatFileSize(file.size)}</div>

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
            <Button label="Save change" icon="pi pi-check" onClick={onSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageProduct;
