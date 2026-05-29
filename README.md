# VaultPay Backend

VaultPay Backend is an Express.js server for authentication, invoice management, and Stripe payments.

## Features
- JWT Authentication
- User Login/Register
- Invoice APIs
- Stripe Checkout Integration
- Stripe Webhooks
- MongoDB Database

---

# Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Stripe
- dotenv
- cors

---

# Folder Structure

backend/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── server.js
├── package.json
└── .env

---

# Installation

## Clone Repository

git clone <your-backend-repo-link>

cd backend

---

# Install Dependencies

npm install

---

# Environment Variables

Create a `.env` file inside backend folder.

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
CLIENT_URL=http://localhost:5173

---

# Run Backend

npm run dev

Backend runs on:

http://localhost:5000

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|-------|-----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

## Invoice

| Method | Endpoint | Description |
|-------|-----------|-------------|
| POST | /api/invoice/create | Create Invoice |
| GET | /api/invoice/all | Get All Invoices |

---

## Stripe

| Method | Endpoint | Description |
|-------|-----------|-------------|
| POST | /api/payment/create-checkout-session | Create Checkout Session |
| POST | /api/webhooks/stripe | Stripe Webhook |

---

# Stripe Webhook Setup

## Install Stripe CLI

npm install -g stripe

---

## Login Stripe

stripe login

---

## Start Webhook Listener

stripe listen --forward-to localhost:5000/api/webhooks/stripe

---

# Deploy on Render

1. Push Backend Code to GitHub
2. Open Render
3. Create New Web Service
4. Add Environment Variables
5. Deploy

---

# Author
Lucky Mishra