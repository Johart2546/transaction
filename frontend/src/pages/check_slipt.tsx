import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, PaperClipOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetPayment, DeletePaymentByID } from "../service/https";
import { PaymentInterface } from "../interfaces/IfUser";
import SideNav from "../component/SideNav";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const CheckSlip: React.FC = () => {
  const navigate = useNavigate();

  const [payments, setPayments] = useState<PaymentInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number | undefined>();
  const [isSlipModalVisible, setIsSlipModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PaymentInterface | null>(null);

  // Define the columns for the Payment table
  const columns: ColumnsType<PaymentInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "สถานะการชำระเงิน",
      dataIndex: "PaymentStatus",
      key: "paymentstatus",
    },
    {
      title: "วันที่ทำรายการ",
      dataIndex: "TransactionDate",
      key: "transactiondate",
      render: (record) => <p>{dayjs(record).format("DD/MM/YYYY HH:mm")}</p>,
    },
    {
      title: "สลิปการชำระเงิน",
      dataIndex: "Image",
      key: "image",
      render: (text, record) => (
        <Button
          type="link"
          icon={<PaperClipOutlined />}
          onClick={() => handleOpenSlipModal(record)}
        />
      ),
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record) => (
        <>
          <Button
            onClick={() => navigate(`/payment/edit/${record.ID}`)}
            shape="circle"
            icon={<EditOutlined />}
            size={"large"}
          />
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];

  // Fetch payments from the server
  const getPayments = async () => {
    try {
      let res = await GetPayment();
      if (res) {
        setPayments(res);
        console.log("Payments fetched:", res); // เพิ่ม log เพื่อตรวจสอบข้อมูลที่ได้
      } else {
        console.error("Failed to fetch payments"); // หาก res เป็น false
      }
    } catch (error) {
      console.error("Error in getPayments:", error); // ตรวจจับข้อผิดพลาด
    }
  };

  // Show modal for delete confirmation
  const showModal = (val: PaymentInterface) => {
    setModalText(`คุณต้องการลบข้อมูลการชำระเงิน ID: ${val.ID} หรือไม่ ?`);
    setDeleteId(val.ID);
    setOpen(true);
  };

  // Handle modal confirmation
  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeletePaymentByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getPayments();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };

  // Handle modal cancel
  const handleCancel = () => {
    setOpen(false);
  };

  // Open slip modal
  const handleOpenSlipModal = (record: PaymentInterface) => {
    setSelectedRecord(record);
    setIsSlipModalVisible(true);
  };

  // Close slip modal
  const handleCloseSlipModal = () => {
    setIsSlipModalVisible(false);
    setSelectedRecord(null);
  };

  // Load payments when the component is mounted
  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div style={{ display: "flex", marginLeft: "440px", marginTop: "-400px", width: "1200px" }}>
      <SideNav />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          marginLeft: "20px", // เพิ่มระยะห่างจาก SideNav
        }}
      >
        {contextHolder}
        <Row style={{ width: "80%" }}> {/* ปรับขนาดให้เหมาะสม */}
          <Col span={12}>
            <h2>จัดการข้อมูลการชำระเงิน</h2>
          </Col>
          <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
            <Space>
              <Link to="/payment/create">
                <Button type="primary" icon={<PlusOutlined />}>
                  เพิ่มข้อมูลการชำระเงิน
                </Button>
              </Link>
            </Space>
          </Col>
        </Row>
        <Divider style={{ width: "80%" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%", // ปรับขนาดตารางให้เหมาะสม
            marginTop: 20,
          }}
        >
          <Table rowKey="ID" columns={columns} dataSource={payments} />
        </div>
        <Modal
          title="ลบข้อมูล ?"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>

        {/* Modal สำหรับแสดงสลิปและรายละเอียด */}
        <Modal
          title="รายละเอียดสลิปการชำระเงิน"
          visible={isSlipModalVisible}
          onCancel={handleCloseSlipModal}
          footer={null}
          width={800}
        >
          {selectedRecord && (
            <div style={{ display: "flex" }}>
              {/* แสดงภาพสลิป */}
              <div style={{ flex: 1, marginRight: 20 }}>
                <img
                  src={selectedRecord.Image} // ใช้ URL หรือ Base64 ที่แสดงภาพได้
                  alt="Payment Slip"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </div>

              {/* แสดงรายละเอียดการชำระเงิน */}
              <div style={{ flex: 1 }}>
                <p><strong>ยอดที่ต้องชำระ:</strong> {selectedRecord.Amount}</p>
                <p><strong>วันที่ชำระ:</strong> {dayjs(selectedRecord.TransactionDate).format("DD/MM/YYYY")}</p>
                <p><strong>เวลาชำระ:</strong> {dayjs(selectedRecord.TransactionDate).format("HH:mm")}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CheckSlip;
