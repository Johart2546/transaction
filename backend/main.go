package main

import (
	"github.com/gin-gonic/gin"
	// นำเข้า Payment จาก entity ที่คุณสร้างไว้
	"transaction_main/config"
	"transaction_main/controller"
)


const PORT = "8080"
func main() {
	config.ConnectionDB()
	config.SetupDatabase()
	//entity.MigratePaymentTable(db)

	r := gin.Default()
	r.Use(CORSMiddleware())

	// API สำหรับอัปโหลดสลิปการชำระเงิน
	r.GET("/payments", controller.ListPayment)
	r.GET("/payment/:id", controller.GetPayment)
	r.POST("/payments", controller.CreatePayment)
	r.PATCH("/payments", controller.UpdatePayment)
	r.DELETE("/payments/:id", controller.DeletePayment)


	// r.POST("/upload", func(c *gin.Context) {
	// 	file, _, err := c.Request.FormFile("image")
	// 	if err != nil {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 		return
	// 	}
	// 	defer file.Close()

	// 	imageData, err := ioutil.ReadAll(file)
	// 	if err != nil {
	// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	// 		return
	// 	}

	// 	// สร้างรายการ Payment และเก็บข้อมูลสลิป
	// 	payment := entity.Payment{
	// 		TransactionDate: "2024-09-09", // ตัวอย่างการเก็บวันที่
	// 		PaymentStatus:   "Pending",    // สถานะการชำระเงินเริ่มต้น
	// 		Image:           imageData,
	// 	}
	// 	db.Create(&payment)

	// 	c.JSON(http.StatusOK, gin.H{"id": payment.ID})
	// })

	// API สำหรับดึงสลิปการชำระเงิน
// 	r.GET("/image/:id", func(c *gin.Context) {
// 		var payment entity.Payment
// 		id := c.Param("id")

// 		if err := db.First(&payment, id).Error; err != nil {
// 			c.JSON(http.StatusNotFound, gin.H{"error": "Image not found"})
// 			return
// 		}

// 		// ส่งข้อมูลสลิปกลับไปยังผู้ใช้งาน
// 		c.Data(http.StatusOK, "image/jpeg", payment.Image) // ใช้ประเภท MIME ที่ถูกต้อง
// 	})

	r.Run(":8080")
}

// Middleware สำหรับจัดการ CORS
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
