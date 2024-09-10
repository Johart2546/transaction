package controller

import (
	"net/http"

	"transaction_main/entity"
	"github.com/gin-gonic/gin"
	"transaction_main/config"
)

func CreatePayment(c *gin.Context) {
	// ประกาศตัวแปรเพื่อเก็บข้อมูล Payment ใหม่จาก request
	var payment entity.Payment

	// เรียกใช้ฐานข้อมูลจาก config
	db := config.DB()

	// รับข้อมูลจาก body ของ request แล้ว decode ลงใน payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้างข้อมูล Payment ใหม่โดยใช้ข้อมูลจาก payment
	pay := entity.Payment{
		TransactionDate: payment.TransactionDate, // วันที่ของการทำธุรกรรม
		PaymentStatus:   "Pending",   // สถานะการชำระเงิน
		Image:           payment.Image,           // รูปภาพหรือข้อมูลที่เกี่ยวข้องกับการชำระเงิน
	}

	// บันทึกข้อมูล Payment ที่สร้างใหม่ลงในฐานข้อมูล
	if err := db.Create(&pay).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูล Payment ที่สร้างใหม่กลับไปยัง client
	c.JSON(http.StatusOK, gin.H{"data": pay})
}


func UpdatePayment(c *gin.Context) {
	var payment entity.Payment

	PaymentID := c.Param("id")

	db := config.DB()
	result := db.First(&payment, PaymentID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&payment)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
func GetPayment(c *gin.Context) {
	var payment entity.Payment
	ID := c.Param("id")
	// เรียกใช้ฐานข้อมูลจาก config
	db := config.DB()
	// ดึงข้อมูลจากฐานข้อมูลโดยใช้ SQL query
	if err := db.Raw("SELECT * FROM payments WHERE id = ?", ID).Scan(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูล Payment กลับไปยัง client
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

func DeletePayment(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM payments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}
func ListPayment(c *gin.Context) {

	var payment []entity.Payment
	db := config.DB()
	results := db.Find(&payment)  /*// Get all records    result := db.Find(&users)
															// SELECT * FROM users;*/
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, payment)   //ถ้าการดึงข้อมูลสำเร็จ ฟังก์ชันจะส่ง HTTP 200 (OK) 
					//พร้อมกับ JSON ที่ประกอบด้วยรายการผู้ใช้ที่ถูกเก็บใน users.
}
