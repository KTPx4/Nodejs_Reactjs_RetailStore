import { useEffect } from "react";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import LoadingComponent from "../components/Loading/LoadingComponent"
const _Root_IMG = __dirname + "img";

const TestPage = (props) => {
  useEffect(() => {
    document.title = "Test Component";
    // Change icon
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `${_Root_IMG}/logo.png`;
    document.head.appendChild(link);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="/css/test.css" />

       
        
      </Helmet>
     	<LoadingComponent/>
    </HelmetProvider>
  );
};
export default TestPage;
