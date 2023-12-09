import { useState, useContext, createContext, useEffect } from "react";

import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import AlertComponent from "../components/Alert/AlertComponent";
const _Root_IMG = __dirname + "img";

const ErrorPage = (props) => {
  useEffect(() => {
    document.title = "Lỗi Trang";
    // Change icon
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `${_Root_IMG}/logo.png`;
    document.head.appendChild(link);
  }, []);
  
  let type = "warning"
  const Message = (
    <>
            <p>
              Có Thể Server Bị Lỗi. Vui Lòng Kiểm Tra Lại Server
            </p>
            <p>Có thể server chưa được bật hoặc bị sập</p>
            <p>Hãy thử lại sau vài phút</p>
    </>
  )
    let Heading = "Lỗi Trang"
    let button = (
              <Button href="/" variant="light">
                Trang Chủ
              </Button>
    )
  return (
    <HelmetProvider>
      <Helmet>
        {/* <link rel="stylesheet" type="text/css" href="/css/login.css" /> */}
      </Helmet>
      { AlertComponent(type, Heading, Message, button)}
    </HelmetProvider>
  );
};
export default ErrorPage;
