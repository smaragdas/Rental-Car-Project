<p align="center">
  <img src="https://raw.githubusercontent.com/smaragdas/Rental-Car-Project/main/docs/logo.png" alt="AutoMR Logo" width="200"/>
</p>

<h1 align="center">🚗 AutoMR Rental Car Service (Backend)</h1>

<p align="center">
  <a href="https://github.com/smaragdas/Rental-Car-Project/actions"><img src="https://img.shields.io/github/actions/workflow/status/smaragdas/Rental-Car-Project/ci.yml?branch=main&style=flat-square" alt="CI Status"/></a>
  <a href="https://github.com/smaragdas/Rental-Car-Project/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"/></a>
</p>

<p align="center"><em>Backend service for AutoMR, a modern car-rental platform by Konstantinos Smaragdas & Ioannis Xypteras.</em></p>

---

## 🎯 Table of Contents

1. [✨ Features](#-features)  
2. [🛠️ Tech Stack](#-tech-stack)  
3. [🚀 Quick Start](#-quick-start)  
   - [Prerequisites](#prerequisites)  
   - [Clone & Run](#clone--run)  
   - [Environment Variables](#environment-variables)  
4. [📦 Docker Setup](#-docker-setup)  
5. [📚 API Reference](#-api-reference)  
6. [🧪 Testing](#-testing)  
7. [🤝 Contributing](#-contributing)  
8. [👥 Authors](#-authors)  
9. [📄 License](#-license)  

---

## ✨ Features

- **User Bookings**: Create, update, delete, cancel (with 50% refund)  
- **Payment Processing**: Stripe integration with dynamic amount calculation  
- **Email Notifications**: Booking confirmation & cancellation emails  
- **Admin Controls**: Secure HTTP Basic Auth for management  
- **Configurable Settings**: Dynamic daily rates & minimum rental days  
- **Automated Cleanup**: Auto-delete bookings older than 2 months  
- **Validation**: Age, rental period, phone & email format  

---

## 🛠️ Tech Stack

| Layer            | Technology                    |
|------------------|-------------------------------|
| Framework        | Spring Boot 3.x               |
| Language         | Java 21                       |
| Database         | PostgreSQL                    |
| Payments         | Stripe API                    |
| Email            | Spring Mail (SMTP/Gmail)      |
| Security         | Spring Security (Basic Auth)  |
| Build            | Maven                         |
| Containerization | Docker & Docker Compose       |
| Testing          | JUnit & Mockito               |

---

## 🚀 Quick Start

### Prerequisites

- Java 21 JDK  
- Maven 3.x  
- PostgreSQL database  
- (Optional) Docker & Docker Compose  
- Stripe account & secret key  
- Gmail account (for SMTP emails)

### Clone & Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/smaragdas/Rental-Car-Project.git
cd Rental-Car-Project

# 2. Build & run with Maven
mvn clean spring-boot:run
```

#### Environment Variables

Create `src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/automr
spring.datasource.username=<DB_USER>
spring.datasource.password=<DB_PASS>

# Stripe
stripe.api.key=<STRIPE_SECRET_KEY>

# Gmail SMTP
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=<GMAIL_USER>
spring.mail.password=<GMAIL_APP_PASSWORD>
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

---

## 📦 Docker Setup

```bash
# Build & start services
docker-compose up --build -d

# Stop & remove services
docker-compose down
```

---

## 📚 API Reference

### Authentication

- **Admin** endpoints require HTTP Basic Auth  
  - Username: `admin`  
  - Password: `admin123`

### Public Endpoints

| Method | Endpoint        | Description           |
|:------:|-----------------|-----------------------|
| POST   | `/api/bookings` | Create a new booking  |
| GET    | `/api/bookings` | Retrieve all bookings |

### Admin Endpoints

| Method | Endpoint                        | Description                          |
|:------:|---------------------------------|--------------------------------------|
| POST   | `/api/bookings/admin`           | Create booking as admin             |
| PUT    | `/api/bookings/{id}`            | Update an existing booking          |
| PUT    | `/api/bookings/{id}/cancel`     | Cancel booking with 50% refund      |
| DELETE | `/api/bookings/{id}`            | Delete a booking                    |
| PUT    | `/api/settings`                 | Update rental rate & min days       |

---

## 🧪 Testing

```bash
# Run unit tests
mvn test
```

Use the provided Postman collection to validate all endpoints and scenarios.

---

## 🤝 Contributing

1. **Fork** the repo  
2. Create a feature branch: `git checkout -b feature/your-feature`  
3. Make your changes and commit: `git commit -m "Add feature"`  
4. Push to your branch: `git push origin feature/your-feature`  
5. Open a Pull Request  

---

## 👥 Authors

- **Konstantinos Smaragdas** – [smaragdas](https://github.com/smaragdas)  
- **Ioannis Xypteras** – [JohnXyp](https://github.com/JohnXyp)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
