import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { ShoppingCartOutlined, ClearOutlined } from "@ant-design/icons";
import {
  Table,
  Avatar,
  InputNumber,
  Tooltip,
  Alert,
  notification,
  Button,
  Moda,
  Modal,
} from "antd";

const SalesCart = ({ ListProduct, clearList, inCount, deCount ,showModal}) => {


  const openNotification = () => {
    notification.open({
      message: `Không thể thanh toán`,
      className: "bg-warning notice",
      description: "Vui lòng chọn sản phẩm trước khi thanh toán",
      placement: "top",
    });
  };

  const CreateOrder = () => {
    if (!ListProduct || ListProduct?.length < 1) {
      openNotification();
      return;
    }
    showModal();
  };

  let dataTBCart = [];
  const columnsTBCart = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "nameProd",
      key: "nameProd",
    },
    {
      title: "Giá",
      dataIndex: "priceProd",
      key: "pricePro",
    },
    {
      title: "Số lượng",
      dataIndex: "quantityProd",
      key: "quantityPro",
    },
    {
      title: "Thành tiền",
      dataIndex: "priceProds",
      key: "pricePros",
    },

    {
      title: "Hành Động",
      dataIndex: "action",
      key: "action",
    },
  ];


  if (ListProduct?.length > 0) {
    let index = 1;
    dataTBCart = ListProduct.map((pro) => ({
      key: pro.BarCode.toString(),
      stt: (index++).toString(),
      nameProd: pro.ProductName,
      priceProd: pro.DisplayPrice,
      quantityProd: pro.Count,
      priceProds: parseFloat(pro.DisplayPrice) * parseFloat(pro.Count),
      action: [
        <Avatar
          key="upCount"
          className="btn-add"
          shape="square"
          size="large"
          icon="+"
          onClick={() => inCount(pro)}
          style={{ marginRight: 3, background: "#6e8293" }}
        />,
        <Avatar
          key="downCount"
          className="btn-add"
          shape="square"
          size="large"
          icon="-"
          onClick={() => deCount(pro)}
          style={{ marginRight: 3, background: "#6e8293" }}
        />,
      ],
    }));
  }

  let SumPrice = 0;
  let SumTotalProduct = 0;
  if (dataTBCart?.length > 0) {
    dataTBCart.forEach((row) => {
      SumPrice += parseFloat(row.priceProds);
      SumTotalProduct += parseInt(row.quantityProd);
    });
  }

  


  return (
    <>    
   



      <div className="Count m-2 ">
        <div>
          <h5>
            <Tooltip title="Tổng Sản Phẩm">
              <ShoppingCartOutlined /> Tổng Sản Phẩm:
              <i id="countSumProd" className="SumTotalProduct">{SumTotalProduct}</i>
            </Tooltip>
          </h5>
        </div>
        <div className="d-flex justify-content-start">
          <Tooltip title="Tổng Tiền">
            <InputNumber
            id="sumPriceProds"
              className="ml-3"
              readOnly
              addonAfter="$"
              value={SumPrice}
              
            />
          </Tooltip>

          <div
            onClick={CreateOrder}
            className="btn btn-success"
            style={{ marginLeft: 10, height: 35 }}
          >
            Thanh Toán
          </div>
          <div className="btn btn-warning" style={{ marginLeft: 10 }}>
            <Tooltip title="Xóa Toàn Bộ" id="tooltip-id">
              <ClearOutlined onClick={clearList} />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="table-list">
        <Table dataSource={dataTBCart} columns={columnsTBCart} pagination={false} />
      </div>
    </>
  );
};
export default SalesCart;
