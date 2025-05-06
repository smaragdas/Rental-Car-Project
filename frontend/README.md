# 🚗 AutoMr – Premium Car Rental Platform

AutoMr is a modern and multilingual car rental web application, designed with React, TailwindCSS, Framer Motion, and Docker. It features a beautiful landing page, dynamic booking system, and an admin dashboard for managing bookings and rental settings.

---

## 🖥️ Features

### ✅ User-Facing
- ✨ Elegant, animated homepage with responsive design
- 🌍 Multilingual support (English & Greek) with `react-i18next`
- 📅 Booking form with date pickers, conditional fields, and validations
- ✈ Optional Pickup with location selector (Airport, Port, Train Station)

### ✅ Admin Dashboard
- 📊 Real-time booking statistics
- ⚙ Update daily rate and minimum rental days
- 📋 View, cancel, or delete bookings with ease

---

## ⚙️ Technologies

- **Frontend:** React, TailwindCSS, Framer Motion
- **State & Forms:** useState, useEffect, react-hook-form
- **i18n:** `react-i18next`
- **Deployment:** Docker, Vite

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/automr.git
cd automr/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

### 4. Run with Docker

```bash
docker-compose up --build
```

---

## 🌐 Project Structure

```
📦 frontend
 ┣ 📁 components      // All UI components
 ┣ 📁 locales         // i18n JSON files
 ┣ 📁 pages           // Route pages: Home, Contact, Booking, Admin
 ┣ 📜 App.jsx
 ┣ 📜 main.jsx
 ┗ 📜 i18n.js
```

---

## 📝 TODO (Optional)
- ⏳ Add Stripe or PayPal integration
- 🔐 Add authentication for Admin section
- 📱 Mobile-first UI improvements
- 📦 Backend API for real-time booking logic

---

## 📃 License

MIT © 
Konstantinos Smaragdas – [smaragdas](https://github.com/smaragdas/)
Ioannis Xypteras –[JohnXyp] https://github.com/JohnXyp/