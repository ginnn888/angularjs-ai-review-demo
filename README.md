# AngularJS AI Review Demo

แอปจัดการรายการงานด้วย AngularJS 1.8.3 สำหรับทดลอง Automated Quality Gate

## เริ่มใช้งาน

ใช้ Node.js 20 ขึ้นไป แล้วรัน npm install และ npm start
เปิด http://127.0.0.1:8080

## ความสามารถ

- เพิ่ม ลบ และทำเครื่องหมายงานที่เสร็จ
- กรองงานและนับจำนวนงานที่เสร็จ
- เก็บข้อมูลด้วย localStorage พร้อมแจ้งเมื่อบันทึกไม่สำเร็จ
- แสดงชื่องานเป็นข้อความด้วย ng-bind

## การทดสอบผ่าน Action

โปรเจกต์นี้ไม่มีโฟลเดอร์เทสต์ คำสั่ง npm test หรือ dependency สำหรับทดสอบ
เมื่อเปิดหรืออัปเดต PR ระบบ test-github-marketplace จะอ่านโค้ด ให้ Gemini
สร้างเทสต์ เตรียม Node + jsdom รันเทสต์ และอัปเดตคอมเมนต์ PR ให้เอง
ไฟล์เทสต์ที่สร้างดาวน์โหลดได้จาก artifact aq-generated-tests ใน Actions

ดู [การตั้งค่าและขั้นตอน](docs/AQ-SETUP.md)

## โครงสร้างแอป

- index.html: หน้าแอปและ AngularJS template
- src/app.js: module
- src/task.controller.js: พฤติกรรมหน้าจอ
- src/task.service.js: validation และการจัดเก็บข้อมูล
- src/styles.css: รูปแบบหน้าจอ

ไม่มี backend, login หรือการแชร์ข้อมูลระหว่างผู้ใช้
AngularJS เป็น dependency ของระบบ legacy; ผล audit จะแสดงแยกในรายงาน
