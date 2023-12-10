import { useEffect, useState } from "react";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import ConfirmSendEmail from "../components/Modal/SendActive";
import SetStatus from "../components/Modal/setStatus";
const _Root_IMG = __dirname + "img";

const TestPage = (props) => {
  const [isProfile, setProfileModalOpen] = useState(true);


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



    </HelmetProvider>
  );
};
export default TestPage;
