# QuickLink URL Shortener

QuickLink is a production-inspired, medium-complexity URL Shortener built with the MERN stack (MongoDB, Express, React, Node.js) and Redis.

## Features

- **User Authentication**: Secure registration and login using JWT and bcrypt.
- **URL Shortening**: Generates a random 7-character short code using `nanoid`.
- **Caching & Redirect**: Uses Redis for extremely fast caching. Cache hits return instantly, while cache misses fallback to MongoDB and update the cache.
- **Analytics**: Tracks total clicks and last accessed time.
- **Rate Limiting**: Limits IP addresses to 100 requests per 15 minutes.
- **Dashboard**: Simple, clean, and modern React interface with Tailwind CSS. Includes Dark Mode.
- **Search & QR Code**: Instantly search URLs and generate QR Codes for easy sharing.
- **Deployment Ready**: Optimized for deploying frontend to Vercel and backend to Render.

## Folder Structure

```
├── backend/
│   ├── config/       (Database & Redis connection)
│   ├── controllers/  (Logic for Auth and URL operations)
│   ├── middlewares/  (Auth, Error, and Rate Limiters)
│   ├── models/       (Mongoose schemas)
│   ├── routes/       (API route definitions)
│   ├── utils/        (Response formatting)
│   └── server.js     (Entry point)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/

└── README.md
```

## Installation

### Local Setup (npm)

1. Ensure MongoDB and Redis are running locally.
2. **Backend**:
   ```bash
   cd backend
   npm install
   # Create a .env file based on environment variables below
   npm run dev
   ```
3. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables (Backend)

Create a `.env` file in the `backend` directory:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/quicklink
REDIS_URI=redis://localhost:6379
JWT_SECRET=yoursupersecretkey
```

## Deployment

### Deploying Backend (Render)
1. Push your code to a GitHub repository.
2. On Render, create a new **Web Service** and connect your repository.
3. Set the Root Directory to `backend` (if you are deploying from a monorepo, or just deploy the backend folder).
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add your Environment Variables (`MONGO_URI`, `REDIS_URI`, `JWT_SECRET`). Note: You will need a hosted MongoDB (like MongoDB Atlas) and a hosted Redis (like Upstash or Render Redis).

### Deploying Frontend (Vercel)
1. Import your GitHub repository to Vercel.
2. Set the Framework Preset to **Vite**.
3. Set the Root Directory to `frontend`.
4. Add the Environment Variable `VITE_API_URL` and set it to your deployed Render backend URL (e.g., `https://your-backend.onrender.com`).
5. Click **Deploy**.

## API Documentation

| Method | Endpoint         | Description                   |
|--------|------------------|-------------------------------|
| POST   | `/auth/register` | Register a new user           |
| POST   | `/auth/login`    | Login user                    |
| POST   | `/url/create`    | Shorten a URL                 |
| GET    | `/url/all`       | Get all user URLs             |
| GET    | `/url/search?q=` | Search user URLs              |
| DELETE | `/url/:id`       | Delete a URL                  |
| GET    | `/:shortCode`    | Redirect to original URL      |
| GET    | `/health`        | Service health check          |

## How Cache Works

Redis is used to aggressively cache shortened URLs. When a user navigates to `/:shortCode`:
1. The backend first checks Redis (Cache).
2. If found (Cache Hit), it immediately updates the click count asynchronously and redirects the user.
3. If not found (Cache Miss), it fetches the URL from MongoDB, caches it in Redis with a 1-hour TTL, and then redirects the user.

## Rate Limiter Explanation

To prevent abuse and DDoS attacks, `express-rate-limit` is configured globally across the application. It restricts a single IP address to a maximum of 100 requests within a 15-minute window. If exceeded, a `429 Too Many Requests` response is returned.

## Future Improvements

- Custom Aliases
- URL Expiration Dates
- Advanced Click Analytics (Referrers, Geolocation)
- User Profile Management
