# Vehicle Service Booking System (MERN Stack)

A professional full-stack MERN (MongoDB, Express, React, Node.js) application designed for scheduling vehicle service appointments and administrative booking management.

## 🚀 Features

### Customer Features
- **Online Booking Form**: Choose vehicle type, model, license plate, preferred date, and time.
- **Service Categories Directory**: Search and filter services by name or category with duration and pricing.
- **My Bookings Dashboard**: Track real-time booking status (Pending, Confirmed, Completed, Cancelled) and cancel active bookings.
- **Authentication**: JWT-based Secure Login and Signup.

### Administrator Features
- **Booking Manager**: Review customer bookings and transition booking states (Confirm, Complete, Decline).
- **Service Catalog Manager**: Full CRUD capabilities to create, edit, or delete service offerings, adjust price and durations.
- **Dashboard Stats**: Real-time summary counts of booking metrics (Pending, Confirmed, Completed, Total).

---

## 🛠️ Project Structure

```
├── backend/
│   ├── config/          # DB connection
│   ├── middleware/      # Auth & Admin route guards
│   ├── models/          # Mongoose Schemas (User, Service, Booking)
│   ├── routes/          # Express Routers
│   ├── .env             # Environment configuration
│   └── server.js        # Express app entrypoint
├── frontend/
│   ├── src/
│   │   ├── components/  # Layouts (Navbar, Footer, Spinner)
│   │   ├── context/     # Auth Context Provider
│   │   ├── pages/       # Views (Home, Login, Register, Admin, Bookings)
│   │   ├── services/    # Axios API layer
│   │   ├── App.jsx      # Route switches
│   │   └── main.jsx     # Root mount point
│   ├── index.html
│   └── vite.config.js
├── .gitignore
├── package.json         # Root scripts for running stack
└── README.md
```

---

## 💻 Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or a MongoDB Atlas URI)

### Steps

1. **Clone the repository and install all dependencies**:
   Run the following command at the root of the project to install root, frontend, and backend packages:
   ```bash
   npm run install-all
   ```

2. **Configure Database**:
   Verify the backend `.env` variables located at `backend/.env`. It is configured to use your MongoDB Atlas database instance:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   ```


3. **Run the Application**:
   Start both the backend API server and Vite React frontend server concurrently using:
   ```bash
   npm run dev
   ```
   - **Frontend**: http://localhost:5173
   - **Backend**: http://localhost:5000

---

## 🔑 Default Roles & Accounts
- The first user who registers on the system will automatically be assigned the **Admin** role for testing purposes.
- Subsequenly registered accounts will default to the **Customer** role.
