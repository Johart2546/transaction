import React, { useState, useEffect } from 'react';
import './Detail.css';
import { PaymentInterface } from '../interfaces/IfUser';
import { CreatePayment as fetchPayments } from "../service/https.tsx";

const Detail: React.FC = () => {
  const [payment, setUser] = useState<PaymentInterface>({
    PaymentStatus: '',
    TransactionDate: new Date(), // ใช้ Date object แทน string
    Price: 0, // ใช้ number แทน string
    Bus_Round: '',
    SlipImage: new Uint8Array(), // ใช้ Uint8Array แทน string
    ID: 0,
  });

  // ฟังก์ชันเพื่อดึงข้อมูลจาก API
  const getPayment = async () => {
    let res = await fetchPayments();
    console.log(res);
    if (res) {
      // ค้นหาผู้ใช้ที่มี ID เป็น 37
      const userWithId37 = res.find((payment: PaymentInterface) => payment.ID === 37);
      if (userWithId37) {
        setUser(userWithId37);
      } else {
        console.log("ไม่พบผู้ใช้ที่มี ID 37");
      }
    }
  };

  // ใช้ useEffect เพื่อดึงข้อมูลเมื่อ component ถูก mount
  useEffect(() => {
    getPayment(); // เรียกฟังก์ชันเมื่อ component ถูก mount
  }, []);

  return (
    <div className="Detail">
      <div className="detail-head">
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;รายละเอียดค่าโดยสาร</h3>
      </div>
      <div className="detail-content">
        <p><strong>&nbsp;ชื่อผู้โดยสาร:</strong> {payment.FirstName || 'N/A'} {payment.LastName || 'N/A'}</p>
        <p><strong>&nbsp;ที่นั่ง:</strong> {payment.Seat || 'N/A'}</p>
        <p><strong>&nbsp;สถานะการชำระเงิน:</strong> {payment.Payment_status || 'N/A'}</p>
        <p><strong>&nbsp;วันที่ทำธุรกรรม:</strong> {payment.TransactionDate ? payment.TransactionDate.toDateString() : 'N/A'}</p>
        <p><strong>&nbsp;ราคา:</strong> {payment.Price || 'N/A'}</p>
        <p><strong>&nbsp;รอบรถ:</strong> {payment.Bus_Round || 'N/A'}</p>
      </div>
    </div>
  );
}

export default Detail;
