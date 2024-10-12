import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.scss";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { SlEarphonesAlt } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { path } from "../../utils/Constants";
import SubList from "../Home/SubList";
import NotificationAddProduct from "../User/DetailContent/NotificationAddProduct";
import { MdOutlineWavingHand } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { ThreeDots } from "react-loader-spinner";
import { Backdrop, CircularProgress } from "@mui/material";
import { getProductByKeyword } from "../../service/APIService";
import _ from "lodash";

const Header = ({ toast }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [keyword, setKeyword] = useState("");
  const isAuthenticated = useSelector(
    (state) => state.userRedux.isAuthenticated
  );
  const user = useSelector((state) => state.userRedux.user);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cartRedux.products) || [];
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionBoxRef = useRef(null);

  const totalQuantityInCart = products.reduce((total, product) => {
    return total + product.quantityInCart;
  }, 0);

  let [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const isPaymentPage = currentPath === path.PRODUCT_PAYMENT;
  const isHomePage = currentPath === path.HOMEPAGE;

  const isShowNotifications = useSelector(
    (state) => state.cartRedux.isShowNotifications
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowSuggestions(false);
    setKeyword("");
  }, [location]);

  const debounceSearch = _.debounce(async (value) => {
    if (value.trim() === "") {
      setSuggestedProducts([]);
      setShowSuggestions(false);
      return;
    }
    const response = await getProductByKeyword(value);
    if (response && response.data) {
      setSuggestedProducts(response.data);
      setShowSuggestions(true);
    }
  }, 500);

  useEffect(() => {
    debounceSearch(keyword);
    return () => debounceSearch.cancel();
  }, [keyword]);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(doLogout());
      setLoading(false);
      navigate(path.HOMEPAGE);
    }, 1000);
  };

  const handleGoToHome = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path.HOMEPAGE);
    }, 500);
  };

  const showAlertLogout = () => {
    Swal.fire({
      title: "Bạn muốn thoát tài khoản?",
      showDenyButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: "warning",
      confirmButtonText: "Đồng ý",
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  const handleAccountProfile = () => {
    navigate(path.ACCOUNT_MANAGE);
  };

  const handleRecentlyViewed = () => {
    navigate(`${path.ACCOUNT_MANAGE}/${path.RECENTLY_VIEWED}`);
  };

  const handleOrderHistory = () => {
    if (!isAuthenticated) {
      toast.current.show({
        severity: "info",
        summary: "Thông báo",
        detail: "Vui lòng đăng nhập để thực hiện!",
      });
    } else {
      navigate(`${path.ACCOUNT}/${path.ORDER_HISTORY}`);
    }
  };

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  const handleClickDetail = (id, name) => {
    const slug = slugify(name);
    navigate(`${path.PRODUCT_DETAIL.replace(":slug", slug)}`, {
      state: { id },
    });
  };

  return (
    <>
      <div className={`header ${isSticky ? "sticky" : ""}`}>
        <div className="container-header">
          <nav className="navigation">
            <ul>
              <li>
                <NavLink
                  onClick={(e) => {
                    if (isHomePage) {
                      e.preventDefault();
                    } else {
                      handleGoToHome();
                    }
                  }}
                  className="logo"
                >
                  <div className="logo-1 animate__animated animate__fadeInLeft">
                    <img src={logo} alt="logo" />
                  </div>
                </NavLink>
              </li>
              <li>
                <div className="input-search">
                  <IconField>
                    <InputIcon className="pi pi-search"></InputIcon>
                    <InputText
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Bạn cần tìm sản phẩm gì?"
                    />
                  </IconField>
                </div>

                {showSuggestions && (
                  <div className="suggestion-box" ref={suggestionBoxRef}>
                    {suggestedProducts.length > 0 ? (
                      <ul>
                        {suggestedProducts.map((product) => (
                          <li
                            key={product.idProduct}
                            onClick={() => {
                              handleClickDetail(
                                product.idProduct,
                                product.nameProduct
                              );
                            }}
                          >
                            <div className="product-info-search">
                              <span className="product-name-search">
                                {product.nameProduct}
                              </span>
                              <div className="product-price-search">
                                <span className="price-current-search">
                                  {product.price.toLocaleString("vi-VN")}đ
                                </span>
                              </div>
                            </div>
                            <div className="product-image-search">
                              <img
                                src={product.images[0]?.thumbnail}
                                alt={product.nameProduct}
                                width="50"
                                height="50"
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="no-results">Không tìm thấy sản phẩm!</div>
                    )}
                  </div>
                )}
              </li>

              <li className="hotline">
                {/* <NavLink to="/"> */}
                <div className="bg-item">
                  <div className="item-left">
                    <SlEarphonesAlt style={{ fontSize: "22px" }} />
                  </div>
                  <div className="item-right">
                    <span>Hotline</span>
                    <span>1900.5310</span>
                  </div>
                </div>
                {/* </NavLink> */}
              </li>

              <li>
                {/* <NavLink to="/"> */}
                <div className="bg-item">
                  <div className="item-left">
                    <IoLocationOutline style={{ fontSize: "26px" }} />
                  </div>
                  <div className="item-right">
                    <span>Hệ thống</span>
                    <span>Showroom</span>
                  </div>
                </div>
                {/* </NavLink> */}
              </li>

              <li>
                <div className="bg-item" onClick={handleOrderHistory}>
                  <div className="item-left">
                    <MdPendingActions style={{ fontSize: "26px" }} />
                  </div>
                  <div className="item-right">
                    <span>Tra cứu</span>
                    <span>đơn hàng</span>
                  </div>
                </div>
              </li>

              <li>
                <NavLink
                  to={path.PRODUCT_PAYMENT}
                  className={isPaymentPage ? "disabled-link" : ""}
                  onClick={(e) => {
                    if (isPaymentPage) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className={`bg-item ${isPaymentPage ? "disabled" : ""}`}>
                    <div className="item-left">
                      <AiOutlineShoppingCart style={{ fontSize: "27px" }} />
                    </div>
                    <div className="item-right">
                      <span>Giỏ</span>
                      <span>hàng</span>
                    </div>
                    <span className="count-product">
                      <span>{totalQuantityInCart}</span>
                    </span>
                  </div>
                </NavLink>
                <div className="bg-noti-add">
                  {isShowNotifications && (
                    <NotificationAddProduct
                      setStateNoti={(status) => {
                        if (!status) {
                          dispatch({ type: "HIDE_NOTIFICATION" });
                        }
                      }}
                    />
                  )}
                </div>
              </li>

              {!isAuthenticated ? (
                <li className="auth-link">
                  <NavLink to={path.LOGIN} className="bg-login">
                    <FiUser style={{ fontSize: "23px", marginRight: "8px" }} />
                    Đăng nhập
                  </NavLink>
                  <NavLink to={path.REGISTER}>Đăng ký</NavLink>
                </li>
              ) : (
                <>
                  <li className="bg-name-user">
                    <div to={path.LOGIN} className="bg-info-user">
                      <div>
                        <FiUser
                          style={{ fontSize: "25px", marginRight: "12px" }}
                        />
                      </div>
                      <div className="bg-fullname">
                        <span>Xin chào,</span>
                        <span>{user.fullName}</span>
                      </div>
                    </div>

                    <div className="dropdown-menu-user">
                      <div className="dropdown-item-custom">custom</div>

                      <div className="dropdown-item-user name-item">
                        <MdOutlineWavingHand
                          style={{ fontSize: "20px", marginRight: "12px" }}
                        />
                        Xin chào, {user.fullName}
                      </div>
                      <div
                        className="dropdown-item-user"
                        onClick={handleAccountProfile}
                      >
                        <MdOutlinePendingActions
                          style={{ fontSize: "20px", marginRight: "12px" }}
                        />
                        Thông tin hồ sơ
                      </div>
                      <div
                        className="dropdown-item-user"
                        onClick={handleRecentlyViewed}
                      >
                        <MdOutlineRemoveRedEye
                          style={{ fontSize: "20px", marginRight: "12px" }}
                        />
                        Đã xem gần đây
                      </div>
                      <div
                        className="dropdown-item-user logout-item"
                        onClick={showAlertLogout}
                      >
                        <TbLogout
                          style={{ fontSize: "20px", marginRight: "12px" }}
                        />
                        Đăng xuất
                      </div>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>

      <SubList />

      {loading && (
        <div className="bg-loading-login">
          <ThreeDots
            visible={true}
            height="100"
            width="100"
            color="#ec001c"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
};

export default Header;
