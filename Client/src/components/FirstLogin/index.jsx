import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const handleChangePassword = () => {

};

const FirtLogin= (props) =>{

    return(
        <Modal show={true} onHide={handleChangePassword}>
                    <Modal.Header >
                        <Modal.Title>Lần Đầu Tiên Đăng Nhập?</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body >
                        <br />
                        <p>Vui Lòng Nhập Mật Khẩu mới</p>
                        <br />
                        <input name='password' className="input w-100" type="password" placeholder="Mật khẩu" />

                        
                    </Modal.Body>
                    
                    <Modal.Footer>
                   
                    <Button variant="primary" onClick={handleChangePassword}>
                        Lưu
                    </Button>
                    </Modal.Footer>
                </Modal>
    )
}

export default FirtLogin;