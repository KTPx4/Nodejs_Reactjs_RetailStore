import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

import { Table, Modal} from "antd";

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || "TOKEN_AUTH_LOGIN";
const tokenLogin = localStorage.getItem(_Token_Auth) || "";
const urlServer = process.env.REACT_APP_SERVER || "";
var urlCustOr= urlServer + "/api/orders/customer?phone=";


const ViewCustTab = ({isOpen,HandleClose , CustPhone}) => {
    console.log(CustPhone);
    const [listOrder, setListOd] = useState(null)
    const [loadOk, setLoadOk] = useState(false)
    
    useEffect(()=>{
        let url = urlCustOr + CustPhone
        GetOrder(url)

    }, [])

    useEffect(()=>{
        if(listOrder && listOrder?.length > 0)
        {
            setLoadOk(true)
        }
    }, [listOrder])
    let dataSource = null
           
      const columns = [
        {
          title: 'ID Order',
          dataIndex: 'IDOrder',
          key: 'IDOrder',
          className:"text-center"
        },
        {
          title: 'Tổng Thanh Toán',
          dataIndex: 'ToltalPayment',
          key: 'ToltalPayment',
          className: "product-name text-center"          
        },
        {
          title: 'Tiền Khách Đưa',
          dataIndex: 'MoneyGiven',
          key: 'MoneyGiven',
          className:"text-center"
        },
        {
          title: 'Tiền Thối Lại',
          dataIndex: 'MoneyExchange',
          key: 'MoneyExchange',
          className:"text-center"
        },
        {
          title: 'Ngày Tạo',
          dataIndex: 'CreateAt',
          key: 'CreateAt',
          className:"text-center"
        },
      ];

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
            setListOd(res.data.data.orders)
           
          } 
          else 
          {
            setListOd(null)
            // window.location.replace('/')
          }
        })
        .catch((err) => 
        {
          console.log(err);
        //   window.location.replace('/error')
          return 400;
        });
      }

      if(loadOk)
      {
        
        dataSource = listOrder.map(od =>(
            {
               key: od._id ,
               IDOrder: [<a key={"a"+ od._id} href={"/orders/bill?o=" + od._id}> {od._id } </a>],
               ToltalPayment: formatMoney(od.ToltalPayment),
               MoneyGiven: formatMoney(od.MoneyGiven),
               MoneyExchange: formatMoney(od.MoneyExchange),
               CreateAt: od.CreateAt,
            }
        ))
        console.log(dataSource);
      }

let modal = <></>
if(isOpen)
{
    modal =(<Modal
        title="Thông Tin Sản Phẩm"
        centered
        open={isOpen}
        onOk={()=>{
            setListOd(null)
            setLoadOk(false) 
            HandleClose()
        }}
        onCancel={HandleClose}
      >
        {isOpen && <Table pagination={false} dataSource={dataSource} columns={columns} />}
        {/* <Descriptions
          bordered
          style={{ maxHeight: 400, overflow: "scroll" }}
          column={1}
          title=""
          items={items}
        /> */}
      </Modal>)
}
    return (
    <>
      {modal}
    </>
  );
}

function formatMoney(str) {
    // Remove any non-digit characters from the string
    if(!str) return ""

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

export default ViewCustTab;
