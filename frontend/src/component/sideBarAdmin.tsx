import { FunctionComponent} from "react";
import "./sideBarAdmin.css";

const sideBarAdmin: FunctionComponent = () => {
return (
<html>
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Sidebar Admin</title>
    <link rel="stylesheet" href="sideBarAdmin.css"/>
  </head>
  <body>
  <div className="sidebar">
        <div className="picsirisakHandfront">
            <img src="sirisak.png"/>
        </div>
        <p className="Menu-Admin">Menu Admin</p>
        <div className="bttSideBar">
            <img src="../public/icon/route.png" className="picicon"/>
            <b>ระบบจัดการเส้นทางเดินรถ</b>
        </div>
        <div className="bttSideBar">
            <img src="../public/icon/busicon.png" className="picicon"/>
            <b>ระบบจัดการข้อมูลรถ</b>
        </div>
        <div className="bttSideBar">
            <img src="../public/icon/drivericon.png" className="picicon"/>
            <b>ระบบจัดการข้อมูลคนขับ</b>
        </div>
        <div className="bttSideBarLogout">
            <h3>Log out</h3>
        </div>
    </div>
  </body>
</html>

    );
  };
  
  export default sideBarAdmin;
  