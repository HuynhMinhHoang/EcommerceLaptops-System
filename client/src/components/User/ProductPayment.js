import React, { useEffect, useState } from "react";
import "./ProductPayment.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { path } from "../../utils/Constants";
import { GrFormPrevious } from "react-icons/gr";
import { HiShoppingBag } from "react-icons/hi2";
import { FaAddressCard } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";
import { TbShieldCheckFilled } from "react-icons/tb";
import qc1 from "../../assets/qc1.png";
import qc2 from "../../assets/qc2.png";
import ProductInCart from "./PaymentContent/ProductInCart";
import { useDispatch, useSelector } from "react-redux";
import OrderInformation from "./PaymentContent/OrderInformation";
import ConfirmInformation from "./PaymentContent/ConfirmInformation";
import StatusPayment from "./PaymentContent/StatusPayment";
import {
  resetStatePayment,
  resetTotalAmount,
  setTotalAmount,
} from "../../redux/action/orderActions";
import { Backdrop, Button, CircularProgress } from "@mui/material";

const ProductPayment = ({ toast }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userRedux.user);
  const [open, setOpen] = React.useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [phone, setPhone] = useState(user.phone);
  const [shippingAddress, setShippingAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(1);

  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const stepFromURL = parseInt(
    new URLSearchParams(location.search).get("step")
  );
  const products = useSelector((state) => state.cartRedux.products) || [];
  // console.log("products", products);
  const getCurrentStep = () => {
    if (stepFromURL >= 1 && stepFromURL <= 4) {
      if (products.length === 0 && stepFromURL !== 4) {
        return 1;
      }
      return stepFromURL;
    }
    return 1;
  };

  const [currentStep, setCurrentStep] = useState(getCurrentStep);
  const { paymentStatus } = useSelector((state) => state.orderRedux);
  const { idOrder } = useSelector((state) => state.orderRedux);

  const isAuthenticated = useSelector(
    (state) => state.userRedux.isAuthenticated
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentStep]);

  useEffect(() => {
    if (!isAuthenticated) {
      // toast.current.show({
      //   severity: "info",
      //   summary: "Thông báo",
      //   detail: "Vui lòng đăng nhập để thực hiện thanh toán!",
      // });
      setCurrentStep(1);
      navigate(`${path.PRODUCT_PAYMENT}?step=1`, { replace: true });
    } else if (products.length === 0 && currentStep !== 4) {
      setCurrentStep(1);
      navigate(`${path.PRODUCT_PAYMENT}?step=1`, { replace: true });
    } else if (paymentStatus === "pending" && currentStep === 4) {
      setCurrentStep(1);
      navigate(`${path.PRODUCT_PAYMENT}?step=1`, { replace: true });
    } else {
      navigate(`${path.PRODUCT_PAYMENT}?step=${currentStep}`, {
        replace: true,
      });
    }
  }, [currentStep, navigate, products, paymentStatus]);

  useEffect(() => {
    navigate(`${path.PRODUCT_PAYMENT}?step=${currentStep}`, { replace: true });
  }, [currentStep, navigate]);

  useEffect(() => {
    if (idOrder === null) {
      dispatch(resetStatePayment());
      dispatch(resetTotalAmount());
    }
  }, [idOrder, dispatch]);

  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantityInCart;
    }, 0);
  };

  const totalPrice = calculateTotalPrice(products);

  const handleNextStep = () => {
    if (currentStep === 2) {
      if (!shippingAddress) {
        toast.current.show({
          severity: "error",
          summary: "Thông báo",
          detail: "Vui lòng điền địa chỉ giao hàng!",
        });
        return;
      }
      if (!note) {
        toast.current.show({
          severity: "error",
          summary: "Thông báo",
          detail: "Vui lòng điền ghi chú trước khi tiếp tục!",
        });
        return;
      }
    }
    if (isAuthenticated) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        dispatch(setTotalAmount(totalPrice));
        setCurrentStep(currentStep + 1);
      }, 500);
    } else {
      toast.current.show({
        severity: "info",
        summary: "Thông báo",
        detail: "Vui lòng đăng nhập để thực hiện thanh toán!",
      });
    }
  };

  const handleReturn = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setCurrentStep(currentStep - 1);
    }, 500);
  };

  return (
    <div className="payment-container">
      {/* banner */}
      <div
        className="banner-left"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <img src={qc1} alt="Banner Left" />
      </div>
      <div
        className="banner-right"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <img src={qc2} alt="Banner Right" />
      </div>

      {/* content */}
      <div className="breadcrumb-cart">
        {stepFromURL === 1 || stepFromURL === 4 ? (
          <NavLink to={path.HOMEPAGE}>
            <GrFormPrevious
              style={{
                color: "#1982f9",
                fontSize: "21px",
                marginRight: "5px",
                marginBottom: "3px",
              }}
            />
            <span>Mua thêm sản phẩm khác</span>
          </NavLink>
        ) : (
          <NavLink onClick={handleReturn}>
            <GrFormPrevious
              style={{
                color: "#1982f9",
                fontSize: "21px",
                marginRight: "5px",
                marginBottom: "3px",
              }}
            />
            <span>Trở về</span>
          </NavLink>
        )}
      </div>

      <div className="product-payment">
        <div className="steps">
          <div
            className={`step ${currentStep >= 1 ? "active" : ""} ${
              currentStep > 1 ? "completed" : ""
            }`}
          >
            <div className="step-icon">
              <HiShoppingBag />
            </div>
            <div className="step-text">Giỏ hàng</div>
          </div>
          <div
            className={`step ${currentStep >= 2 ? "active" : ""} ${
              currentStep > 2 ? "completed" : ""
            }`}
          >
            <div className="step-icon">
              <FaAddressCard />
            </div>
            <div className="step-text">Thông tin đặt hàng</div>
          </div>
          <div
            className={`step ${currentStep >= 3 ? "active" : ""} ${
              currentStep > 3 ? "completed" : ""
            }`}
          >
            <div className="step-icon">
              <BsCreditCardFill />
            </div>
            <div className="step-text">Thanh toán</div>
          </div>
          <div className={`step ${currentStep === 4 ? "active" : ""}`}>
            <div className="step-icon">
              <TbShieldCheckFilled />
            </div>
            <div className="step-text">Hoàn tất</div>
          </div>
        </div>

        {currentStep === 1 && <ProductInCart products={products} />}
        {currentStep === 2 && (
          <OrderInformation
            setShippingAddress={setShippingAddress}
            setNote={setNote}
            setPaymentMethod={setPaymentMethod}
            fullName={fullName}
            phone={phone}
            shippingAddress={shippingAddress}
            note={note}
            paymentMethod={paymentMethod}
            products={products}
          />
        )}
        {currentStep === 3 && (
          <ConfirmInformation
            totalPrice={totalPrice}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            fullName={fullName}
            phone={phone}
            paymentStatus={paymentStatus}
            products={products}
          />
        )}
        {currentStep === 4 && (
          <StatusPayment
            totalPrice={totalPrice}
            paymentStatus={paymentStatus}
            fullName={fullName}
            phone={phone}
            email={user.email}
            shippingAddress={shippingAddress}
            idOrder={idOrder}
            setOpen={setOpen}
            open={open}
            products={products}
            user={user}
          />
        )}

        {!products ||
        products.length === 0 ||
        currentStep === 3 ||
        currentStep === 4 ? (
          ""
        ) : (
          <div className="summary">
            {currentStep === 1 && (
              <div className="discount-code">
                <button>Sử dụng mã giảm giá</button>
              </div>
            )}
            <div className="bg-total">
              <div className="shipping-fee">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <div className="total">
                <span>Tổng tiền:</span>
                <span>
                  {totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
            </div>
            <button className="checkout-btn" onClick={handleNextStep}>
              {currentStep === 3 ? "THANH TOÁN NGAY" : "ĐẶT HÀNG NGAY"}
            </button>
          </div>
        )}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ProductPayment;
