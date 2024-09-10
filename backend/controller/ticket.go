package controller

import (
	"net/http"
	"transaction_main/config"
	"transaction_main/entity"

	"github.com/gin-gonic/gin"
)

func Ticket(c *gin.Context) {

	var ticket []entity.Ticket

	db := config.DB()
	results := db.Find(&ticket) /*// Get all records    result := db.Find(&users)
	// SELECT * FROM users;*/
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, ticket) //ถ้าการดึงข้อมูลสำเร็จ ฟังก์ชันจะส่ง HTTP 200 (OK)
	//ทำเป็นไฟล์ JSON								//พร้อมกับ JSON ที่ประกอบด้วยรายการผู้ใช้ที่ถูกเก็บใน users.
}
