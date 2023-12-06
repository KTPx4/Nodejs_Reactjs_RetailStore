import { useState, useContext, createContext, useEffect} from 'react';

import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const _Root_IMG = __dirname + "img/admin";

const AdminPage = () =>{
    useEffect(() =>{

        document.title= "Quản Lý Tài Khoản";     
        // Change icon
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = `${_Root_IMG}/admin.png`; 
        document.head.appendChild(link);
    }, [])


    return (
      <HelmetProvider>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/css/admin.css" />
        </Helmet>
        <Container>
          <div className="Content-Heading">
            <Row className="Content-Heading-Title text-center">
              <Col xs={12}>
                <h4>Quản Lý Tài Khoản</h4>
              </Col>
            </Row>
          </div>

          <div className="Content-Body">
            {/* <Row className="Content-Body-ListStaff ">
              <table id='Table-List-Staff'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th></th>
                    <th>Họ Và Tên</th>
                    <th>Email</th>
                    <th>User</th>
                    <th>Trạng Thái</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='cardtest'>
                    <td>1</td>
                    <td>
                        <img src="/img/home/home.png" alt="" />
                    </td>
                    <td>Nguyễn Văn A</td>
                    <td>nguyenvana@gmail.com</td>
                    <td>nguyenvana</td>
                    <td>Đã Kích Hoạt</td>
                    <td>
                    
                    </td>
                  </tr>
                  <tr >
                    <td>2</td>
                    <td>
                        <img src="/img/home/home.png" alt="" />
                    </td>
                    <td>Nguyễn Văn A</td>
                    <td>nguyenvana@gmail.com</td>
                    <td>nguyenvana</td>
                    <td>Đã Kích Hoạt</td>
                    <td>
                    
                    </td>
                  </tr>

                </tbody>
              </table>
            </Row> */}
               <div className='table'>
      <div className='row header'>
        <div className='cell'>#</div>
        <div className='cell'></div>
        <div className='cell'>Họ Và Tên</div>
        <div className='cell'>Email</div>
        <div className='cell'>User</div>
        <div className='cell'>Trạng Thái</div>
        <div className='cell'></div>
      </div>
      <div className='row'>
        <div className='cell'>1</div>
        <div className='cell'><img src="/img/home/home.png" alt="" /></div>
        <div className='cell'>Nguyễn Văn A</div>
        <div className='cell'>nguyenvana@gmail.com</div>
        <div className='cell'>nguyenvana</div>
        <div className='cell'>Đã Kích Hoạt</div>
        <div className='cell'></div>
      </div>
      {/* Thêm các hàng khác tại đây */}
              </div>
          </div>
        </Container>
      </HelmetProvider>
    );
}

export default AdminPage