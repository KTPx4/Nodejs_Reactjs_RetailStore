import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
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

const { Meta } = Card;
const { Option } = Select;

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
const tokenLogin = localStorage.getItem(_Token_Auth) || "";
const urlServer = process.env.REACT_APP_SERVER || "";
const urlCreate = urlServer + "/api/products/";

const AddProductTab = ({ isOpen, HandleClose, HandleSuccess }) => {
  let isAdmin = useSelector((state) => state.isAdmin);

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

      if (
        !barCode ||
        !productName ||
        !originPrice ||
        !category ||
        !description
      ) {
        setError("Vui lòng điền đủ thông tin");
        return;
      }

      if (isNaN(parseInt(originPrice))) {
        setError("Giá gốc phải là một số nguyên hợp lệ");
        return;
      }

      if (displayPrice && isNaN(parseInt(displayPrice))) {
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
      };

     
      let res = await SendAdd(urlCreate, tokenLogin, data);
      let code = res.code;
      if (code === 200) {
        let pro = res.data.product;
        HandleClose();
        HandleSuccess(pro);
      } else {
        setError(res.message);
      }
    } catch (err) {
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
        title="Create a new account"
        width={720}
        open={isOpen}
        onClose={HandleClose}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={HandleClose}>Cancel</Button>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {AlerMess}
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="BarCode">
                <Input
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
                  onFocus={ClearMess}
                  name="Description"
                  placeholder="Vui Lòng nhập mô tả sản phẩm"
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

const SendAdd = async (server, tokenLogin, data) => {
  try {
    const res = await axios({
      url: server,
      method: "POST",
      headers: {
        authorization: `bearer ${tokenLogin}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });

    return res.data;
  } catch (err) {
    console.log("Error at 'Add Product' - SendAdd: ", err);
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

export default AddProductTab;
