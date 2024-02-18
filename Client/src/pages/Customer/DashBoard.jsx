import { useEffect, useState } from "react";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LoadingConponent from "../../components/Loading/LoadingComponent";
import axios from "axios";
import ViewCustTab from "./ViewCust";

const _Root_IMG = __dirname + "img";

const CustomerPage = () => {
const Key_Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
  const _URLServer = process.env.REACT_APP_SERVER || "";
  const tokenLogin = localStorage.getItem(Key_Token_Auth) || "";

    const [loadOk, setLoadOk] = useState(false)
    const [List_Cust, setListCust] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [showCust, setShowCust] = useState(false)
    const [currentCust, setCurrCust] = useState(null)

 

  useEffect(() => {


    LoadAll("")

    document.title = "Quản lý khách hàng";
    // Change icon
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `${_Root_IMG}/logo.png`;
    document.head.appendChild(link);
  }, []);

  useEffect(()=>{
    if(List_Cust)
    {
        setLoadOk(true)
    }
  }, [List_Cust])

useEffect(()=>{
    if(currentCust)
    {
        setShowCust(true)
    }

}, [currentCust])
  const ViewCust = (cust) =>{
    setCurrCust(cust)
 

  }

  const SearchCust = () =>{
    let search = document.getElementById('searchInput').value
  
    LoadAll(search)
  }

  const LoadAll = (search) => {
    setLoading(true);
    let server =  _URLServer + "/api/customers?search=" + search
    setTimeout(async () => {
      await axios({
        url: server,
        method: "GET",
        headers: {
          authorization: `Bear ${tokenLogin}`, // token auth login,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setLoading(false)
          let code = res.data.code;
          if (code === 400) 
          {
            alert(res.data.message);
          } else if (code === 500) 
          {
            window.location.replace("/error");
          } 
          else if (code === 200) 
          {
           
            setListCust(res.data?.data.customers)           
          } 
          else 
          {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log("Error at login fetch: ", err);
          setTimeout(() => {
            window.location.replace("/error");
          }, 4000);
        });
    }, 500);
  };

  let List_Body = <></>
  if(loadOk)
  {
    let index = 1
    List_Body = List_Cust?.map(cust=>(
        <tr className="text-center" key={cust.Phone}>
        <td>
          <h5>{index++}</h5>
          <p></p>
        </td>
       
        <td className="member">
          <div className="member-info div-text-name">
            <p>{cust.fullName}</p>
          </div>
        </td>
        <td className="td-email">
          <div className="div-text">
            <p>{cust.Phone}</p>
          </div>
        </td>
        <td className="td-user user">
          <div className="div-text">
          <p>{cust.Address}</p>
          </div>
        </td>                    

        <td className="action">
          <a
            onClick={() => {ViewCust(cust)}}
            className="btn btn-primary btn-sm"
          >
            <i className="fas fa-eye"></i> Xem
          </a>                                   
          
        </td>
      </tr>
    ))
  }

  let Modal = <></>
if(showCust)
{
    Modal =  <ViewCustTab 
    isOpen={showCust}
    HandleClose = {()=>{
        setShowCust(false)
        setCurrCust(null)
    }}
    CustPhone ={currentCust?.Phone}
    />
}

  return (
    <HelmetProvider>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="/css/customer/dashboard.css"
        />
      </Helmet>
        {isLoading && <LoadingConponent/>}

        {Modal}
        

     

      <div className="container">
        <div className="row">
          <main role="main" className="col-md-12 ml-sm-auto col-lg-12">
            <div className="projects mb-4">
              <div className="projects-inner">
                <header className="projects-header">
                  <div className="title">Danh sách khách hàng</div>
                  <div className="count">| {List_Cust?.length} Người</div>

                  <div className="searchBox">
                    <input
                      id="searchInput"
                      className="searchInput"
                      type="text"
                      name=""
                      placeholder="Search"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            SearchCust()
                        }
                      }}
                    />
                    <button
                      className="searchButton"
                      href="#"
                        onClick={SearchCust}
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </header>

                <table className="projects-table">
                  <thead>
                    <tr className="table-title text-center">
                      <th>#</th>
                      <th>Họ Và Tên</th>
                      <th>Số Điện Thoại</th>
                      <th className="th-user user">Địa chỉ</th>
                      <th className="text-right"></th>
                    </tr>
                  </thead>

                  <tbody id="tbody-table">
                    
                   {List_Body}

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
export default CustomerPage;
