import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
// import _ from "lodash";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ProfileModal from "./User/Profile";
import { jwtDecode } from "jwt-decode";
import AddStaffModal from "../../components/Modal/AddStaff";
import ConfirmSendEmail from "../../components/Modal/SendActive";
import SetStatus from "../../components/Modal/setStatus";
import LoadingConponent from "../../components/Loading/LoadingComponent";
const _Root_IMG = __dirname + "img";

const AdminPage = () => {
  const Key_Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
  const _URLServer = process.env.REACT_APP_SERVER || "";
  const tokenLogin = localStorage.getItem(Key_Token_Auth) || "";

  const [isLoading, setLoading] = useState(true);
  const [isProfile, setProfileModalOpen] = useState(false);
  const [isSendMail, setSendMailOpen] = useState(false);
  const [isSetStatus, setStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [LIST_ACCOUNT, setLISTACCOUNT] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadSuccess, setLoadSuccess] = useState(false);

  const [showAddStaff, setshowAdd] = useState(false);

  const closeAddStaff = () => setshowAdd(false);

  var serverGETALL = `${_URLServer}/api/account`;
  var firstLoad = true;
  let listTBody = <></>;
  let OpenModal = <></>;
  const [currentID, setcurrentID] = useState("");

  useEffect(() => {
    document.title = "Quản Lý Tài Khoản";
    // Change icon
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `${_Root_IMG}/logo.png`;
    document.head.appendChild(link);

    let decode = jwtDecode(tokenLogin);

    setcurrentID(decode.id);
  }, []);

  useEffect(() => {
    setLoadSuccess(true);
  }, [LIST_ACCOUNT]);

  useEffect(() => {
    setLoading(true);
    LoadAll(searchTerm);
  }, [searchTerm]);

  const handleViewClick = (acc) => {
    setSelectedRow(acc);
    setProfileModalOpen(true);
  };

  const handleSendMail = (acc) => {
    setSelectedRow(acc);
    setSendMailOpen(true);
  };

  const handleSetStatus = (acc) => {
    setSelectedRow(acc);
    setStatus(true);
  };

  const handleSearchInputChange = () => {
    let value = document.getElementById("searchInput").value;

    setSearchTerm(value);
  };

  const LoadAll = (search) => {
    // Thêm dữ liệu vào URL
    const urlWithSearchParams = serverGETALL + "?search=" + search
   
    setTimeout(async () => {
      await axios({
        url: urlWithSearchParams,
        method: "GET",
        headers: {
          authorization: `Bear ${tokenLogin}`, // token auth login,
          "Content-Type": "application/json",
        },
        data: search,
      })
        .then((res) => {
          let code = res.data.code;

          if (code === 400) {
            alert(res.data.message);
          } else if (code === 500) {
            window.location.replace("/error");
          } else if (code === 200) {
            let listAcc = res.data.data.accounts;

            setLISTACCOUNT(listAcc);

            setTimeout(() => {
              setLoading(false);
            }, 500);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log("Error at Admin Page: ", err);
          setTimeout(() => {
            window.location.replace("/error");
          }, 4000);
        });
    }, 300);
  };
  let filteredList = null
  if (loadSuccess) {
    listTBody = <></>;
    filteredList = LIST_ACCOUNT.filter(
      (acc) => acc._id !== currentID ?? ""
    );

    listTBody = filteredList.map((acc, index) => (
      <tr className="text-center" key={acc._id}>
        <td>
          <h5>{++index}</h5>
          <p></p>
        </td>
        <td className="avt-user">
          <figure>
            <img
              src={`${_URLServer}/images/account/${acc._id}/${acc.NameAvt}`}
              alt="Avatar"
              style={{
                width: "32px",
                height: "32px",
              }}
            />
          </figure>
        </td>
        <td className="member">
          <div className="member-info div-text-name">
            <p>{acc.fullName}</p>
          </div>
        </td>
        <td className="td-email">
          <div className="div-text">
            <p>{acc.Email}</p>
          </div>
        </td>
        <td className="td-user user">
          <div className="div-text">
            <p>{acc.User}</p>
          </div>
        </td>
        <td className="status div-status">
          {!acc.isActive && (
            <span className="status-text status-orange">Chưa kích hoạt</span>
          )}
          {acc.isDeleted && (
            <span className="status-text status-red">Đang Khóa</span>
          )}
          {acc.isActive && !acc.isDeleted && (
            <span className="status-text status-green">Sẵn Sàng</span>
          )}
        </td>

        <td className="action">
          <a
            onClick={() => handleViewClick(acc)}
            className="btn btn-primary btn-sm"
          >
            <i className="fas fa-eye"></i> Xem
          </a>

          <a
            onClick={() => handleSendMail(acc)}
            href="#"
            className="btn btn-success btn-sm"
          >
            <i className="fas fa-envelope"></i> Gửi Email
          </a>
          <a
            onClick={() => handleSetStatus(acc)}
            href="#"
            className="btn btn-warning btn-sm"
          >
            {acc.isDeleted && (
              <>
                <span className="fas fa-key"></span>
              </>
            )}
            {!acc.isDeleted && (
              <>
                <span className="fas fa-ban"></span>
              </>
            )}
          </a>
        </td>
      </tr>
    ));
  }

  if (isProfile) {
    OpenModal = (
      <ProfileModal
        showModal={isProfile}
        handleClose={() => {
          setProfileModalOpen(false);
        }}
        ID={selectedRow?._id}
        NAME={selectedRow?.fullName}
        AVT={selectedRow?.NameAvt}
        EMAIL={selectedRow?.Email}
        me={false}
      />
    );
  }

  if (isSendMail) {
    // console.log(selectedRow?.Email);

    OpenModal = (
      <ConfirmSendEmail
        show={isSendMail}
        handleClose={() => {
          setSendMailOpen(false);
        }}
        EMAIL={selectedRow?.Email}
      />
    );
  }
  if (isSetStatus) {
    // console.log(selectedRow?.Email);

    OpenModal = (
      <SetStatus
        show={isSetStatus}
        handleClose={() => {
          setStatus(false);
        }}
        EMAIL={selectedRow?.Email}
        STATUS={selectedRow?.isDeleted}
      />
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href={`/css/admin/admin.css?v=${new Date().getTime()}`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/css/account/profile.css"
        />

        <link rel="stylesheet" type="text/css" href="/css/modal/addStaff.css" />
      </Helmet>

      {isLoading && <LoadingConponent />}

      {OpenModal}
      
      {
        <AddStaffModal
          show={showAddStaff}
          handleClose={closeAddStaff}
          clear={true}
        />
      }

      <div className="container">
        <div className="row">
          <main role="main" className="col-md-12 ml-sm-auto col-lg-12">
            <div className="projects mb-4">
              <div className="projects-inner">
                <header className="projects-header">
                  <div className="title">Danh sách nhân viên</div>
                  <div className="count">| {filteredList?.length } Người</div>

                  <div
                    className="btn btn-success btn-add-staff btn-header"
                    onClick={() => setshowAdd(true)}
                  >
                    Thêm Nhân Viên
                  </div>
                  {/* <div className="btn bg-white btn-sendemail-staff btn-header" >Gửi Email</div> */}

                  <div className="searchBox">
                    <input
                      id="searchInput"
                      className="searchInput"
                      type="text"
                      name=""
                      placeholder="Search"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearchInputChange(); // Gọi hàm tìm kiếm khi nhấn phím Enter
                        }
                      }}
                    />
                    <button
                      className="searchButton"
                      href="#"
                      onClick={handleSearchInputChange}
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </header>

                <table className="projects-table">
                  <thead>
                    <tr className="table-title text-center">
                      <th>#</th>
                      <th></th>
                      <th>Họ Và Tên</th>

                      <th>Email</th>
                      <th className="th-user user">User</th>
                      <th className="div-status">Trạng Thái</th>
                      <th className="text-right"></th>
                    </tr>
                  </thead>

                  <tbody id="tbody-table">{listTBody}</tbody>
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
