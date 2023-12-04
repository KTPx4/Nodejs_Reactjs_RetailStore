import Button from "react-bootstrap/Button";
import React from "react";
import AlertComponent from "../../components/Alert/AlertComponent";
import { useEffect } from "react";
const _Root_IMG = __dirname + "img/home";

const ForbiddenPage = () =>{
    useEffect(() => 
    {
        
        document.title = "403";      

        // Change icon
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = `${_Root_IMG}/home.png`; 
        document.head.appendChild(link);
    }, []);

    const type = "warning",
    heading = "Bạn Không Đủ Quyền Hạn", 
    message = (
        <p>Chỉ Admin mới có quyền truy cập. Vui lòng quay trở về!</p>
    ), 
    button = (
            <Button href="/" variant="light">
                Trang Chủ
            </Button>
    )

    return(
        <>
           {AlertComponent(type, heading, message, button)}
        </>
    )
}

export default ForbiddenPage