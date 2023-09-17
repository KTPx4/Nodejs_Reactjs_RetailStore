import React from "react";


class Employee extends React.Component {
     componentDidMount()
     {
        document.title= "Manager Account";
     }
    render() { 
        return (
            <div>Manager Account</div>
        );
    }
}
 
export default Employee;