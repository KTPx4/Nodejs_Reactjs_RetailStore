import { useState, useContext, createContext, useEffect } from "react";

import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const _Root_IMG = __dirname + "img";

const AdminPage = () => {
  useEffect(() => {
    document.title = "Quản Lý Tài Khoản";
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
          href={`/css/admin/admin.css?v=${new Date().getTime()}`}
        />
      </Helmet>
     
      <div className="container">
        <div className="row">
          <main role="main" className="col-md-12 ml-sm-auto col-lg-12">
            {/* <div className="card-list">
              <div className="row">
                <div className="col-2 ">
                  <div className="card blue">
                    <div className="title">all projects</div>
                    <i className="zmdi zmdi-upload"></i>
                    <div className="value">89</div>
                    <div className="stat">
                      <b>13</b>% increase
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="projects mb-4">
              <div className="projects-inner">
                <header className="projects-header">
                  <div className="title">Danh sách nhân viên</div>
                  <div className="count">| 32 Người</div>
                 
                  <div className="btn btn-success btn-add-staff btn-header" >Thêm Nhân Viên</div>
                  <div className="btn bg-white btn-sendemail-staff btn-header" >Gửi Email</div>
                  
                  <div className="searchBox">
                    <input
                      className="searchInput"
                      type="text"
                      name=""
                      placeholder="Search"
                    />
                    <button className="searchButton" href="#">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </header>
                <table className="projects-table">
                  <thead>
                    <tr className="table-title text-center">
                      <th>#</th>
                      <th>Họ Và Tên</th>

                      <th>Email</th>
                      <th className="th-user user">User</th>
                      <th className="div-status">Trạng Thái</th>
                      <th className="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td>
                        <h5>1</h5>
                        <p></p>
                        {/* <p>Google</p> */}
                      </td>
                      <td className="member">
                        <figure>
                          <img src="/img/account/3.jpg" />
                        </figure>
                        <div className="member-info div-text-name">
                          <p>Myrtle Erickson</p>
                          {/* <p>UK Design Team</p> */}
                        </div>
                      </td>
                      <td className="td-email">
                        <div className="div-text">
                          <p>kieuthanhphat.2003.2018hdb@gmail.com</p>

                        </div>
                        {/* <span>kieuthanhphat.2003.2018hdb@gmail.com</span> */}
                        {/* <p className="text-danger"> </p> */}
                      </td>

                      <td className="td-user user">
                        <div className="div-text">
                          <p>kieuthanhphat.2003.2018hdb</p>
                        </div>
                        {/* <p> </p> */}
                      </td>
                      <td className="status div-status">
                        <span className="status-text status-green">
                          Hoạt Động
                        </span>
                      </td>
                      <td className="action">
                        <a href="#" className="btn btn-primary btn-sm">
                          <i className="fas fa-eye"></i> View More
                        </a>

                        <a href="#" className="btn btn-success btn-sm">
                          <i className="fas fa-envelope"></i> Send Email
                        </a>
                        <a href="#" className="btn btn-warning btn-sm">
                          <i className="fas fa-ban"></i> Block
                        </a>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <h5>2</h5>
                        <p></p>
                        {/* <p>Google</p> */}
                      </td>
                      <td className="member">
                        <figure>
                          <img src="/img/account/3.jpg" />
                        </figure>
                        <div className="member-info div-text-name">
                          <p>Myrtle Erickson</p>
                          {/* <p>UK Design Team</p> */}
                        </div>
                      </td>
                      <td className="td-email">
                        <div className="div-text">
                          <p>kieuthanhphat.2003.2018hdb@gmail.com</p>

                        </div>
                        {/* <span>kieuthanhphat.2003.2018hdb@gmail.com</span> */}
                        {/* <p className="text-danger"> </p> */}
                      </td>

                      <td className="td-user user">
                        <div className="div-text">
                          <p>kieuthanhphat.2003.2018hdb</p>
                        </div>
                        {/* <p> </p> */}
                      </td>
                      <td className="status div-status">
                        <span className="status-text status-green">
                          Hoạt Động
                        </span>
                      </td>
                      <td className="action">
                        <a href="#" className="btn btn-primary btn-sm">
                          <i className="fas fa-eye"></i> View More
                        </a>

                        <a href="#" className="btn btn-success btn-sm">
                          <i className="fas fa-envelope"></i> Send Email
                        </a>
                        <a href="#" className="btn btn-warning btn-sm">
                          <i className="fas fa-ban"></i> Block
                        </a>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <h5>3</h5>
                        <p></p>
                        {/* <p>Google</p> */}
                      </td>
                      <td className="member">
                        <figure>
                          <img src="/img/account/3.jpg" />
                        </figure>
                        <div className="member-info div-text-name">
                          <p>Myrtle Erickson</p>
                          {/* <p>UK Design Team</p> */}
                        </div>
                      </td>
                      <td className="td-email">
                        <div className="div-text">
                          <p>kieuthanhphat.2003.2018hdb@gmail.com</p>

                        </div>
                        {/* <span>kieuthanhphat.2003.2018hdb@gmail.com</span> */}
                        {/* <p className="text-danger"> </p> */}
                      </td>

                      <td className="td-user user">
                        <div className="div-text">
                          <p>kieuthanhphat.2003.2018hdb</p>
                        </div>
                        {/* <p> </p> */}
                      </td>
                      <td className="status div-status">
                        <span className="status-text status-green">
                          Hoạt Động
                        </span>
                      </td>
                      <td className="action">
                        <a href="#" className="btn btn-primary btn-sm">
                          <i className="fas fa-eye"></i> View More
                        </a>

                        <a href="#" className="btn btn-success btn-sm">
                          <i className="fas fa-envelope"></i> Send Email
                        </a>
                        <a href="#" className="btn btn-warning btn-sm">
                          <i className="fas fa-ban"></i> Block
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default AdminPage;
