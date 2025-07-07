# 🌍 Nomad Connect - Backend

Nomad Connect is a full-stack travel platform designed to help users explore destinations, share travel tips, and connect with other nomads. This backend is built using **Express.js** and provides a robust REST API for authentication, destination management, user profiles, and travel tip articles.

---

## 🚀 Tech Stack

- **Node.js** & **Express.js** - Server and routing  
- **MongoDB (Mongoose)** - NoSQL database  
- **JWT** - Authentication via tokens  
- **Multer** - File upload handling (images)  
- **Firebase Storage** - Cloud image storage  
- **OpenCage API** - Geocoding services  
- **Compression** - Response compression middleware  
- **CORS** - Secure cross-origin requests  

---

## 📁 Project Structure

```
├── controllers/       # Route logic
├── database/          # MongoDB connection
├── middlewares/       # Auth and file upload middleware
├── models/            # Mongoose schemas
├── routes/            # API route definitions
├── public/            # Static image storage (for dev)
├── index.js           # App entry point
└── .env               # Environment config
```

---

## 📦 Features

### 🔐 Authentication
- `POST /api/register` – Register new user (with profile picture)
- `POST /api/login` – Login
- `POST /api/logout` – Logout
- `POST /api/refresh-token` – Refresh JWT

### 👤 User
- `GET /api/profile` – Get authenticated user's profile
- `PATCH /api/profile` – Update user profile (bio, picture)
- `GET /api/users` – Get all users
- `GET /api/user/:id` – Get user by ID

### 📍 Destinations
- `GET /api/destinations` – List all destinations
- `GET /api/destinations/:id` – Get destination by ID
- `POST /api/destinations` – Create a new destination (requires auth)
- `PATCH /api/destinations/:id` – Update a destination (auth)
- `DELETE /api/destinations/:id` – Delete a destination (auth)
- `PATCH /api/destinations/:id/like` – Like a destination
- `POST /api/destinations/:id/comment` – Add comment

### 🧳 Travel Tips
- `GET /api/travel-tips` – List all travel tips
- `GET /api/travel-tips/:id` – Travel tip detail
- `POST /api/travel-tips` – Create a new travel tip (auth)
- `PATCH /api/travel-tips/:id` – Update travel tip (auth)
- `DELETE /api/travel-tips/:id` – Delete travel tip (auth)
- `PATCH /api/travel-tips/:id/like` – Like travel tip
- `POST /api/travel-tips/:id/comment` – Add comment

### 🌐 Geocoding
- `GET /api/geocode?query=` – Get geolocation data using OpenCage API

---

## ⚙️ Setup & Installation

```bash
# 1. Clone the repo
git clone https://github.com/Ambiya12/NomadConnect.git
cd nomad-connect
cd server

# 2. Install dependencies
npm install

# 3. Add a .env file in the root directory
# (see Environment Variables section below)

# 4. Start the development server
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following values:

```env
PORT=8000
MONGO_DB_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
OPENCAGE_API_KEY=<your-opencage-api-key>
FIREBASE_SERVICE_ACCOUNT_KEY='{your-firebase-service-account-key-json}'
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```

---

## 📤 Image Uploads

- **Profile Pictures:** Stored via `Multer` or Firebase (`/images/profiles`)  
- **Destination Images:** Stored in Firebase (`/images/destinations`)  

---

## 📦 Scripts

```bash
npm run dev      # Start server with nodemon
npm start        # Start server for production
```

---

## 🔐 Deployment Notes

- This backend is deployed to [Railway](https://railway.app)  
- CORS is configured to accept requests from:  
  - `https://nomadconnect.up.railway.app`

---

## 🧪 Testing

You can use **Postman** or **Thunder Client** to test API endpoints.  
Authentication routes use JWT stored in cookies (with credentials).

---

## 📫 Contact

Feel free to reach out if you want to collaborate or have questions!

---

> Made with ❤️ for travelers by developers
