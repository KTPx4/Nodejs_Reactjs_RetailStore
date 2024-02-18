import React from 'react';
import { Table } from 'antd';
import { useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";

const _Root_IMG = __dirname + "img";
const Key_Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
const _URLServer = process.env.REACT_APP_SERVER || "";
var SGetBill = `${_URLServer}/api/orders/`;

const ExportBill = () => {
    const location = useLocation();
    const searchParam = new URLSearchParams(location.search);
    const idOrder = searchParam.get("o");

    const tokenLogin = localStorage.getItem(Key_Token_Auth) || "";
    
    const [Order, setOrder] = useState(null)
    const [loadOrder, setLoadOrder] = useState(false)

    useEffect(() => {
        let url = SGetBill + idOrder;
       
        if (!idOrder) 
        {    
            window.location.replace('/')           
        }
        else
        {
            GetOrder(url)
        }
    
        document.title = "Kích Hoạt";
    
        // Change icon
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = `${_Root_IMG}/logo.png`;
        document.head.appendChild(link);
      }, []);

      useEffect(()=>{
        if(Order)
        {
            setLoadOrder(true)
            // console.log(Order);
        }
      }, [Order])

      const GetOrder = async(url) =>
      {
        await axios({
            url: url,
            method: "GET",
            headers: {
              authorization: `Bear ${tokenLogin}`, // token auth login,
              "Content-Type": "application/json",
            },
        })       
        .then((res) => 
        {
            
          let code = res.data.code;     
            
          if (code === 200) 
          {
            let data = res.data.data.orders         
            setOrder(data)
          } 
          else 
          {
            window.location.replace('/')
          }
        })
        .catch((err) => 
        {
          console.log(err);
          window.location.replace('/error')
          return 400;
        });
      }

    let dataSource = null
           
      const columns = [
        {
          title: 'BarCode',
          dataIndex: 'BarCode',
          key: 'BarCode',
          className:"text-center"
        },
        {
          title: 'Tên Sản Phẩm',
          dataIndex: 'Name',
          key: 'Name',
          className: "product-name text-center"          
        },
        {
          title: 'Giá',
          dataIndex: 'price',
          key: 'price',
          className:"text-center"
        },
        {
          title: 'Số Lượng',
          dataIndex: 'quantity',
          key: 'quantity',
          className:"text-center"
        },
        {
          title: 'Tổng Tiền',
          dataIndex: 'total',
          key: 'total',
          className:"text-center"
        },
      ];

let orderID, time ,custName, custAddr, custPhone, Email, TotalMoney, givenMoney, exchangeMoney
if(loadOrder)
{
    
    orderID= Order._id
    time = Order.CreateAt
    custName = Order.Customer.fullName
    custAddr = Order.Customer.Address
    custPhone = Order.Customer.Phone
    Email = Order.StaffEmail
    TotalMoney = Order.ToltalPayment
    givenMoney = Order.MoneyGiven
    exchangeMoney = Order.MoneyExchange
    
    dataSource = Order.productList.map(prod =>(
        {
            key: prod.ListProduct.BarCode,
            BarCode: prod.ListProduct.BarCode,
            Name: prod.ListProduct.ProductName,
            price: formatMoney(prod.ListProduct.DisplayPrice),
            quantity: prod.ListProduct.Quantity,
            total: formatMoney(parseFloat(prod.ListProduct.DisplayPrice)* parseInt( prod.ListProduct.Quantity)),
        }
    ))
   
}

  return (
<HelmetProvider>
<Helmet>
        <link rel="stylesheet" type="text/css" href="/css/order/export.css" />
      </Helmet>

    <div id="example">
    <div className="box wide hidden-on-narrow">
      <div className="box-col" />

      <div className="box-col" />
    </div>

    <div className="page-container hidden-on-narrow">
      <div className="pdf-page size-a4">
        <div className="inner-page">
          <div className="pdf-header">
            <span className="company-logo">
              Phiếu mua hàng
            </span>

            <span className="invoice-number">
                Mã #{orderID}
                <br /> 
                Thời gian: {new Date(time).toLocaleString()}           
            </span>            
            
          </div>

          <div className="pdf-footer">
            <p>
                Px4 Store
              <br />
              From Long An with Love             
            </p>
          </div>

          <div className="addresses">
            <div className="for">
              <h3>Khách Hàng</h3>

              <p className='cust-info'>
                <strong>{custName}</strong>
                <br />
                <strong>Địa Chỉ:</strong> "{custAddr}"
                <br />
               <strong>Số Điện Thoại:</strong> "{custPhone}"
              </p>
            </div>

            <div className="from">
              <h3>Thông Tin</h3>
              <p>
                <strong>Email Nhân Viên:</strong>  "{Email}"
                <br />
                <strong>Tổng Sản Tiền:</strong> {formatMoney(TotalMoney)}
                <br />
                <strong>Tiền Khách Đưa:</strong> {formatMoney(givenMoney)}
                <br />
                <strong>Tiền Thối:</strong> {formatMoney(exchangeMoney)}
              </p>

            
            </div>
          </div>

          <div className="pdf-chart" />

          <div className="pdf-body">
            <div id="grid" />
            <Table pagination={false} dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  </div>

</HelmetProvider>
  );
};

function formatMoney(str) {
    if(!str) return ""
    // Remove any non-digit characters from the string
    let num = str.toString().replace(/\D/g, "");
  
    // Check if the number has decimal places
    if (num.indexOf('.') !== -1) {
      // Convert the string to a number and format as currency with decimal places
      let val = Number(num);
      return "$" + val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      // Convert the string to a number and format as currency without decimal places
      let val = Number(num);
      return "$" + val.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  }

export default ExportBill;
