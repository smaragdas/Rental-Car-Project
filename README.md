
# 🚗 AutoMR - Mercedes Car Rental Platform

A full-stack car rental web application enabling users to browse, book, and manage Mercedes car rentals, built by:
- [Konstantinos Smaragdas](https://www.linkedin.com/in/konstantinos-smaragdas/) ([GitHub](https://github.com/smaragdas))
- [Ioannis Xypteras](https://www.linkedin.com/in/ioannisxypteras/) ([GitHub](https://github.com/JohnXyp))

---

## 📦 Tech Stack

### Frontend
- React + Vite
- TailwindCSS
- React Router
- Stripe.js
- i18n (internationalization)

### Backend
- Spring Boot (Java 21)
- PostgreSQL
- Stripe API Integration
- Spring Security + JWT
- Gmail SMTP for emails

### DevOps / Deployment
- Docker & Docker Compose
- GitHub Actions (optional)
- Env-based config (.env)

---

## 📸 Features

### Users
- Book a car with Stripe or in-person payment
- View availability based on car fleet size
- Multi-language support (EN/GR)
- Email confirmations

### Admins
- Manage all bookings
- Modify or delete reservations
- Change settings (car availability, pricing)
- Reset admin credentials securely

---

## ⚙️ How to Run (Local Dev)

### Prerequisites
- Docker + Docker Compose
- Java 21
- Node.js (for local frontend build)

```bash
# Clone project
git clone https://github.com/smaragdas/Rental-Car-Project.git
cd Rental-Car-Project

# Copy and configure the .env file
cp .env.example .env
# Add secrets: Stripe key, Gmail credentials, etc.

# Build & run all services
docker compose up --build
```

App will be available at: [http://localhost](http://localhost)

---

## 📁 Folder Structure

```
Rental-Car-Project/
├── backend/         # Spring Boot application
│   └── src/...
├── frontend/        # React + Tailwind frontend
│   └── src/...
├── docker-compose.yml
└── .env             # Secrets & config
```

---

## 🔐 Notes on Secrets

All credentials (Stripe, Gmail, DB, etc.) are stored in `.env` and injected into containers securely. Avoid committing real secrets to GitHub. GitHub will block commits with secrets like Stripe API keys.

---

## ✨ Authors

- **Konstantinos Smaragdas**  
  [LinkedIn](https://www.linkedin.com/in/konstantinos-smaragdas/) • [GitHub](https://github.com/smaragdas)

- **Ioannis Xypteras**  
  [LinkedIn](https://www.linkedin.com/in/ioannisxypteras/) • [GitHub](https://github.com/JohnXyp)
