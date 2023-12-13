import { useEffect, useState } from "react";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SalesPage from "./Product/Sales";
import { Alert } from "react-bootstrap";
import { Avatar, Tooltip,
    Button,
    Input,
    Moda,
    Modal,
    Table,
  InputNumber,
 } from "antd";

const _Root_IMG = __dirname + "img";




const TestPage = (props) => {
  
    useEffect(() => {
      document.title = "Test Component";
      // Change icon
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = `${_Root_IMG}/logo.png`;
      document.head.appendChild(link);
    }, []);


  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
    const [isNewCust, setIsNewCust] = useState(false)

  const handleOk = () => {


    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
 
    setOpen(false);
  };

  const columsModal = [
    {
     key:"column1",
     dataIndex: "column1"
    },
    {
     key: "column2",
     dataIndex: "column2"
    }
   ]

let rowModal = [
     {
        key:"custPhone",
        column1:"Số Điện Thoại Khách Hàng",
        column2: ( 
        <InputNumber
          style={{width: 160}}
          id="PhoneCust"
            className="ml-3"           
          />
          )
     },
     isNewCust && 
     {
        key:"custName",
        column1:"Họ Và Tên",
        column2: (
          <Input 
        id="NameCust"
          />
        )
     },
     isNewCust &&  
     {
        key:"addrCust",
        column1:"Địa Chỉ",
        column2: (
          <Input 
        id="NameCust"
          />
        ),      
     },
     
   ]
  return (
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="/css/test.css" />
      </Helmet>

      <>
      <Modal
    centered
    open={open}
    title={<div className="text-center">Nhập Thông Tin Khách Hàng</div>}
    onOk={handleOk}
    onCancel={handleCancel}
    footer={[
      
        <Button key="back" onClick={handleCancel}>
        Thoát
        </Button>,
        <Button
        key="submit"
        type="primary"
        loading={loading}
        onClick={handleOk}
        >
        Bước Tiếp Theo
        </Button>,,
    ]}
    >
    <Table dataSource={rowModal} columns={columsModal} pagination={false} />
    </Modal>

      </>
    </HelmetProvider>
  );
};
export default TestPage;
