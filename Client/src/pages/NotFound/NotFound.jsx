import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import { Helmet , HelmetProvider } from "react-helmet-async";
const _Root_IMG = __dirname + "img/404";

class NotFound extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      shadowColor: 'rgba(255, 0, 0, 1)', // Màu shadow ban đầu
    };
  }
  componentDidMount()
  {
    // Change title
    document.title= "404 Not Found"; 

    // Change icon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = `${_Root_IMG}/404.png`; 
    document.head.appendChild(link);

    // Change color for box - shadow
    this.intervalId = setInterval(() => 
    {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      this.setState({ shadowColor: `rgba(${r}, ${g}, ${b}, 1)` });
    }, 300);

  } 

  componentWillUnmount() {
    clearInterval(this.intervalId); // Xóa interval khi component unmount
  }

  render() { 
    const { shadowColor } = this.state;
    return (
      <HelmetProvider>
          <Helmet>
            <link rel="stylesheet" type="text/css" href="/css/notfound.css" />
          </Helmet>
          
        <Container className="Container" fluid>
          <Row
            className="parent"
            style={{
              boxShadow: `0 0 25px ${shadowColor}`,
              transition: "box-shadow 0.5s linear",
            }}
          >
            <Col sm={12} className="img">
              <div className="element">
                <p className="txt404">404</p>
              </div>
            </Col>
            <Col sm={12} className="text">
              <h1>Page Not Found</h1>
              <h4>The url is not correct. Try another path!</h4>
              <img src={`${_Root_IMG}/haiz.gif`} alt="haiz" />
              <div className="link-page">
                <Row className="row-page">
                  <Col className="col home" xs={6} sm={4}>
                    <a id="tagHome" href="/">
                      <img
                        id="imgHome"
                        src={`${_Root_IMG}/home.png`}
                        alt="home"
                      />
                      <p className="txt">Home</p>
                    </a>
                  </Col>
                  <Col className="col account" xs={6} sm={4}>
                    <a id="tagAccount" href="/Account">
                      <img
                        id="imgAccount"
                        src={`${_Root_IMG}/account.png`}
                        alt="account"
                      />
                      <p className="txt">Account</p>
                    </a>
                  </Col>
                  <Col className="col sells" xs={12} sm={4}>
                    <a id="tagSell" href="/Sell">
                      <img
                        id="imgSell"
                        src={`${_Root_IMG}/commission.png`}
                        alt="Sell"
                      />
                      <p className="txt">Sell</p>
                    </a>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
    
      </HelmetProvider>
    );
  }
}
 
export default NotFound;