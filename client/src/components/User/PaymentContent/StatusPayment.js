import React, { useEffect, useState } from "react";
import "./StatusPayment.scss";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  resetOrderId,
  resetTotalAmount,
  setPaymentStatus,
} from "../../../redux/action/orderActions";
import { clearCart } from "../../../redux/action/cartActions";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import axios from "axios";
import { sendEmailConfirmOrders } from "../../../service/APIService";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const StatusPayment = ({
  idOrder,
  paymentStatus,
  fullName,
  phone,
  email,
  setOpen,
  open,
  products,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingAddress = localStorage.getItem("shippingAddress") || "";
  const { price } = useSelector((state) => state.orderRedux);
  const [emailSent, setEmailSent] = useState(false);
  const note = localStorage.getItem("note") || "";
  const paymentMethod = Number(localStorage.getItem("paymentMethod")) || 1;

  useEffect(() => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => {
      dispatch(resetOrderId());
    };
  }, [dispatch, setOpen]);

  useEffect(() => {
    if (paymentStatus === "success" && !emailSent) {
      handleSendEmail_PDF();
      setEmailSent(true);
    }
  }, [paymentStatus, emailSent]);

  //send email
  const handleSendEmail_PDF = async () => {
    if (products && products.length > 0) {
      dispatch(clearCart());

      try {
        const imageUrls = products.map(
          (product) => product.images[0].thumbnail
        );
        const imageFiles = await Promise.all(
          imageUrls.map(async (url) => {
            const response = await axios.get(url, { responseType: "blob" });
            return new File([response.data], url.split("/").pop(), {
              type: response.data.type,
            });
          })
        );

        const formData = new FormData();
        formData.append("email", email);
        formData.append("orderId", idOrder);
        formData.append("fullName", fullName);
        formData.append("phone", phone);
        formData.append("shippingAddress", shippingAddress);
        formData.append("price", price);

        imageFiles.forEach((file) => {
          formData.append("productImages", file);
        });

        await sendEmailConfirmOrders(formData);

        // export PDF
        const imageUrlsPDF = products.map(
          (product) => product.images[0].thumbnail
        );

        const imageFilesPDF = await Promise.all(
          imageUrlsPDF.map(async (url) => {
            const response = await axios.get(url, { responseType: "blob" });
            const blob = response.data;
            const reader = new FileReader();
            return new Promise((resolve) => {
              reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
              };
              reader.readAsDataURL(blob);
            });
          })
        );

        const documentDefinition = {
          content: [
            { text: `Thông tin đơn hàng - #${idOrder}`, style: "header" },
            { text: `Họ và tên: ${fullName}`, style: "info" },
            { text: `Số điện thoại: ${phone}`, style: "info" },
            { text: `Địa chỉ nhận hàng: ${shippingAddress}`, style: "info" },
            { text: `Ghi chú: ${note}`, style: "info" },
            {
              text: `Phương thức thanh toán: ${
                paymentMethod === 1 ? "COD" : "VNPay"
              }`,
              style: "info",
            },
            {
              text: `Tổng tiền: ${price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}`,
              style: "info",
            },
            {
              text: "Hình ảnh sản phẩm, tên sản phẩm, giá và số lượng:",
              style: "subheader",
            },
            ...products.map((product, index) => {
              return {
                columns: [
                  {
                    image: imageFilesPDF[index],
                    width: 100,
                    margin: [0, 5],
                  },
                  {
                    text: product.nameProduct,
                    style: "productName",
                    margin: [10, 5, 0, 5],
                  },
                  {
                    text: `${product.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}`,
                    style: "productPrice",
                    margin: [10, 5, 0, 5],
                  },
                  {
                    text: `x${product.quantityInCart}`,
                    style: "productQuantity",
                    margin: [10, 5, 0, 5],
                  },
                ],
                columnGap: 10,
                margin: [0, 5, 0, 5],
              };
            }),
          ],
          styles: {
            header: {
              fontSize: 20,
              bold: true,
              margin: [0, 0, 0, 10],
            },
            info: {
              fontSize: 13,
              margin: [0, 5, 0, 5],
            },
            subheader: {
              fontSize: 13,
              bold: true,
              margin: [0, 10, 0, 5],
            },
            productName: {
              fontSize: 12,
              margin: [0, 5, 0, 5],
            },
            productPrice: {
              fontSize: 12,
              margin: [0, 5, 0, 5],
              bold: true,
            },
            productQuantity: {
              fontSize: 12,
              margin: [0, 5, 0, 5],
            },
          },
        };

        pdfMake
          .createPdf(documentDefinition)
          .download(`order#${idOrder}_GEARVN.pdf`);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
  };

  return (
    <>
      {paymentStatus === "success" && open === false ? (
        <div className="status-payment">
          <div className="status-message">
            <BsFillCartCheckFill
              style={{
                fontSize: "25px",
                color: "#4caf50",
                marginRight: "10px",
              }}
            />
            <div className="message">ĐẶT HÀNG THÀNH CÔNG</div>
          </div>
          <p>
            Cảm ơn quý khách đã cho GEARVN có cơ hội được phục vụ.{" "}
            <span>Vui lòng kiểm tra email để xem thông tin đơn hàng!</span>
          </p>
          <div className="order-details">
            <div className="order-header">
              <span>ĐƠN HÀNG #{idOrder}</span>
              <a href="#">Quản lý đơn hàng</a>
            </div>
            <div className="order-info">
              <div className="bg-info-order">
                <span>Khách hàng:</span>
                <span>{fullName}</span>
              </div>

              <div className="bg-info-order">
                <span>Số điện thoại:</span>
                <span>{phone}</span>
              </div>

              <div className="bg-info-order">
                <span>Email:</span>
                <span>{email}</span>
              </div>

              <div className="bg-info-order">
                <span>Giao đến:</span>
                <span>{shippingAddress}</span>
              </div>

              <div className="bg-info-order">
                <span>Tổng tiền:</span>
                <span className="total-amount">
                  {price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="actions">
            <button className="chat-button">Chat với GEARVN</button>
            <button className="continue-button">Tiếp tục mua hàng</button>
          </div>
        </div>
      ) : paymentStatus === "failed" && open === false ? (
        <div className="status-payment">
          <div className="status-message-error">
            <MdError
              style={{
                fontSize: "25px",
                color: "#f44336",
                marginRight: "10px",
              }}
            />
            <div className="message-error">THANH TOÁN THẤT BẠI</div>
          </div>
          <p>
            Giao dịch không thành công. Vui lòng thử lại hoặc liên hệ với hỗ trợ
            khách hàng.
          </p>

          <div className="order-details">
            <div className="order-header">
              <span>ĐƠN HÀNG #{idOrder}</span>
              <a href="#">Quản lý đơn hàng</a>
            </div>
            <div className="order-info">
              <div className="bg-info-order">
                <span>Khách hàng:</span>
                <span>{fullName}</span>
              </div>

              <div className="bg-info-order">
                <span>Số điện thoại:</span>
                <span>{phone}</span>
              </div>

              <div className="bg-info-order">
                <span>Email:</span>
                <span>{email}</span>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="chat-button">Chat với GEARVN</button>
            <button className="continue-button">Tiếp tục mua hàng</button>
          </div>
        </div>
      ) : (
        <div className="pending">Đang xử lý đơn hàng...</div>
      )}
    </>
  );
};

export default StatusPayment;
