
LIVE DEMO (https://event.artistaa.shop)

⚠️ Note: The backend is hosted on Render (free tier). The server will spin down if idle for 20+ minutes, so there may be a short initial delay when loading data.

# 🎟️ Event Management System

An **Event Management System** built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)**, focused primarily on **event organizers**.  
It allows organizers to create events, add participants, and automatically send event entry tickets (with QR codes) to participants via email.


---

## ✨ Features

### 👩‍💼 Event Orgnizers
- Create and manage events
- Add participants (name, email, role)
- View participant details in a clean dashboard
- Manage ticket status (`valid`, `used`, `invalid`)

### 🎟 Ticketing System(For the people who is intrested for the event)
- Automatic **QR code ticket generation**
- Ticket sent to participant’s email
- Download tickets as PNG
- Ticket validity tracking

### 📧 Email Notifications(When the event orgnizers add the people)
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


**Project setup**
🚀 Getting Started
1️⃣ Clone the repository

      git clone https://github.com/Athul-krishna03/Mini_Event_Tracker.git
      cd mini-event-tracker

2️⃣ Setup backend

      cd api
      npm install
      npm run dev
  

3️⃣ Setup frontend

      cd frontend
      npm install
      npm run dev


**Sample envs**
 Backend

    PORT=5000
    MONGO_URI
    JWT_SECRET
    EMAIL_USER
    EMAIL_PASS
    ACCESS_TOKEN_SECRET
    REFRESH_TOKEN_SECRET
    ACCESS_TOKEN_SECRET_EXPIRES_IN=15m
    REFRESH_TOKEN_SECRET_EXPIRES_IN=7d
    NODE_ENV=production
    CLIENT_URL=http://localhost:5173
    CLOUD_NAME (cloudinary name)
    CLOUD_KEY
    CLOUD_SECRET

Frontend

    VITE_BACKEND_API
    VITE_CLOUDINARY_UPLOAD_PRESET
    VITE_CLOUDINARY_CLOUD_NAME
    VITE_CLOUDINARY_PROFILE_UPLOAD_PRESET

