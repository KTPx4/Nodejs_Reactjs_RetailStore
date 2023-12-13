import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { jwtDecode } from "jwt-decode";
import { Avatar } from "antd";
import SalesCart from "../../components/Form/SalesCart";
const _Root_IMG = __dirname + "img";

const SalesPage = () => {
  const Key_Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
  const _URLServer = process.env.REACT_APP_SERVER || "";
  const tokenLogin = localStorage.getItem(Key_Token_Auth) || "";

  const [LIST_PROD, setListProd] = useState(null);
  const [loadOk, setLoad] = useState(false);

  // ID staff sale -> export bill
  const [currentStaff, setcurrentStaff] = useState(null);

  const [ListCart, setListCart] = useState(null);

  // load list  from db
  const LoadAll = (server) => {   
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
          let code = res.data.code;

          if (code === 400) {
            alert(res.data.message);
          } else if (code === 500) {
            window.location.replace("/error");
          } else if (code === 200) {
            let listProd = res.data.data.products;
            setListProd(listProd);
          } else {
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

  const AddToCart =(prod) =>{
    if (!ListCart) {
        setListCart([
            {...prod, Count: 1}
        ]);
      } 
    else 
    {
        setListCart((prevListCart) => 
        {
            const isBarcodeExist = prevListCart.some(product => product.BarCode === prod.BarCode);
        
            if (isBarcodeExist) 
            {
              // If BarCode exists, increment the Count property
              return prevListCart.map((product) => 
              {
                if (product.BarCode ===  prod.BarCode) 
                {
                  return { ...product, Count: product.Count + 1 };
                }
                return product;
              });
            } 
            else 
            {
              // If BarCode doesn't exist, add a new item with Count set to 1
              return [...prevListCart, { ...prod, Count: 1 }];
            }
        });
  }
    }

    const InCount = (pro) =>
    {
        setListCart((prevList =>{
            return prevList.map(product=>{
                if(product.BarCode === pro.BarCode)
                {
                    return {...product, Count: product.Count+1}
                }
                return product
            })
        }))
    }
    const DeCount = (pro) =>{
        let Count = 1
        let newList = ListCart?.map(product=>{
            if(product.BarCode === pro.BarCode && product.Count === 1)
            {
              return null
            }
            else if(product.BarCode === pro.BarCode && product.Count > 1)
            {
                return {...product, Count: product.Count-1}
            }
            else{
                return product
            }
        }).filter(Boolean)
        setListCart(newList)
       
    }

  useEffect(() => {
    document.title = "Bán Hàng";
    // Change icon
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `${_Root_IMG}/logo.png`;
    document.head.appendChild(link);
    let urlGet = _URLServer + "/api/products"
    LoadAll(urlGet)
    let decode = jwtDecode(tokenLogin);
  
    setcurrentStaff(decode);
  }, []);

  useEffect(() => {
    if (LIST_PROD?.length > 0) {
      setLoad(true);
    }
  }, [LIST_PROD]);

  let ListProduct = <></>;

  if (loadOk) {
    let index = 1
    ListProduct = LIST_PROD?.map((pro) => {
      return (
        <tr className="table-title text-center" key={pro.BarCode}> 
          <td>{index++}</td>
          <td className="tdImg columImg">
            <img
              style={{
                width: 110,
                height: 70,
              }}
              alt="Sản Phẩm"
              // src={imagePath}
              src={pro.linkImg}
            />
          </td>
          <td className="TDNameProduct">
            <div className="namePro">
              {pro.ProductName}
            </div>
          </td>
          <td className="th-user user">
            <p>{pro.DisplayPrice}</p>
          </td>
          <td className="text-right">
            <div className="d-flex justify-content-start">
              <Avatar
                onClick={()=> AddToCart(pro)}
                className="btn-add"
                shape="square"
                size="large"
                icon="+"
                style={{ background: "#6e8293" }}
              />
            </div>
          </td>
        </tr>
      );
    });
   
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <link rel="stylesheet" href="/css/product/sales.css" />
        </Helmet>
        <div className="row">
          <div className="col-12 col-lg-5">
            <div className="projects mb-4">
              <div className="projects-inner">
                <header className="projects-header ">
                  <div className="container ">
                    <div className="row text-center">
                      <div className="title ">Danh sách sản phẩm | 1</div>
                    </div>
                    <div className="row text-center">
                      <div className="wrap col-12">
                        <div className="search d-flex justify-content-center">
                          <input
                            id="searchProd"
                            type="text"
                            className="searchTerm"
                            placeholder="BarCode || Tên Sản Phẩm"
                          />
                          <button
                            onClick={() => {
                              
                            }}
                            type="submit"
                            className="searchButton"
                          >
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </header>
              </div>

              <div className="row list-product  d-flex justify-content-start">
                {/* Content load from db */}
                <div className="listPro">
                    <table className="projects-table">
                    <thead>
                        <tr className="table-title text-center">
                        <th>#</th>
                        <th className="columImg"></th>
                        <th className="THNameProduct">Tên Sản Phẩm</th>
                        <th className="th-user user">Giá</th>
                        <th className="text-right"></th>
                        </tr>
                    </thead>
                    {/* content */}
                    <tbody id="tbody-table">
                        {ListProduct}
                    
                    </tbody>
                    </table>
                    
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7 main-form">
            <div className=" mb-4">
              <div className="">
                <header className="projects-header d-flex justify-content-center">
                  <div className="title">Danh sách thanh toán </div>
                </header>
              </div>

              <div className="row form-cart">
                <div className="content">
                 
                  <SalesCart 
                    ListProduct={ListCart} 
                    inCount={InCount} 
                    deCount={DeCount}
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </HelmetProvider>
    </>
  );
};

export default SalesPage;
