import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PaymentWindow.css';
import ImageUpload,{Base64} from './ImageUpload';
import { CreatePayment } from '../service/https';

const PaymentWindow: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await axios.post('http://localhost:3000/generateQR', {
          amount: 300.00 , // จำนวนเงินที่ต้องการสำหรับ QR Code
        });
        if (response.data && response.data.RespCode === 200) {
          setQrCodeUrl(response.data.Result);
        } else {
          console.error('Failed to generate QR code:', response.data.RespMessage);
        }
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    };

    fetchQRCode(); // เรียกใช้เมื่อคอมโพเนนต์ถูก mount
  }, []);

  const handleConfirm = async () => {
    const values = {
      TransactionDate: new Date(),    // วันที่ทำรายการ ใช้ string เพื่อให้ตรงกับ Backend
      PaymentStatus: 'Pending',     // สถานะการชำระเงิน เช่น Pending, Completed
      Image: Base64[0]
    }
    console.log('values',values)
    let res = await CreatePayment(values);
    if(res.status){
      console.log(res)
    }else{
      console.log('fail')
    }
  };

  return (
    <div className="payment-window">
      <div className="payment-head">
        <h2>&nbsp;&nbsp;&nbsp;&nbsp;ชำระค่าโดยสาร</h2>
      </div>
      <div className="payment-qr">
        {qrCodeUrl ? (
          <img src={qrCodeUrl} style={{ width: 270 }} alt="QR Code" />
        ) : (
          <p>Loading QR Code...</p>
        )}
      </div>
      <div className="payment-upload">
        <ImageUpload  /> {/* ใช้ prop onUpload เพื่อส่งไฟล์ */}
      </div>
      <button className="confirm-button" onClick={handleConfirm} style={{width:"200px",background:"green",marginLeft:"570px",marginTop:"20px",}}>
        ยืนยัน
      </button>
    </div>
  );
}

export default PaymentWindow;
