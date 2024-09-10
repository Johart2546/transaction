import React from "react";
import Detail from "../component/Detail"; 
import SideNav from "../component/SideNav"; 
import PaymentWindow from "../component/PaymentWindow";

const Payment: React.FC = () => {
  return (
    <>
      <SideNav />
      <div className="main-content">
        <div className="content-wrapper">
          <PaymentWindow />
          <Detail />
        </div>
      </div>
    </>
  );
};

export default Payment;
