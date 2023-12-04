import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const AlertComponent = (type, heading, message, button) =>
{
    return (
        <Alert show={true} variant={type}  className="text-center">
            <Alert.Heading>{heading}</Alert.Heading>
            {message}
            
            <hr />
            {button}
        </Alert>     
    )
}

export default AlertComponent