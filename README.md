
LIVE DEMO (https://event.artistaa.shop)

# 🎟️ Event Management System

An **Event Management System** built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)**, focused primarily on **event organizers**.  
It allows organizers to create events, add participants, and automatically send event entry tickets (with QR codes) to participants via email.  

---

## ✨ Features

### 👩‍💼 For Organizers
- Create and manage events
- Add participants (name, email, role)
- View participant details in a clean dashboard
- Manage ticket status (`valid`, `used`, `invalid`)

### 🎟 Ticketing System
- Automatic **QR code ticket generation**
- Ticket sent to participant’s email
- Download tickets as PNG
- Ticket validity tracking

### 📧 Email Notifications
- Email reminder system
- Ticket delivery directly to inbox

---

## 🛠️ Tech Stack

**Frontend**
- React + Vite
- TailwindCSS + ShadCN UI
- Lucide-react icons

**Backend**
- Node.js + Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Nodemailer (for ticket emails)

**Other**
- html-to-image for ticket downloads
-qrcode and react-qr-barcode-scanner (for Qr code generation and Scanning)

---

