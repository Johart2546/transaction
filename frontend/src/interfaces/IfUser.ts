// frontend/interfaces/IfUser.ts
export interface PaymentInterface {
  ID?: number;                 // ไอดีของการชำระเงิน
  TransactionDate?: Date;    // วันที่ทำรายการ ใช้ string เพื่อให้ตรงกับ Backend
  PaymentStatus?: string;      // สถานะการชำระเงิน เช่น Pending, Completed
  Image?: string;          // ข้อมูลภาพสลิปการชำระเงิน ใช้ Uint8Array สำหรับ binary data
}
