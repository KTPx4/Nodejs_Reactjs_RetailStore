
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
   
    const [success, setSuccess] = useState('');
    const [Reload, setReload] = useState(false)
    const [countdown, setCountdown] = useState(6);
    const [Loading, setLoading] = useState(<></>)
    //let Reload = false;


    const tokenLogin = localStorage.getItem(_Token_Auth) || "";

    let AlertMessage = <></>
 
   
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

    const clearError = () =>{
        setError('');
    }

    const handleSave = ()=>{
        

        const newPass = document.getElementById("newPassword").value;
        const confirmPass = document.getElementById("ConfirmnewPassword").value;
        let serverLogin = `${urlServer}/api/account/changepassword`;
     
        if(!newPass)
        {
            setError('Vui lòng nhập mật khẩu mới')       
            return;
        }
        else if(newPass != confirmPass)
        {
            setError('Mật khẩu mới và Xác nhận mật khẩu không khớp')           
            return;
        }
        else{
            setError('')                
            setLoading(<Spinner animation="border" variant="danger" /> )
            
            let formData = new FormData();
            formData.append("newPassword", newPass);
            formData.append("oldPassword", 'hi');          
                    
            setTimeout(async()=>{
                await axios({
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
                    
                    setLoading(<></>)
                    
                    if (code === 400) 
                    {
                        setError(message);
                        setSuccess('')
                    } 
                    else if ( code === 200) 
                    {
                        setCountdown(10)
                        setReload(true)
                        setSuccess(message)                    
                        setError('')
                    }                
    
                })
                .catch((err) => {
                    console.log("Error at change pass firt login fetch: ", err);
                });
            }, 1300)
           

           
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

{/* <Spinner animation="border" variant="info" />  */}
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
          
           
            <div className="box">
            <div className="loading text-center ">              
                {Loading}               
            </div>
                <div className="box-header">
                    <h5>Chào Mừng Bạn Đến Với Hệ Thống</h5>
                </div>
                <div className="box-body">
                    <p>Vui Lòng Nhập Mật Khẩu mới để tiếp tục</p>
                    <input onFocus={clearError} id='newPassword' type="password" name='newPassword' placeholder='Mật khẩu' pattern="[A-Za-z]*"/>
                    <input onFocus={clearError} id='ConfirmnewPassword' type="password" name='ConfirmnewPassword' placeholder='Nhập lại mật khẩu mới' pattern="[A-Za-z]*"/>
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