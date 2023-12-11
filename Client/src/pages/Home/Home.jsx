import { useEffect } from "react";

import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
const _Root_IMG = __dirname + "img";

const HomePage = (props) => {
    let CardManageA = <></>
    let CardViewReport = <></>
  useEffect(() => {
    document.title = "Trang Chủ";
    // Change icon
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `${_Root_IMG}/logo.png`;
    document.head.appendChild(link);
  }, []);


  let isAdmin = useSelector((state)=> state.isAdmin)
  if(isAdmin)
  {
    CardManageA = (
    <>
        <div className="col-12 col-sm-6    d-flex justify-content-center">
              <div className="card-home card-display">
                <div className="card-element">
                  <h1>Tài Khoản</h1>
                  <p className="text-center">Quản lý và tương tác với tài khoản nhân viên</p>
                  <p className="text-center">
                      <button className="close" onClick={()=> window.location.replace("/account")}>Truy Cập</button>
                  </p>
                </div>
              </div>
        </div>
    </>)
    CardViewReport = (
    <>
        <div className="col-12 col-sm-6   d-flex justify-content-center">
              <div className="card-home card-display">
                <div className="card-element">
                  <h1>Báo Cáo</h1>
                  <p className="text-center">Xem báo cáo danh thu</p>
                  <p className="text-center">
                      <button className="close">Truy Cập</button>
                  </p>
                </div>
              </div>
        </div>
    </>)
  }

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="/css/home.css" />
      </Helmet>
      <div className="main-body body-home">
        <div className="container" ng-app="tabApp">
          <div className="row text-center" ng-controller="TabController">
            <div className="col-12  col-sm-6 col-md-4  d-flex justify-content-center ">
              <div className="card-home card-display">
                <div className="card-element">
                  <h1>Sản Phẩm</h1>
                  <p className="text-center">Quản lý thông tin Sản Phẩm</p>
                  <p className="text-center">
                      <button className="close" onClick={()=> window.location.replace('/product/views')}>Truy Cập</button>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12  col-sm-6 col-md-4  d-flex justify-content-center">
              <div className="card-home card-display">
                <div className="card-element">
                  <h1>Bán Hàng</h1>
                  <p className="text-center">Giao dịch và xuất hóa đơn nhanh chóng</p>
                  <p className="text-center">
                      <button className="close"  onClick={()=> window.location.replace('/product/sales')}>Truy Cập</button>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12  col-sm-6 col-md-4  d-flex justify-content-center">
              <div className="card-home card-display">
                <div className="card-element">
                  <h1>Khách Hàng</h1>
                  <p className="text-center">Thông tin và lịch sử mua hàng của khách hàng</p>
                  <p className="text-center">
                      <button className="close">Truy Cập</button>
                  </p>
                </div>
              </div>
            </div>
            {CardManageA}
            {CardViewReport}

          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};
export default HomePage;
