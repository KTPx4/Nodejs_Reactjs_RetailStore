import { useEffect, useState } from "react";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { Descriptions, Modal, Card, Select } from "antd";

const { Meta } = Card;
const { Option } = Select;

const items = [
  {
    key: "1",
    label: "BarCode",
    children: "123456",
  },
  {
    key: "2",
    label: "Tên Sản Phẩm",
    children: "Iphone",
  },
  {
    key: "3",
    label: "Giá Gốc",
    children: "$111.1111",
  },
  {
    key: "4",
    label: "Giá Bán",
    children: "$111.1111",
  },
  {
    key: "5",
    label: "Ngày Tạo",
    children: "12/12/12",
  },
  {
    key: "6",
    label: "Thể Loại",
    children: "Phone Vip Pro",
  },
  {
    key: "7",
    label: "Mô Tả",
    children:
      "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China,No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, ChinaNo. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, ChinaNo. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
  },
];

const _Root_IMG = __dirname + "img";
const TestPage = (props) => {
  
  const [isAdmin, setAdmin] = useState(false);
  const [open, setOpen] = useState(false);

  const [modal2Open, setModal2Open] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.title = "Test Component";
    // Change icon
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `${_Root_IMG}/logo.png`;
    document.head.appendChild(link);
  }, []);

  if (!isAdmin) {
    items.splice(2, 1);
  }

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="/css/test.css" />
      </Helmet>

      <>
        <Modal
          title="Thôn Tin Sản Phẩm"
          centered
          open={true}
          onOk={() => setModal2Open(false)}
          
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
    </HelmetProvider>
  );
};
export default TestPage;
