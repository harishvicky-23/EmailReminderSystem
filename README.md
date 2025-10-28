# 📧 Email Reminder System

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/API-Express-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)
![Nodemailer](https://img.shields.io/badge/Email-Nodemailer-yellow?logo=gmail)
![License](https://img.shields.io/badge/License-MIT-blue)

> A modern full-stack web app that lets users **schedule and send automatic email reminders** — built using **React**, **Node.js**, **Express**, **MongoDB Atlas**, and **Nodemailer**.

---

## ⚡ Tech Stack

| Layer | Tools |
|-------|--------|
| **Frontend** | React, Axios |
| **Backend** | Node.js, Express |
| **Database** | MongoDB Atlas |
| **Email Service** | Nodemailer / SendGrid |
| **Scheduler** | Node Schedule |
| **Deployment** | Render (Backend), Vercel (Frontend) |

---

## ✨ Features

- 📅 Create & manage email reminders  
- ⏰ Auto-send emails on scheduled date/time  
- ☁️ Cloud-hosted data with MongoDB Atlas  
- 🔐 Secure credentials via `.env`  
- 💡 Works seamlessly with SMTP or SendGrid  

---

## 🧠 How It Works

1. User creates a reminder (title, message, recipient, date, and time)  
2. Reminder details are stored in **MongoDB Atlas**  
3. **Node Schedule** runs a time-based job watcher  
4. When time arrives, **Nodemailer** sends the email automatically  

✅ Simple. Automated. Reliable.  

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Rahul-Sundarraj/email-remainder-system.git
cd email-remainder-system
