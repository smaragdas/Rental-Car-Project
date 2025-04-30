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

---

## ✨ Features

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
```

---

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

---

## 👥 Authors

- **Konstantinos Smaragdas** – [smaragdas](https://github.com/smaragdas)
- **Ioannis Xypteras** – [JohnXyp](https://github.com/JohnXyp)

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
