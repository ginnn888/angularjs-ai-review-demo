# AngularJS AI Review Demo

โปรเจกต์ AngularJS 1.8.3 แบบง่าย สำหรับทดลองระบบตรวจคุณภาพโค้ดด้วย AI

## เริ่มใช้งาน

ต้องมี Node.js 20 ขึ้นไป และ npm

```powershell
cd D:\Work\angularjs-ai-review-demo
npm install
npm start
```

เปิด http://127.0.0.1:8080 และกด Ctrl+C เพื่อหยุดเซิร์ฟเวอร์

## สิ่งที่ทำได้

- เพิ่ม ลบ และทำเครื่องหมายงานที่เสร็จแล้ว
- กรองงาน และนับจำนวนงานที่เสร็จ
- เก็บข้อมูลด้วย localStorage และแจ้งเมื่อบันทึกไม่สำเร็จ
- แสดงชื่องานด้วย text binding ไม่ตีความเป็น HTML

## โครงสร้าง

- index.html: หน้าแอปและ AngularJS template
- src/app.js: module
- src/task.controller.js: การทำงานของหน้าจอ
- src/task.service.js: validation และการบันทึกข้อมูล
- src/styles.css: รูปแบบหน้าจอ
- test/app.test.cjs: unit และ template compilation tests
- docs/AI-REVIEW.md: แนวทางทดลองรีวิว

## ตรวจสอบ

```powershell
npm test
npm run check
npm audit
```

ชุดทดสอบใช้ AngularJS จริงผ่าน jsdom และยังไม่ได้ทดสอบการคลิกในเบราว์เซอร์จริง

AngularJS สิ้นสุดการสนับสนุนตั้งแต่มกราคม 2022: https://docs.angularjs.org/
ใช้โปรเจกต์นี้เป็นตัวอย่างระบบ legacy สำหรับทดสอบ AI review; ไม่ควรใช้เป็นฐานระบบ production ใหม่
ไม่มี backend, login หรือการแชร์ข้อมูลระหว่างผู้ใช้

ผลตรวจ dependency ตอนสร้าง: npm audit พบ angular ระดับ high และไม่มี fix ในแพ็กเกจนี้ รายละเอียดตรวจซ้ำได้ด้วย npm audit

