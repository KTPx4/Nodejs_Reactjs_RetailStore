import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Descriptions, Modal} from "antd";

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
const tokenLogin = localStorage.getItem(_Token_Auth) || "";
const urlServer = process.env.REACT_APP_SERVER || "";
const urlProduct = urlServer + "/api/products/";


const ViewProductTab = ({isOpen,HandleClose , Product}) => {
    const items = [
        {
          key: "1",
          label: "BarCode",
          children: `${Product.BarCode}`,
        },
        {
          key: "2",
          label: "Tên Sản Phẩm",
          children: `${Product.ProductName}`,
        },
        {
          key: "3",
          label: "Giá Gốc",
          children: `${formatMoney(Product.OriginPrice)}`,
        },
        {
          key: "4",
          label: "Giá Bán",
          children: `${formatMoney(Product.DisplayPrice)}`,
        },
        {
          key: "5",
          label: "Ngày Tạo",
          children: `${(new Date(Product.CreateAt)).toLocaleString()}`,
        },
        {
          key: "6",
          label: "Thể Loại",
          children: `${Product.Category.join(', ')}`,
        },
        {
          key: "7",
          label: "Mô Tả",
          children:`${Product.Description}` ,
        },
      ];
    
    let isAdmin = useSelector((state) => state.isAdmin);
    
    if (!isAdmin) { // if staff -> remove origin price
        items.splice(2, 1);
    }
    return (
    <>
      <Modal
        title="Thông Tin Sản Phẩm"
        centered
        open={isOpen}
        onOk={HandleClose}
        onCancel={HandleClose}
      >
        <Descriptions
          bordered
          style={{ maxHeight: 400, overflow: "scroll" }}
          column={1}
          title=""
          items={items}
        />
      </Modal>
    </>
  );
}

function formatMoney(str) {
    // Remove any non-digit characters from the string
    let num = str.toString().replace(/\D/g, "");
  
    // Check if the number has decimal places
    if (num.indexOf('.') !== -1) {
      // Convert the string to a number and format as currency with decimal places
      let val = Number(num);
      return "$" + val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      // Convert the string to a number and format as currency without decimal places
      let val = Number(num);
      return "$" + val.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  }

export default ViewProductTab;
