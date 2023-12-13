import React from "react"
import axios from "axios"
import {ShoppingCartOutlined} from "@ant-design/icons"
import {Table,
     Avatar, 
     InputNumber,
    } from "antd"


const SalesCart = ({ListProduct, inCount, deCount}) =>{

    let dataSource = []

    if(ListProduct?.length > 0)
    {
        
        let index =1 
        dataSource = ListProduct.map((pro)=>(               
            {
                key: pro.BarCode.toString(),
                stt: (index++).toString(),
                nameProd: pro.ProductName,
                priceProd: pro.DisplayPrice,
                quantityProd: pro.Count,
                priceProds: (parseFloat(pro.DisplayPrice)* parseFloat(pro.Count)),
                action : 
                [
                    <Avatar
                    key="upCount"
                    className="btn-add"
                    shape="square"
                    size="large"
                    icon="+"
                    onClick={()=> inCount(pro)}
                    style={{ marginRight: 3 ,background: "#6e8293" }}
                    />,
                    <Avatar
                    key="downCount"
                    className="btn-add"
                    shape="square"
                    size="large"
                    icon="-"
                    onClick={()=> deCount(pro)}
                    style={{ marginRight: 3 , background: "#6e8293" }}
                    />

                ]
            }
        ))
        
    }
    // [
    //     {
    //       key: '1',
    //       stt: '1',
    //       nameProd: "Aple Watch",
    //       priceProd: "$999",
    //       quantityProd: 10,
    //       priceProds: "$9990",
    //       action : 
    //       [
    //           <Avatar
    //             className="btn-add"
    //             shape="square"
    //             size="large"
    //             icon="+"
    //             style={{ marginRight: 3 ,background: "#6e8293" }}
    //             />,
    //           <Avatar
    //             className="btn-add"
    //             shape="square"
    //             size="large"
    //             icon="-"
    //             style={{ marginRight: 3 , background: "#6e8293" }}
    //             />

    //       ]
    //     }
    //   ];
      
      const columns = [
        {
          title: 'STT',
          dataIndex: 'stt',
          key: 'stt',
        },
        {
          title: 'Tên sản phẩm',
          dataIndex: 'nameProd',
          key: 'nameProd',
        },
        {
            title: "Giá",
            dataIndex: 'priceProd',
            key: 'pricePro',
        },
        {
          title: 'Số lượng',
          dataIndex: 'quantityProd',
          key: 'quantityPro',
        },
        {
          title: 'Thành tiền',
          dataIndex: 'priceProds',
          key: 'pricePros',
        },
        
        {
            title: 'Hành Động',
            dataIndex: 'action',
            key: 'action'
        }
      ];
  let SumPrice = 0
  let SumTotalProduct  = 0
    if(dataSource?.length > 0)
    {
        dataSource.forEach(row=>{
            SumPrice += parseFloat(row.priceProds)
            SumTotalProduct += parseInt(row.quantityProd)
        })
    }
    return(
        <>
        <div className="Count m-2 ">
            <div >
            <h5><ShoppingCartOutlined /> Tổng Sản Phẩm: <i className="SumTotalProduct">{SumTotalProduct}</i>
                   
                </h5>
            </div>
            <div className="d-flex justify-content-start">    
                <InputNumber className="ml-3" readOnly addonAfter="$" value={SumPrice} 
            
                />

                <div className="btn btn-success" style={{marginLeft: 10, height: 35}}>Thanh Toán</div>      
            </div>
        </div>
        <div className="table-list">
         <Table dataSource={dataSource} columns={columns}  pagination={false} />

        </div>
        </>
    )
}
export default SalesCart