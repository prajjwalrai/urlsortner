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
- **Dockerized**: Fully containerized with Docker and Docker Compose for easy deployment.

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
├── docker-compose.yml
└── README.md
```

## Installation

You can run this project locally using `npm` or `Docker`.

### Option 1: Docker (Recommended)

1. Ensure Docker Desktop is running.
2. Run the following command from the root directory:
   ```bash
   docker-compose up --build
   ```
3. The Backend will run on `http://localhost:5000`
4. The Frontend will run on `http://localhost:5173`

### Option 2: Local (npm)

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
