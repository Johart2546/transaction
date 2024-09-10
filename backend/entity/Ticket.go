package entity

import "gorm.io/gorm"

type Ticket struct {
	gorm.Model
	Price     float64
	PaymentID uint    // This is the foreign key
	//Payment   Payment `gorm:"foreignKey:PaymentID"`
	//Receipt   []Receipt `gorm:"foreignKey:ticketID"`
	ReceiptID uint    // This is the foreign key
}
