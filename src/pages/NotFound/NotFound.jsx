import React from 'react'
import ReactDOM from 'react-dom'


class NotFound extends React.Component{
    componentDidMount(){
      document.title = "404 Not Found"
    }
  
    render(){
      return(
        <div>Not Found</div>
      )
    }
  }
export default NotFound;