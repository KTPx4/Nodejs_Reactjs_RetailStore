import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { jwtDecode } from "jwt-decode";
import SalesCart from "../../components/Form/SalesCart";
import { Alert } from "react-bootstrap";
import {
  Avatar,
  Tooltip,
  Button,
  Moda,
  Modal,
  Table,
  Input,
  InputNumber,
} from "antd";
const _Root_IMG = __dirname + "img";

const SalesPage = () => {
  const Key_Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
  const _URLServer = process.env.REACT_APP_SERVER || "";
  const tokenLogin = localStorage.getItem(Key_Token_Auth) || "";

  const [LIST_PROD, setListProd] = useState(null);
  const [loadOk, setLoad] = useState(false);

  // value post to server
  const [currentStaff, setcurrentStaff] = useState(null);
  const [DisplayCart, setListCart] = useState(null); // list display in cart
  const [ListOrder, setListOrder] = useState(null); // list will post to server
  const [PhoneCust, setPhoneCust] = useState(null)
  const [AddressCust, setAddrCust] = useState(null)
  const [fullNameCust, setNameCust] = useState(null)
  const [ExMoney, setExMoney] = useState(-1);
  const [CusMoney, setCusmoney] = useState(0);

  //modal create order
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

 
  const [Err, setErr] = useState(false);

  const [secondModal, setSecondModal] = useState(false);
  const [isNewCust, setisNewCust] = useState(false);
  const [Customer, setCust] = useState(null)
  const [DisplayCust, setDisplay] = useState(false)


  const showModal = () => {
    setOpen(true);
  };

  const HandleMoney = () => {
    if (CusMoney < parseFloat(SumPrice)) {
      alert("Số tiền không đủ");
      setExMoney(-1);
      return;
    } else {
      setExMoney(CusMoney - parseFloat(SumPrice));
    }
  };

  const onChange = (value) => {
    setExMoney(-1);
    setErr(false);
    setCusmoney(value);
  };

  const handleOk = async() => {
    if (!secondModal) {
      let monyeCus = document
        .getElementById("moneyCustomer")
        ?.value?.split(" ")[1];

      if (ExMoney < 0 || monyeCus === 0 || !monyeCus) {
        setErr(true);
        return;
      }

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setSecondModal(true);
        // setOpen(false);
      }, 1000);
    }
    else 
    {
      if(PhoneCust === null || !PhoneCust)
      {
        alert("Vui lòng nhập số điện thoại khách hàng")
        return;
      }

      let name, addr
      if(isNewCust)
      {
         name = document.getElementById('NameCust').value
         addr = document.getElementById('CustAddr').value
        if(!name || name === null)
        {
          alert("Vui lòng nhập họ và tên khách hàng")
          return;
        }
        if(!addr || addr === null)
        {
          alert("Vui lòng nhập địa chỉ khách hàng")
          return;
        }
        setNameCust(name)
        setAddrCust(addr)
      }
    let SecondTime = false
     if(DisplayCust)
     {
      SecondTime = true
     }

      setLoading(true)

      // loading db
      let Server = _URLServer + "/api/orders"

      let PostData = {
          StaffEmail: currentStaff?.email,
         ListCart: ListOrder,
          phone: PhoneCust,
          MoneyGiven: CusMoney,
          MoneyExchange: ExMoney,
          fullName: name,
          Address: addr,
          secondTime: SecondTime
      }

        let Res = await PostOrder(Server, PostData)
    
      setTimeout(() => {
      
        let code = Res?.code
        let data = Res?.data
        if(code === 205)
        {
          setisNewCust(true);
          setLoading(false);        
          return
        }
        else if(code === 204) // display info customer
        {        
          setCust(data.customer)
          setLoading(false);        
          return
        }
        else if(code === 200)
        {  
          setisNewCust(false);
          setLoading(false);
          let id = data.order._id
          window.location.replace('/orders/bill?o=' + id)        
        }
        else
        {
          alert(data?.message)
        }
      
        // setOpen(false);
      }, 3000);

    }
  };

  const PostOrder = async(Server, PostData)=>
  {
    try{
      let res = await axios({
        url: Server,
        method: "POST",
        headers: {
          authorization: `Bear ${tokenLogin}`, // token auth login,
          "Content-Type": "application/json",
        },
        data: JSON.stringify(PostData),
      })
  
      return res.data          
    }
    catch(err)
    {
      console.log("Err at Post Order", err);
    }
    
  }
  const handleCancel = () => {
    setExMoney(-1);
    setSecondModal(false);  
    setDisplay(false)
    setisNewCust(false);
    setOpen(false);
  };

  const SearchProduct = () =>{
    let urlGet = _URLServer + "/api/products";
    let search = document.getElementById('searchProd').value
    
    LoadAll(urlGet, search);

  }
  // load list  from db
  const LoadAll = (server, search) => {
   
  
    server = server + "?search=" + search

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

  const AddToCart = (prod) => {
    if (!DisplayCart) {
      setListCart([{ ...prod, Count: 1 }]);
    } else {
      setListCart((prevListCart) => {
        const isBarcodeExist = prevListCart.some(
          (product) => product.BarCode === prod.BarCode
        );

        if (isBarcodeExist) {
          // If BarCode exists, increment the Count property
          return prevListCart.map((product) => {
            if (product.BarCode === prod.BarCode) {
              return { ...product, Count: product.Count + 1 };
            }
            return product;
          });
        } else {
          // If BarCode doesn't exist, add a new item with Count set to 1
          return [...prevListCart, { ...prod, Count: 1 }];
        }
      });
    }
  };

  const InCount = (pro) => {
    setListCart((prevList) => {
      return prevList.map((product) => {
        if (product.BarCode === pro.BarCode) {
          return { ...product, Count: product.Count + 1 };
        }
        return product;
      });
    });
  };
  const DeCount = (pro) => {
    let Count = 1;
    let newList = DisplayCart?.map((product) => {
      if (product.BarCode === pro.BarCode && product.Count === 1) {
        return null;
      } else if (product.BarCode === pro.BarCode && product.Count > 1) {
        return { ...product, Count: product.Count - 1 };
      } else {
        return product;
      }
    }).filter(Boolean);
    setListCart(newList);
  };

  useEffect(() => {
    document.title = "Bán Hàng";
    // Change icon
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `${_Root_IMG}/logo.png`;
    document.head.appendChild(link);
    let urlGet = _URLServer + "/api/products";
    LoadAll(urlGet, "");
    let decode = jwtDecode(tokenLogin);

    setcurrentStaff(decode);
  }, []);

  useEffect(() => {
    if (LIST_PROD?.length > 0) {
      setLoad(true);
    }
  }, [LIST_PROD]);


  useEffect(() => 
  {
    if (Customer) 
    {
      setDisplay(true);
    }
  }, [Customer]);

  let ListProduct = <></>;

  if (loadOk) {
    let index = 1;
    ListProduct = LIST_PROD?.map((pro) => {
      return (
        <tr className="table-title text-center" key={pro.BarCode}>
          <td>{index++}</td>
          <td className="tdImg columImg">
            <Tooltip title={pro.BarCode}>

            <img
              style={{
                width: 110,
                height: 70,
              }}
              alt="Sản Phẩm"
              // src={imagePath}
              src={pro.linkImg}
            />
            </Tooltip>
          </td>
          <td className="TDNameProduct">
            <div className="namePro">{pro.ProductName}</div>
          </td>
          <td className="th-user user">
            <p>{pro.DisplayPrice}</p>
          </td>

          <td className="text-right">
            <div className="d-flex justify-content-start">
              <Tooltip title="Thêm Vào">
                <Avatar
                  onClick={() => AddToCart(pro)}
                  className="btn-add"
                  shape="square"
                  size="large"
                  icon="+"
                  style={{ background: "#6e8293" }}
                />
              </Tooltip>
            </div>
          </td>
        </tr>
      );
    });
  }

  const columsModal = [
    {
      key: "firtColumn",
      dataIndex: "firtColumn",
    },
    {
      key: "secondColumn",
      dataIndex: "secondColumn",
    },
  ];

  let SumTotalProduct = document.getElementById("countSumProd")?.innerHTML;
  //    console.log(document.getElementById("countSumProd")?.innerHTML);
  let SecondForm = { key: "SecondFomr" };
  let NewCustForm = { key: "InputCust" };
 
  if (secondModal) {
    SecondForm = [
      {
        key: "custPhone",
        firtColumn: "Số Điện Thoại Khách Hàng",
        secondColumn: (
          <InputNumber 
          onChange={(value)=> setPhoneCust(value)}
          style={{ width: 160 }} 
          id="PhoneCust" 
          className="ml-3" />
        ),
      },
    ]; 
    
    if (isNewCust) {
      NewCustForm = [
        {
       
          key: "custName",
          firtColumn: "Họ Và Tên",
          secondColumn: <Input id="NameCust"  />,
        },
        {
          key: "addrCust",
          firtColumn: "Địa Chỉ",
          secondColumn: <Input id="CustAddr" />,
        },
      ];

      SecondForm = [...SecondForm, ...NewCustForm];
    }
  }

  if(DisplayCust)
  {
    let infoCustForm =[
      {       
        key: "custName",
        firtColumn: "Họ Và Tên",
        secondColumn: <Input id="NameCust" disabled={true} value={Customer.fullName} />,
      },
      {
        key: "addrCust",
        firtColumn: "Địa Chỉ",
        secondColumn: <Input id="CustAddr"  disabled={true} value={Customer.Address}/>,
      },
    ]
    SecondForm = [...SecondForm, ...infoCustForm];
  }

  let SumPrice = document.getElementById("sumPriceProds")?.value;
  let rowModal = [
    {
      key: "nameStaff",
      firtColumn: "Tên Nhân Viên",
      secondColumn: currentStaff?.fullName,
    },
    {
      key: "emailStaff",
      firtColumn: "Email Nhân Viên",
      secondColumn: currentStaff?.email,
    },
    {
      key: "sumProducts",
      firtColumn: "Tổng Số Sản Phẩm",
      secondColumn: (
        <>
          <InputNumber defaultValue={SumTotalProduct} disabled={true} />
        </>
      ),
    },
    {
      key: "total",
      firtColumn: "Tổng Giá Tiền",
      secondColumn: (
        <>
          <InputNumber
            style={{ width: 140 }}
            id="totalPrice"
            defaultValue={SumPrice}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            disabled={true}
          />
        </>
      ),
    },
    {
      key: "givemoney",
      firtColumn: "Tiền Khách Đưa",
      secondColumn: (
        <>
          <InputNumber
            disabled={secondModal}
            style={{ width: 140 }}
            id="moneyCustomer"
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={onChange}
            onBlur={HandleMoney}
          />
        </>
      ),
    },
    {
      key: "exchange",
      firtColumn: "Tiền Thối Lại",
      secondColumn: (
        <>
          <InputNumber
            style={{ width: 140 }}
            id="moneyExchange"
            value={ExMoney}
            defaultValue={0}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            disabled={true}
          />
        </>
      ),
    },
  ];
  if (secondModal) {
    rowModal = [...rowModal, ...SecondForm];
  }

  let FirtFormOrder = <></>;
  if (open) {
    FirtFormOrder = (
      <Modal
        centered
        open={open}
        title={<div className="text-center">Nhập Thông Tin Thanh Toán</div>}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          Err && (
            <Alert key="AlertFailed" className="text-center" variant="warning">
              Vui lòng nhập số tiền khách đưa để tiếp tục
            </Alert>
          ),
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
          </Button>,
          ,
        ]}
      >
        <Table dataSource={rowModal} columns={columsModal} pagination={false} />
      </Modal>
    );
  }
  if (secondModal) {
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <link rel="stylesheet" href="/css/product/sales.css" />
        </Helmet>
        {FirtFormOrder}
        <div className="row">
          <div className="col-12 col-lg-5">
            <div className="projects mb-4">
              <div className="projects-inner">
                <header className="projects-header ">
                  <div className="container ">
                    <div className="row text-center">
                      <div className="title ">Danh sách sản phẩm | {LIST_PROD?.length || 0}</div>
                    </div>
                    <div className="row text-center">
                      <div className="wrap col-12">
                        <div className="search d-flex justify-content-center mt-2">
                          <input
                            
                            id="searchProd"
                            type="text"
                            className="searchTerm"
                            placeholder="BarCode | Tên Sản Phẩm"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                SearchProduct(); // Gọi hàm tìm kiếm khi nhấn phím Enter
                              }
                            }}
                          />
                          <button
                            onClick={SearchProduct}
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
                    <tbody id="tbody-table">{ListProduct}</tbody>
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
                    ListProduct={DisplayCart}
                    inCount={InCount}
                    deCount={DeCount}
                    clearList={() => setListCart(null)}
                    showModal={showModal}
                    setListOrder={(listOrder) => setListOrder(listOrder)}
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
