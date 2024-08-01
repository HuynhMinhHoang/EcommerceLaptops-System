import React from "react";
import "./ProductDescription.scss";

const ProductDescription = ({ product }) => {
  const descriptionParts = product.description.split(",");

  const labels = ["CPU", "RAM", "Ổ cứng", "Màn hình", "Tần số quét"];

  return (
    <div className="product-des">
      <div className="product-heading">
        <h2>Thông tin sản phẩm</h2>
      </div>

      <div className="product-content">
        <h2>
          <span>Thông số kĩ thuật</span>
        </h2>

        <div className="bg-table-content">
          <table>
            <tbody>
              {labels.map((label, index) => (
                <tr key={index}>
                  <td className="label">{label}</td>
                  <td>
                    {descriptionParts[index]
                      ? descriptionParts[index].trim()
                      : "Chưa có mô tả"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
