import { useEffect, useState, useRef } from "react";
import "./ModalCRUDUser.scss";
import "sweetalert2/src/sweetalert2.scss";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown } from "primereact/dropdown";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
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
import { getRoles } from "../../../service/APIService";
import { TbUserShield } from "react-icons/tb";
import {
  updateAccount,
  createAccountByAdmin,
} from "../../../service/APIService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Button } from "@mui/material";

const ModalCRUDUser = ({
  toast,
  updateUser,
  fetchListUser,
  isUpdate,
  setIsUpdate,
}) => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  console.log("isUpdate", isUpdate);
  const [listRoles, setListRoles] = useState("");

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const genders = [
    { name: "MALE", code: "MALE" },
    { name: "FEMALE", code: "FEMALE" },
    { name: "OTHER", code: "OTHER" },
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    fetchDataInputEdit();
  }, [updateUser]);

  const fetchRoles = async () => {
    try {
      const res = await getRoles();
      if (res && res.data.status === 200) {
        setListRoles(res.data.data);
      } else {
        throw new Error("Error fetching roles!");
      }
    } catch (e) {
      console.error("Error fetching roles:", e);
    }
  };

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

  const handleUpdateUser = async () => {
    setLoading(true);
    const formattedDateOfBirth = dateOfBirth
      ? dateOfBirth.toISOString().split("T")[0]
      : "";

    const statusValue = status ? "ACTIVE" : "INACTIVE";

    let avtFile = null;
    if (typeof uploadedFile === "string") {
      avtFile = new File([], uploadedFile);
    } else if (uploadedFile instanceof File) {
      avtFile = uploadedFile;
    }

    const idUser = updateUser.idAccount;
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    if (gender) {
      formData.append("gender", gender.code);
    }
    formData.append("dateOfBirth", formattedDateOfBirth);
    formData.append("address", address);
    formData.append("roleId", selectedRole.idRole);
    formData.append("status", statusValue);
    if (avtFile) {
      formData.append("avt", avtFile);
    }

    try {
      const res = await updateAccount(idUser, formData);
      // console.log(res);

      if (res && res.data.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: res.data.message,
        });
        fetchListUser();
        resetInputs();
        setIsUpdate(false);
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error updating user!",
      });
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const convertToDateObject = (dateStr) => {
    return dateStr ? new Date(dateStr) : null;
  };

  const fetchDataInputEdit = () => {
    if (updateUser) {
      setFullName(updateUser.fullName || "");
      const selectedGender = genders.find((g) => g.code === updateUser.gender);
      setGender(selectedGender || null);
      setDateOfBirth(convertToDateObject(updateUser.dateOfBirth));
      setEmail(updateUser.email || "");
      setUsername(updateUser.username || "");
      setPassword("*******************************************");
      setPhone(updateUser.phone || "");
      setAddress(updateUser.address || "");
      setStatus(updateUser.status === "ACTIVE" ? true : false);
      setSelectedRole(
        listRoles.find((r) => r.idRole === updateUser.role.idRole) || null
      );
      setUploadedFile({
        id: updateUser.idAccount,
        name: updateUser.fullName,
        size: 0,
        url: updateUser.avt,
      });
    }
  };

  const showAlertUpdate = () => {
    if (!uploadedFile) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Avatar cannot be empty!",
      });
      return;
    }
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: "warning",
      confirmButtonText: "Confirm",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval;

        Swal.fire({
          title: "Update user is in progress!",
          timer: 2500,
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {}, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          handleUpdateUser();
        });
      } else if (result.isDismissed) {
        toast.current.show({
          severity: "info",
          summary: "Notification",
          detail: "Update action was cancelled!",
        });
      }
    });
  };

  const resetInputs = () => {
    setFullName("");
    setGender(null);
    setDateOfBirth(null);
    setEmail("");
    setAddress("");
    setPhone("");
    setUsername("");
    setPassword("");
    setUploadedFile(null);
    setSelectedRole(null);
    setStatus(false);
  };

  const handleCreateUser = async () => {
    if (!fullName) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Full Name cannot be empty!",
      });
      return;
    }
    if (!gender) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gender cannot be empty!",
      });
      return;
    }
    if (!dateOfBirth) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Date of Birth cannot be empty!",
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Email cannot be empty!",
      });
      return false;
    } else if (!emailRegex.test(email)) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please enter email in correct format!",
      });
      return false;
    }
    if (!username) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Username cannot be empty!",
      });
      return;
    }
    if (password.length < 6 || password.length > 20) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Password must be 6 to 20 characters!",
      });
      return;
    }
    const phoneRegex = /^[0-9]{9,10}$/;
    if (!phone) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Phone Number cannot be empty!",
      });
      return;
    } else if (!phoneRegex.test(phone)) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please enter phone number in correct format!",
      });
      return false;
    }
    if (!address) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Address cannot be empty!",
      });
      return;
    }
    if (!uploadedFile) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Avatar cannot be empty!",
      });
      return;
    }
    if (!selectedRole) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Role cannot be empty!",
      });
      return;
    }

    setLoading(true);

    const formattedDateOfBirth = dateOfBirth
      ? dateOfBirth.toISOString().split("T")[0]
      : "";

    const statusValue = status === true ? "ACTIVE" : "INACTIVE";

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("gender", gender.code);
    formData.append("dateOfBirth", formattedDateOfBirth);
    formData.append("address", address);
    formData.append("roleId", selectedRole.idRole);
    formData.append("status", statusValue);
    formData.append("avt", uploadedFile);

    try {
      const res = await createAccountByAdmin(formData);
      console.log(res);
      if (res.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: res.data.message,
        });
        fetchListUser();
        resetInputs();
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: res.data.message,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
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
                  disabled={isUpdate ? true : false}
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
                  disabled={isUpdate ? true : false}
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
                  disabled={isUpdate ? true : false}
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
                  disabled={isUpdate ? true : false}
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

          <div className="bg-row-1">
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

            <div className="p-inputgroup flex-1 custom-margin custom-role">
              <span className="p-inputgroup-addon">
                <TbUserShield style={{ fontSize: "20px" }} />
              </span>
              <span className="p-float-label">
                <Dropdown
                  inputId="roles"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.value)}
                  options={listRoles}
                  optionLabel="nameRole"
                  optionValue="idRole"
                  placeholder="Selected role"
                  className="w-full md:w-14rem"
                />
                <label htmlFor="roles">Role</label>
              </span>
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
                variant="contained"
                startIcon={isUpdate ? <SaveIcon /> : <CheckIcon />}
                className={isUpdate ? "button-save" : "button-create"}
                onClick={isUpdate ? showAlertUpdate : handleCreateUser}
              >
                {isUpdate ? "Save User" : "Create User"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCRUDUser;
