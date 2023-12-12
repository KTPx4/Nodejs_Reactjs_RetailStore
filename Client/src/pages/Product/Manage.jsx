import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LoadingConponent from "../../components/Loading/LoadingComponent";
import ViewProductTab from "../../components/Modal/viewProduct";
import AddProductTab from "../../components/Modal/Addproduct";
import EditProductTab from "../../components/Modal/EditProduct";
import { useSelector } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  EyeFilled,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Button,
  Popconfirm,
  Select,
  notification,
  Badge,
  Alert,
} from "antd";

const { Meta } = Card;
const { Option } = Select;

const _Root_IMG = __dirname + "img";

const ProductPage = (props) => {
  const Key_Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
  const _URLServer = process.env.REACT_APP_SERVER || "";
  const tokenLogin = localStorage.getItem(Key_Token_Auth) || "";
  const isAdmin = useSelector((state) => state.isAdmin);

  const [openAdd, setOpenAdd] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [LIST_PROD, setListProd] = useState(null);
  const [loadOk, setLoad] = useState(false);

  const [ErrorMess, setError] = useState("");
  const [SuccessMess, setSuccess] = useState("");

  const [openView, setModalView] = useState(false)
  const [currentProd, setCurrPro] = useState(null)

  const [openEdit, setModalEdit] = useState(false)

  // Notice add success
  const [AddNotice, setAddNotice] = useState(false);
  const [SuccessNotice, setSuccessNotice] = useState(false);
  const [ErrNotice, setErrNotice] = useState(false);
  let List_Content = <></>;

  useEffect(() => {
    if (AddNotice) {
      notification.open({
        placement: "bottomLeft",
        className: "bg-success text-light",
        message: "Thêm Sản Phẩm Thành Công",
        description: "Một Sản Phẩm Đã Được Thêm",
        icon: <CheckCircleOutlined style={{ color: "#ffff" }} />,
      });
      setAddNotice(false);
    }

    if (SuccessNotice) {
      notification.open({
        placement: "bottomLeft",
        className: "bg-success text-light",
        message: "Thao Tác Thành Công",
        description: "Hành động đã được thực thi",
        icon: <CheckCircleOutlined style={{ color: "#ffff" }} />,
      });
      setSuccessNotice(false);
    }

    if (ErrNotice) {
      notification.open({
        placement: "bottomLeft",
        className: "bg-danger text-light",
        message: "Thao Tác Không Thành Công",
        description:
          "Hành động không thể thực hiện. Vui lòng thử lại sau",
        icon: <CheckCircleOutlined style={{ color: "#ffff" }} />,
      });

      setErrNotice(false);
    }
  }, [AddNotice, SuccessNotice, ErrNotice]);

  // show notice add success
  const openNotiAdd = (prod) => {
    setListProd((pre) => [...pre, prod]);
  
    setAddNotice(true);
  };

  const openNotiEdit = (prod) => {
    setListProd(
      LIST_PROD.map(product => 
      {
        if (product.BarCode === prod.BarCode) {
          return prod;
        } 
        else 
        {
          return product;
        }
      })
    )
    setSuccessNotice(true);
  };

  const openNotiFail = ( )=> setErrNotice(true)

  //  search item
  const handleSearchInputChange = () => {
    let value = document.getElementById("searchInput").value;
    setSearchTerm(value);
  };

  // show input add
  const showDrawer = () => {
    setOpenAdd(true);
  };

  // show edit
  const EditProduct = (prod) => 
  {
    setCurrPro(prod)
    setModalEdit(true)
  };

  const ViewProduct = (prod) =>{
    setCurrPro(prod)
    setModalView(true)
  }
  // delete
  const DeleteProduct = async (prod) => {
    try {
      let url = _URLServer + "/api/products/" + prod.BarCode;
      let res = await SendDelete(url, tokenLogin);
      let code = res.code;
      if (code === 200) {
        let pro = res.data.product;
        setSuccessNotice(true);
        setListProd((prevList) =>
          prevList.filter((product) => product.BarCode !== pro.BarCode)
        );
      } else {
        setErrNotice(true);
      }
    } catch (error) {}
  };

  // load list  from db
  const LoadAll = () => {
    setLoading(true);
    setTimeout(async () => {
      await axios({
        url: _URLServer + "/api/products",
        method: "GET",
        headers: {
          authorization: `Bear ${tokenLogin}`, // token auth login,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setLoading(false)
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

  useEffect(() => {
    document.title = "Sản Phẩm";
    LoadAll();

    // Change icon
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `${_Root_IMG}/logo.png`;
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (LIST_PROD?.length > 0) {
      setLoad(true);
    }
    
  }, [LIST_PROD]);

  



  if (loadOk) {
    List_Content = LIST_PROD?.map((pro) => {
      const lowerCaseCategory = pro.Category.map((category) =>
        category.toLowerCase()
      );

      const isLaptopCategory = lowerCaseCategory.includes("laptop");

      const isPhone = lowerCaseCategory.includes("phone");

      const imagePath = isLaptopCategory
        ? "/img/product/laptop/laptop.jpg"
        : isPhone
        ? "/img/product/phone/phone.jpg"
        : "/img/product/gear/gear.jpg";

      let AdminEdit = null;
      let AdminDelete = null
      if (isAdmin) {
        AdminEdit = <EditOutlined onClick={() => EditProduct(pro)} />;
        AdminDelete =    
       ( <Popconfirm
        onConfirm={() => DeleteProduct(pro)}
        title="Xóa Sản Phẩm"
        description="Bạn muốn xóa sản phẩm này chứ?"
        icon={
          <QuestionCircleOutlined
            style={{
              color: "red",
            }}
          />
        }
      >
        <DeleteOutlined />
      </Popconfirm>)
      }

      return (
        <div
          className="m-3 col-12 col-sm-4 col-md-3  col-xl-2 d-flex justify-content-center"
          key={pro.BarCode}
        >
          <Card
            style={{ width: 250 }}
            cover={
              <img
                style={{
                  width: 250,
                  height: 150,
                }}
                alt="Sản Phẩm"
                // src={imagePath}
                src={pro.linkImg}
              />
            }
            actions={[<EyeFilled onClick={()=>ViewProduct(pro)}/>, AdminEdit, AdminDelete]}
          >
            <Badge
              classNames="money"
              count={formatMoney(pro.DisplayPrice)}
              showZero
              color="#faad14"
            />
            <Meta
              className="mt-1"
              title={pro.ProductName}
              description={pro.Description}
            />
          </Card>
        </div>
      );
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }


  let AlertMess = <></>;
  if (ErrorMess) {
    AlertMess = (
      <Alert message="Lỗi" description={ErrorMess} type="error" showIcon />
    );
  }

  if (SuccessMess) {
    AlertMess = (
      <Alert
        message="Thao Tác Thành Công"
        description={SuccessMess}
        type="success"
        showIcon
      />
    );
  }
let ModalDisplay = <></>

if(openView)
{
  ModalDisplay = 
      <ViewProductTab 
          isOpen={openView}
          HandleClose={() => setModalView(false)}    
          Product={currentProd}    
      />     
}
if(openEdit)
{
  ModalDisplay = 
    <EditProductTab 
      isOpen={openEdit}
      HandleClose= {()=> setModalEdit(false)}
      HandleSuccess={openNotiEdit}
      HandleFailed={openNotiFail}
      Product={currentProd}    
    />
}

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
      {ModalDisplay}
      <AddProductTab
        isOpen={openAdd}
        HandleClose={() => setOpenAdd(false)}
        HandleSuccess={openNotiAdd}
      />

      <div className="container"></div>
      <div className="row">
        <main role="main" className="col-md-12 ml-sm-auto col-lg-12">
          <div className="projects mb-4">
            <div className="projects-inner">
              <header className="projects-header">
                <div className="title">Danh sách sản phẩm</div>
                <div className="count">| {LIST_PROD?.length}</div>
                {isAdmin && (
                <div
                  className="btn bg-light btn-add-prod btn-header"
                  onClick={showDrawer}
                >
                  Thêm Sản Phẩm
                </div>)}
                
              </header>
            </div>
            <div className="row list-product  d-flex justify-content-start">
              {/* Content load from db */}
              {List_Content}
            </div>
          </div>
        </main>
      </div>
    </HelmetProvider>
  );
};
function formatMoney(str) {
  // Remove any non-digit characters from the string
  let num = str.toString().replace(/\D/g, "");

  // Convert the string to a number
  let val = Number(num);

  // Check if the number has decimal places
  if (num.indexOf('.') !== -1) {
    // If there are decimal places, format as currency with exact decimal places
    return "$" + val.toLocaleString(undefined, { minimumFractionDigits: num.split('.')[1].length, maximumFractionDigits: num.split('.')[1].length });
  } else {
    // If it's an integer, format as currency without decimal places
    return "$" + val.toLocaleString();
  }
}
// function formatMoney(str) {
//   // Remove any non-digit characters from the string
//   let num = str.toString().replace(/\D/g, "");
//   // Convert the string to a number and divide by 100
//   let val = Number(num) / 100;
//   // Format the number as a currency string
//   return "$" + val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
// }

const SendDelete = async (server, tokenLogin) => {
  try {
    const res = await axios({
      url: server,
      method: "DELETE",
      headers: {
        authorization: `bearer ${tokenLogin}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    console.log("Error at 'Add Product' - SendAdd: ", err);
    return {
      code: 500,
      data: {
        role: "null",
        email: "null",
      },
      message: "Không thể kết nối server hoặc server bị lỗi",
    };
  }
};

export default ProductPage;
