# 🚗 AutoMR – Premium Car Rental Platform

**AutoMR** is a professional-grade car rental web application built for a premium user experience. Designed and developed by **Konstantinos Smaragdas** and **Ioannis Xypteras**, the platform allows seamless car booking, admin management, and secure Stripe payments.

---

## 🌐 Live Stack Overview

| Layer      | Tech                                      |
|------------|-------------------------------------------|
| Frontend   | React + Vite + TailwindCSS                |
| Backend    | Spring Boot (Java 21) + JWT Auth          |
| Database   | PostgreSQL 14 (Dockerized)                |
| Payments   | Stripe Checkout API                       |
| Deployment | Docker + Docker Compose                   |

---

## 🚀 Features

### 🖥 Frontend
- Fully responsive UI
- Smooth animations & scroll effects
- Stripe payment integration
- Multilingual (EN/GR)
- Admin-only dashboard access

### 🧠 Backend
- RESTful API with role-based access (JWT secured)
- Admin credentials via environment
- Stripe session creation
- Email notifications (Gmail SMTP)

### 🔐 Admin Login (Environment-controlled)
| Username | Password |
|----------|----------|
| `admin`  | `admin123` (change in `.env`) |

---

## ⚙️ Quick Start

```bash
git clone https://github.com/JohnXyp/Rental-Car-Project.git
cd Rental-Car-Project

# Add your secrets to the .env file (see example below)
docker-compose up --build
```

### 📄 Example `.env`
```env
POSTGRES_DB=automr_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword

SPRING_DATASOURCE_URL=jdbc:postgresql://automr_postgres:5432/automr_db
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=yourpassword

STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

SPRING_MAIL_USERNAME=your_email@gmail.com
SPRING_MAIL_PASSWORD=your_app_password

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 📂 Project Structure

```
Rental-Car-Project/
├── backend/      # Spring Boot API
├── frontend/     # React App
├── .env          # Environment variables
└── docker-compose.yml
```

---

## 🧪 Dev Endpoints

- 🔓 `/api/bookings` (GET, POST) – Public
- 🔐 `/api/bookings/{id}` (PUT, DELETE) – Admin only
- 🔐 `/api/settings` (GET/PUT) – Admin only
- 💳 `/api/stripe/checkout-session` – Stripe

Swagger: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

## 👨‍💻 Meet the Developers

### 🧑‍💻 Konstantinos Smaragdas  
- GitHub: [github.com/smaragdas](https://github.com/smaragdas)  
- LinkedIn: [linkedin.com/in/konstantinos-smaragdas](https://www.linkedin.com/in/konstantinos-smaragdas/)

### 🧑‍💻 Ioannis Xypteras  
- GitHub: [github.com/JohnXyp](https://github.com/JohnXyp)  
- LinkedIn: [linkedin.com/in/ioannisxypteras](https://www.linkedin.com/in/ioannisxypteras/)

---

## 📜 License

MIT – Use it, improve it, build on top of it.

---

> Built with ❤️ by Kostas & Ioannis.