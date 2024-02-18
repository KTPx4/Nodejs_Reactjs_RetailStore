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

const SalesCart = ({ ListProduct, clearList, inCount, deCount, setListOrder ,showModal}) => {


  const openNotification = () => {
    notification.open({
      message: `Không thể thanh toán`,
      className: "bg-warning notice",
      description: "Vui lòng chọn sản phẩm trước khi thanh toán",
      placement: "top",
    });
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
      dataIndex: "Quantity",
      key: "quantityPro",
    },
    {
      title: "Thành tiền",
      dataIndex: "TotalPrice",
      key: "pricePros",
    },

    {
      title: "Hành Động",
      dataIndex: "action",
      key: "action",
    },
  ];
  const CreateOrder = () => 
  {
    if (!ListProduct || ListProduct?.length < 1) {
      openNotification();
      return;
    }
    setListOrder( 
      dataTBCart.map(({ BarCode, Quantity, TotalPrice }) => ({
      BarCode,
      Quantity,
      TotalPrice,
    })))
    showModal();
  };

  if (ListProduct?.length > 0) {
    let index = 1;
    try{
      dataTBCart = ListProduct.map((pro) => ({
        BarCode: pro.BarCode.toString(),
        key: pro.BarCode.toString(),
        stt: (index++).toString(),
        nameProd: pro.ProductName.toString(),
        priceProd: pro.DisplayPrice.toString(),
        Quantity: pro.Count.toString(),
        TotalPrice: (parseFloat(pro.DisplayPrice) * parseFloat(pro.Count)).toString(),
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
    catch(err)
    {
      console.log("err", err);
    }
 
  }

  let SumPrice = 0;
  let SumTotalProduct = 0;
  if (dataTBCart?.length > 0) 
  {
    dataTBCart.forEach((row) => 
    {
      SumPrice += parseFloat(row.TotalPrice);
      SumTotalProduct += parseInt(row.Quantity);     

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
