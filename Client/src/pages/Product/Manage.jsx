import { useEffect, useState } from "react";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LoadingConponent from "../../components/Loading/LoadingComponent";
import AddProductTab from "../../components/Modal/Addproduct";

import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined ,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Button,
  Popconfirm,
  Select,
  notification 
} from "antd";

const { Meta } = Card;
const { Option } = Select;

const _Root_IMG = __dirname + "img";


const ProductPage = (props) => {

  const [openAdd, setOpenAdd] = useState(false);
  const [isLoading, setLoading] = useState(true);
const [AlertSuccess, setSuccess] = useState(false);

// Notice add success
const [showNotification, setShowNotification] = useState(false);
const openNotification = (prod) => 
{
    alert(prod)
    setShowNotification(true);
};  
 
useEffect(() => {
    if (showNotification) {
      notification.open({
        placement: 'topLeft',
        className:"bg-success text-light",
        message: 'Thêm Sản Phẩm Thành Công',
        description:
          'Một Sản Phẩm Đã Được Thêm',
        icon: <CheckCircleOutlined  style={{ color: '#ffff' }}  />,    
      });
      setShowNotification(false);
    }
  }, [showNotification]);

//


  const showDrawer = () => {
    setOpenAdd(true);
  };

  useEffect(() => {
    document.title = "Sản Phẩm";
    // setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);

    // Change icon
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `${_Root_IMG}/logo.png`;
    document.head.appendChild(link);
  }, []);

  

  return (
    <HelmetProvider>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="/css/product/product.css"
        />
      </Helmet>

    {isLoading && <LoadingConponent />}

        <AddProductTab 
            isOpen={openAdd}
            HandleClose={()=>setOpenAdd(false)}
            HandleSuccess={openNotification}
        />


    <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
    New account
    </Button>

      <div className="row list-product">
        <div className="mt-3 col-12 col-sm-4 col-md-3 col-xl-2  d-flex justify-content-center ">
          <Card
            style={{ width: 220 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <EditOutlined key="edit" />,
              <Popconfirm
                onConfirm={() => alert("ok")}
                title="Delete the task"
                description="Are you sure to delete this task?"
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
              >
                <DeleteOutlined />
              </Popconfirm>,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
              }
              title="Card titlesafsdfdsfsdfsdfsd"
              description="This is the descsdfffffffffription"
            />
          </Card>
        </div>
      </div>
     
    </HelmetProvider>
  );
};

export default ProductPage;
