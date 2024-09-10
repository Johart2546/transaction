import React, { useState } from 'react';
import './SideNav.css';
import logo from './sirisak.png'; 

const SideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true); // กำหนดประเภทข้อมูลของ isOpen เป็น boolean

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '◄' : '►'}
      </button>
      <div className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
        <div className="logo">
          <img src={logo} alt="Sirisak Tour" className="logo-img" />
        </div>
        <div className="profile">
          <img src="https://via.placeholder.com/100" alt="Profile" className="profile-pic" />
          <h2>Le Meilleur Avant Tout</h2>
          <hr />
          <a href="#" className="menu-title">Menu</a> {/* เพิ่ม href เพื่อป้องกัน TS error */}
        </div>
        <div className="menu">
          <a href="#">หน้าแรก</a>
          <a href="#">ตารางเดินรถ</a>
          <a href="#">สถานะการจอง</a>
          <a href="#">ตั๋วโดยสาร</a>
        </div>
        <button className="logout">Log out</button>
      </div>
    </>
  );
};

export default SideNav;
