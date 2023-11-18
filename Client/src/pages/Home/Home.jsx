import React from "react";

const _Root_IMG = __dirname + "img/home";

console.log(_Root_IMG)

class Home extends React.Component {
    componentDidMount()
    {
        document.title= "Sell Phone System";
       

        // Change icon
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = `${_Root_IMG}/home.png`; 
        document.head.appendChild(link);
    }
    render() { 
        return (
            <div>
                Home Page
            </div>
        );
    }
    
}
export default Home;
 
