import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
const LoadingConponent = () => {




  return (
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="/css/loading/loading.css" />
      </Helmet>
    
      <div className="loading text-center">
        <div className="background-loading">
            <span className="loader"></span>
        </div>
    </div>

    </HelmetProvider>
  );
};

export default LoadingConponent;
