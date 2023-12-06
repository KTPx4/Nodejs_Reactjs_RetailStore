
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || 'TOKEN_AUTH_LOGIN';
const urlServer = process.env.REACT_APP_SERVER || 'http://localhost:3001';


const LogOut = () =>{
    if(localStorage.getItem(_Token_Auth))
    {
        localStorage.removeItem(_Token_Auth)
        window.location.href= '/account/login'
    }
}

const FirtLogin= (props) =>{
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [Reload, setReload] = useState(false)
    const [countdown, setCountdown] = useState(6);
    //let Reload = false;


    const tokenLogin = localStorage.getItem(_Token_Auth) || "";

    let AlertMessage = <></>
    let Loading = <></>
   
    useEffect(() => {
        // console.log("1time");
        if(Reload)
        {
            // console.log("ok");
            const timerId = setInterval(() => {
                if (countdown > 0) {
                    setCountdown((prevCountdown) => prevCountdown - 1);
                }
            }, 1000);
            if(countdown === 0) window.location.reload()
    
            return () => clearInterval(timerId);
            
        }
    }, [countdown]);

    
    const handleSave = ()=>{
        

        const newPass = document.getElementById("newPassword").value;
      
        let serverLogin = `${urlServer}/api/account/changepassword`;
        if(!newPass)
        {
            setError('Vui lòng nhập mật khẩu mới')
            setLoading(false)
            return;
        }
        else{
            setError('')                
            setLoading(true)
            
            let formData = new FormData();
            formData.append("newPassword", newPass);
            formData.append("oldPassword", 'hi');          
            
            setReload(true)
            setCountdown(10)

            axios({
                url: serverLogin,
                method: 'POST',
                headers: {
                    authorization:  `bearer ${tokenLogin}`, // token auth login,
                    "Content-Type": 'application/json'
                },
                data: formData
            })
            .then((res) => {
                let code = res.data.code;
                let message = res.data.message;
                // console.log(res.data);
                
                setLoading(false)
                
                if (code === 400) 
                {
                    setError(message);
                    setSuccess('')
                } 
                else if ( code === 200) 
                {
                    setSuccess(message)                    
                    setError('')
                }                

            })
            .catch((err) => {
                console.log("Error at change pass firt login fetch: ", err);
            });
            return;
        }
    }

    let textReload = <></>
    if(Reload)
    {
        textReload = <p>Tải lại trang sau <strong>{countdown}s</strong></p>
    }
    
    if (error) {
        AlertMessage = (
            <Alert variant="danger" className="AlertMessage text-center">
                <p className="mb-0">
                    {error}
                </p>
                {textReload}
            </Alert>
        );
    }
    if(loading)
    {
        Loading = <Spinner animation="border" variant="info" /> 
    }

    if(success)
    {
        AlertMessage = (
            <Alert variant="success" className="AlertMessage text-center">
                <p className="mb-0">
                    {success}
                </p>
                {textReload}
            </Alert>
        );
    }

    return(
        <HelmetProvider>
            <Helmet>
                <link rel="stylesheet" type="text/css" href="/css/firtlogin.css" />
            </Helmet>
            {AlertMessage}
            <div className="loading d-flex justify-content-center my-5">
                {/* <Spinner className='' animation="grow" variant="info" /> */}
                {Loading}
               
            </div>

            <div className="box">
                <div className="box-header">
                    <h5>Chào Mừng Bạn Đến Với Hệ Thống</h5>
                </div>
                <div className="box-body">
                    <p>Vui Lòng Nhập Mật Khẩu mới để tiếp tục</p>
                    <input id='newPassword' type="password" name='newPassword' placeholder='Mật khẩu' pattern="[A-Za-z]*"/>
                </div>
                <div className="box-footer">
                    <button className='btn-save' onClick={handleSave}>
                       Lưu
                    </button>
                    <button type='button' className='btn-logout' onClick={LogOut}>Đăng Xuất</button>
                </div>
            </div>

        </HelmetProvider>
       
    )
}

export default FirtLogin;