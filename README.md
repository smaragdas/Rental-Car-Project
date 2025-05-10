<<<<<<< HEAD
<p align="center">
  <img src="https://raw.githubusercontent.com/smaragdas/Rental-Car-Project/main/docs/logo.png" alt="AutoMR Logo" width="200"/>
</p>

<h1 align="center">🚗 AutoMR Full-Stack Rental Car Service</h1>
<p align="center"><em>A complete car rental platform with React frontend and Spring Boot backend.</em></p>

---

## 🎯 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Clone & Run Locally](#clone--run-locally)
   - [Environment Variables](#environment-variables)
6. [Docker Setup](#docker-setup)
7. [API Reference](#api-reference)
8. [Testing](#testing)
9. [Contributing](#contributing)
10. [Authors](#authors)
11. [License](#license)

---

## 📝 Project Overview

AutoMR is a full-stack car rental service:

- **Frontend**: Responsive React application styled with Tailwind CSS, providing an intuitive booking interface.
- **Backend**: Spring Boot REST API, handling bookings, payments via Stripe, email notifications, and admin dashboard.

Together they deliver a seamless user experience for customers and admins alike.

---

## 🏛️ Architecture

```
┌──────────────────┐       ┌─────────────┐       ┌─────────────┐
│  React Frontend  │ ⇄     │ Spring Boot │ ⇄     │ PostgreSQL  │
│ (Vite, Tailwind) │       │   Backend   │       │  Database   │
└──────────────────┘       └─────────────┘       └─────────────┘
       │                         │                    │
       │  Stripe Payments         │                    │
       └────────────────────────>│                    │
       │                         │                    │
       │     Email (SMTP)        └───────────────────▶│
       │                         │                    │
```
=======

# 🚗 AutoMR – Car Rental Booking Platform

Welcome to **AutoMR**, a modern and responsive car rental web platform built by [Konstantinos Smaragdas](https://github.com/smaragdas) and [Ioannis Xypteras](https://github.com/JohnXyp)!  
This project was designed to be a user-friendly, secure, and scalable solution for managing car rental bookings online.
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd

---

## ✨ Features

<<<<<<< HEAD
- **Customer Booking**: Search availability, select dates, pay online (min 4 days, age ≥24)
- **Admin Dashboard**: Manage rates, rental rules, view and edit bookings
- **Payment Processing**: Stripe PaymentIntent & partial refunds on cancellation (50%)
- **Email Notifications**: Booking confirmation & cancellation alerts via SMTP (Gmail)
- **Automated Cleanup**: Deletes bookings older than 2 months
- **Validation**: Frontend inputs & backend constraints for email, phone, age, dates
- **Responsive UI**: Mobile-first, accessible, styled with Tailwind CSS
- **Containerized**: Dockerfiles for both frontend & backend, orchestrated with Docker Compose

---

## 🛠️ Tech Stack

| Layer          | Frontend                         | Backend                         |
|----------------|----------------------------------|---------------------------------|
| Framework      | React (Vite)                     | Spring Boot 3.x                 |
| Language       | JavaScript & JSX                 | Java 21                         |
| Styling        | Tailwind CSS                     | —                               |
| State          | React Context / Hooks            | —                               |
| DB             | —                                | PostgreSQL                      |
| Payments       | —                                | Stripe API                      |
| Email          | —                                | Spring Mail (SMTP/Gmail)        |
| Security       | JWT or session (future)          | Spring Security (Basic Auth)    |
| Build          | npm / Yarn                       | Maven                           |
| Container      | Docker                           | Docker                          |
| Orchestration  | Docker Compose                   | Docker Compose                  |
| Testing        | Jest + React Testing Library     | JUnit & Mockito                 |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16+) & **npm** or **Yarn**
- **Java 21 JDK**
- **Maven 3.x**
- **PostgreSQL**
- **Docker & Docker Compose** (optional)
- **Stripe** account & secret key
- **Gmail** account (for SMTP)

### Clone & Run Locally

```bash
# 1. Clone the monorepo
git clone https://github.com/smaragdas/Rental-Car-Project.git
cd Rental-Car-Project
```

#### Backend

```bash
cd backend
mvn clean spring-boot:run
```

> **Backend** runs at `http://localhost:8080`

#### Frontend

```bash
cd frontend
npm install       # or yarn
npm run dev       # or yarn dev
```

> **Frontend** runs at `http://localhost:5173`

---

### Environment Variables

#### Backend (`backend/src/main/resources/application.properties`)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/automr
spring.datasource.username=<DB_USER>
spring.datasource.password=<DB_PASS>

stripe.api.key=<STRIPE_SECRET_KEY>

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=<GMAIL_USER>
spring.mail.password=<GMAIL_APP_PASSWORD>
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

#### Frontend (`frontend/.env`)
```
VITE_API_BASE_URL=http://localhost:8080/api
=======
- 🖥️ **Frontend** built with **React + Vite** for lightning-fast performance
- 🛡️ **Secure backend** built with **Spring Boot (Java)** and JWT authentication
- 💳 **Stripe integration** for secure online payments
- 📧 Email notifications via **Gmail SMTP**
- 🐳 Fully **Dockerized** environment with PostgreSQL
- 👨‍💻 Simple **admin panel** for managing bookings and rental settings
- 🌍 Multi-language support using `react-i18next`
- ✅ Mobile-first and responsive design
- 🔄 Smart logic to prevent overbooking and handle cancellations

---

## 📁 Project Structure

```bash
Rental-Car-Project/
│
├── backend/                # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/automr/
│   │       ├── controller/ # REST controllers (bookings, settings, stripe)
│   │       ├── service/    # Service layer for business logic
│   │       ├── model/      # Data models (Booking, Settings)
│   │       └── security/   # JWT & Spring Security
│   ├── resources/
│   │   └── application.properties
│   └── Dockerfile
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── pages/          # Booking and Admin pages
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global state (e.g., settings)
│   │   └── lib/            # API logic & helpers
│   └── Dockerfile
│
├── .env                    # Central environment config
├── docker-compose.yml      # Root Docker orchestration
└── README.md               # Project info
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
```

---

<<<<<<< HEAD
## 📦 Docker Setup

From project root:

```bash
# Build & start all services
docker-compose up --build -d

# Stop & remove services
docker-compose down
```

- **backend**: uses `backend/Dockerfile`
- **frontend**: uses `frontend/Dockerfile`
- **db**: PostgreSQL service defined in `docker-compose.yml`

---

## 📚 API Reference

### Public Endpoints

| Method | Endpoint            | Description           |
|:------:|---------------------|-----------------------|
| POST   | `/api/bookings`     | Create a new booking  |
| GET    | `/api/bookings`     | Retrieve all bookings |

### Admin Endpoints (Basic Auth)

| Method | Endpoint                        | Description                       |
|:------:|---------------------------------|-----------------------------------|
| POST   | `/api/bookings/admin`           | Create booking as admin          |
| PUT    | `/api/bookings/{id}`            | Update a booking                  |
| PUT    | `/api/bookings/{id}/cancel`     | Cancel booking (50% refund)      |
| DELETE | `/api/bookings/{id}`            | Delete a booking                  |
| PUT    | `/api/settings`                 | Update rates & minimum days       |

---

## 🧪 Testing

#### Backend
```bash
cd backend
mvn test
```

#### Frontend
```bash
cd frontend
npm test    # or yarn test
```

---

## 🤝 Contributing

1. Fork the repo
2. Create branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/your-feature`
5. Open Pull Request
=======
## 🧱 Technologies & Tools

| Layer         | Tech Stack                                     |
|---------------|------------------------------------------------|
| Frontend      | React, TailwindCSS, Vite, react-i18next        |
| Backend       | Spring Boot, Java 21, Spring Security, JWT     |
| Payments      | Stripe API (secure online transactions)        |
| Email         | Gmail SMTP (JavaMailSender)                    |
| Database      | PostgreSQL                                     |
| DevOps        | Docker, Docker Compose                         |
| Versioning    | Git, GitHub                                    |

We chose this tech stack because it's modern, efficient, and easily deployable across platforms. React + Vite gives a super-fast frontend. Spring Boot ensures enterprise-grade backend performance. Docker makes deployment reproducible and clean.

---

## 🔐 Security Highlights

- JWT authentication for all admin endpoints
- Email credentials and API keys are securely managed via `.env` files
- Stripe payment secret never exposed in frontend
- HTTPS support ready for production deployment

---

## 📦 Deployment Instructions

1. Create a `.env` file in the root:
    ```env
    POSTGRES_DB=automr_db
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=yourpassword

    SPRING_DATASOURCE_URL=jdbc:postgresql://automr_postgres:5432/automr_db
    SPRING_DATASOURCE_USERNAME=postgres
    SPRING_DATASOURCE_PASSWORD=yourpassword

    SPRING_MAIL_USERNAME=your_email@gmail.com
    SPRING_MAIL_PASSWORD=your_app_password

    STRIPE_SECRET_KEY=sk_test_...
    VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
    VITE_API_BASE_URL=http://localhost:8080/api

    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=admin123
    ```

2. Build and run with Docker:
    ```bash
    docker-compose up --build
    ```
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd

---

## 👥 Authors

<<<<<<< HEAD
- **Konstantinos Smaragdas** – [smaragdas](https://github.com/smaragdas)
- **Ioannis Xypteras** – [JohnXyp](https://github.com/JohnXyp)
=======
- 👨‍💻 [Konstantinos Smaragdas](https://www.linkedin.com/in/konstantinos-smaragdas) ([GitHub](https://github.com/smaragdas))
- 👨‍💻 [Ioannis Xypteras](https://www.linkedin.com/in/ioannisxypteras) ([GitHub](https://github.com/JohnXyp))
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd

---

## 📄 License

<<<<<<< HEAD
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
=======
MIT License – Feel free to use this project as inspiration, but do not publish it as your own portfolio.

---

## 💬 Feedback

We’d love to hear your thoughts. Feel free to open issues or contribute!

---

> Made with ❤️ by two students who love clean code and fast cars.
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
