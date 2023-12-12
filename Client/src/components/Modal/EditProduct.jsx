import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Button as Btn,Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

import {
  Avatar,
  Card,
  Button,
  Popconfirm,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  notification,
} from "antd";
import { parseInt } from "lodash";

const { Meta } = Card;
const { Option } = Select;

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
const tokenLogin = localStorage.getItem(_Token_Auth) || "";
const urlServer = process.env.REACT_APP_SERVER || "";
const urlEdit = urlServer + "/api/products/";

const EditProductTab = ({ isOpen, HandleClose, HandleSuccess, HandleFailed, Product }) => {
  

  const [ErrorMess, setError] = useState(false);
  const [Price, setPrice] = useState(0);
  let AlerMess = <></>;

  const onSubmit = async () => {
    try {
      var barCode = document.getElementsByName("BarCode")[0].value;
      var productName = document.getElementsByName("ProductName")[0].value;
      var originPrice = document.getElementsByName("OriginPrice")[0].value;
      var displayPrice = document.getElementsByName("DisplayPrice")[0].value;
      var category = document.getElementsByName("Category")[0].value;
      var description = document.getElementsByName("Description")[0].value;
      var LinkImg = document.getElementsByName("LinkImg")[0].value;
      
      if (
        !barCode ||
        !productName ||
        !originPrice ||
        !category ||
        !description ||
        !LinkImg
      ) {
        setError("Vui lòng điền đủ thông tin");
        return;
      }

      if (isNaN((originPrice))) {
        setError("Giá gốc phải là một số nguyên hợp lệ");
        return;
      }

      if (displayPrice && isNaN((displayPrice))) {
        setError("Giá bán phải là một nguyên số hợp lệ");
        return;
      }

      let ArrCate = category.trim().split("|");
      let ListCategory = ArrCate.map((item) => item.trim());

      let data = {
        BarCode: barCode,
        ProductName: productName,
        OriginPrice: originPrice,
        DisplayPrice: displayPrice,
        Category: ListCategory,
        Description: description,
        linkImg: LinkImg
      };

     
      let res = await SendEdit(urlEdit + barCode, tokenLogin, data);
      let code = res.code;
      if (code === 200) {
        let pro = res.data.product;
        HandleClose();
        HandleSuccess(pro);
      } else 
      {
        HandleFailed()       
      }
    } catch (err) 
    {
        HandleFailed()
        HandleClose();
      console.log("Lỗi Khi Thêm Sản Phẩm: ", err);
    }
  };

  const ClearMess = () => setError("");

  if (ErrorMess) {
    AlerMess = <Alert variant="danger">{ErrorMess}</Alert>;
  }

  return (
    <>
      <Drawer
        placement="bottom"
        title={
          <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <div style={{marginRight: 8}}>Chỉnh Sửa Sản Phẩm</div>
          <Space >
            <Button onClick={HandleClose}>Thoát</Button>
            <Btn onClick={onSubmit} variant="warning">
              Sửa
            </Btn>
          </Space>
        </div>
        }
        width={720}
        open={isOpen}
        onClose={HandleClose}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
       
      >
        {AlerMess}
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="BarCode">
                <Input
                  disabled={true}
                  defaultValue={Product.BarCode}
                  onFocus={ClearMess}
                  name="BarCode"
                  placeholder="Vui Lòng nhập BarCode"
                  required
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tên Sản Phẩm">
                <Input
                  defaultValue={Product.ProductName}
                  onFocus={ClearMess}
                  name="ProductName"
                  placeholder="Vui Lòng nhập Tên sản phẩm"
                  required
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Giá Gốc">
                <Input
                  defaultValue={parseFloat(Product.OriginPrice)}
                  onFocus={ClearMess}
                  name="OriginPrice"
                  placeholder="Vui Lòng nhập giá"
                  required
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giá Bán">
                <Input
                  defaultValue={parseFloat(Product.DisplayPrice)}
                  onFocus={ClearMess}
                  name="DisplayPrice"
                  placeholder="Vui Lòng nhập giá"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Thể loại">
                <Input
                  defaultValue={Product.Category.join(" | ")}
                  onFocus={ClearMess}
                  name="Category"
                  placeholder="Vui Lòng nhập thể loại. Cách nhau bởi dấu |"
                  required
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mô Tả">
                <Input
                  defaultValue={Product.Description}
                  onFocus={ClearMess}
                  name="Description"
                  placeholder="Vui Lòng nhập mô tả sản phẩm"
                  required
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Link Ảnh">
                <Input
                  defaultValue={Product.linkImg}
                  onFocus={ClearMess}
                  name="LinkImg"
                  placeholder="Vui lòng nhập Link ảnh"
                  required
                />
              </Form.Item>
            </Col>            
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

const SendEdit = async (server, tokenLogin, data) => {
  try {
    const res = await axios({
      url: server,
      method: "PUT",
      headers: {
        authorization: `bearer ${tokenLogin}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });

    return res.data;
  } catch (err) {
    console.log("Error at 'Edit Product' - SendEdit: ", err);
    return {
      code: 500,
      data: {
        role: "null",
        email: "null",
      },
      message: "Không thể kết nối server hoặc server bị lỗi",
    };
  }
};

export default EditProductTab;
