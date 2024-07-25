import { useEffect, useState, useRef } from "react";
import "./ModalCRUDUser.scss";
import "sweetalert2/src/sweetalert2.scss";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { FiUser } from "react-icons/fi";
import { LuMail } from "react-icons/lu";
import { Calendar } from "primereact/calendar";
import { PiGenderIntersexBold } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import { ProgressSpinner } from "primereact/progressspinner";

const ModalCRUDUser = ({ toast }) => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const genders = [
    { name: "MALE", code: "MALE" },
    { name: "FEMALE", code: "FEMALE" },
    { name: "OTHER", code: "OTHER" },
  ];

  const onFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1048576) {
      setUploadedFile(file);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Files larger than 1MB are not allowed!",
      });
    }
  };

  const removeImage = () => {
    setUploadedFile(null);
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

  return (
    <>
      <div className="form-user-container">
        <div className="form-input">
          <div className="title">Manage Users</div>

          <div className="bg-row-1">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <MdDriveFileRenameOutline style={{ fontSize: "20px" }} />
              </span>
              <span className="p-float-label">
                <InputText
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <label htmlFor="fullName">Full Name</label>
              </span>
            </div>

            <div className="p-inputgroup flex-1 custom-margin">
              <span className="p-inputgroup-addon">
                <PiGenderIntersexBold style={{ fontSize: "20px" }} />
              </span>
              <span className="p-float-label">
                <Dropdown
                  inputId="gender"
                  value={gender}
                  onChange={(e) => setGender(e.value)}
                  options={genders}
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Selected gender"
                  className="w-full md:w-14rem"
                />
                <label htmlFor="gender">Gender</label>
              </span>
            </div>

            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <LuCalendarDays style={{ fontSize: "20px" }} />
              </span>
              <span className="p-float-label">
                <Calendar
                  inputId="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.value)}
                  dateFormat="dd/mm/yy"
                />
                <label htmlFor="dateOfBirth">Date of Birth</label>
              </span>
            </div>
          </div>

          <div className="bg-row-1">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <LuMail style={{ fontSize: "20px" }} />
              </span>
              <span className="p-float-label">
                <InputText
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </span>
            </div>

            <div className="p-inputgroup flex-1 custom-margin">
              <span className="p-inputgroup-addon">
                <FiUser style={{ fontSize: "20px" }} />
              </span>
              <span className="p-float-label">
                <InputText
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username">Username</label>
              </span>
            </div>

            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <MdOutlinePassword style={{ fontSize: "20px" }} />
              </span>
              <span className="p-float-label">
                <InputText
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </span>
            </div>
          </div>

          <div className="bg-row-1">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <FiPhone style={{ fontSize: "20px" }} />
              </span>
              <span className="p-float-label">
                <InputText
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="phone">Phone Number</label>
              </span>
            </div>

            <div className="p-inputgroup flex-1 custom-margin">
              <span className="p-inputgroup-addon">
                <MdOutlineLocationOn style={{ fontSize: "20px" }} />
              </span>
              <span className="p-float-label">
                <InputText
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor="address">Address</label>
              </span>
            </div>

            <div className="p-inputgroup flex-1 switch">
              <span className="p-inputgroup-addon">Status</span>
              <InputSwitch
                className="custom-inputswitch"
                checked={status}
                onChange={(e) => setStatus(e.value)}
              />
            </div>
          </div>

          <div className="bg-upload">
            <div className="bg-input-upload">
              <input
                type="file"
                id="file-upload"
                onChange={onFileSelect}
                style={{ display: "none" }}
              />
              <label htmlFor="file-upload" className="custom-img-btn">
                <i className="pi pi-fw pi-images icon-up"></i>
              </label>
            </div>
            <div className="preview">
              {!uploadedFile ? (
                <p>Please choose a representative photo!</p>
              ) : (
                <div className="preview-image">
                  <div className="bg-img">
                    <img
                      src={
                        uploadedFile.url || URL.createObjectURL(uploadedFile)
                      }
                      alt="Preview"
                    />
                  </div>
                  {uploadedFile.size > 0 && (
                    <div className="bg-size">
                      {formatFileSize(uploadedFile.size)}
                    </div>
                  )}
                  <div className="bg-cancel" onClick={removeImage}>
                    <span>
                      <i className="pi pi-fw pi-times" />
                    </span>
                  </div>
                </div>
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
                // label={editProduct ? "Save change" : "Create Product"}
                // icon={editProduct ? "pi pi-save" : "pi pi-check"}
                // className={editProduct ? "button-save" : "button-create"}
                // onClick={editProduct ? handleFullUpdate : handleCreateProduct}

                label="Create User"
                icon="pi pi-check"
                className="button-create"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCRUDUser;
