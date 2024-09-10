package entity

import (
	"time"
	//"gorm.io/gorm"
)

// Struct สำหรับตาราง Image
type Payment struct {
	ID              uint      `gorm:"primaryKey"`          // คีย์หลัก
	TransactionDate time.Time `gorm:"not null"`           // วันที่ทำรายการ
	PaymentStatus   string    `gorm:"type:varchar(50)"`   // สถานะการชำระเงิน
	Image           string    `gorm:"type:longtext"`          // ข้อมูลภาพ
}

