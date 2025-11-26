# 📰 Sasta Morning Glory - Modern News Publishing System

A complete full-stack news publishing platform with admin dashboard and public-facing news website.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or cloud instance)
- npm or yarn
- Git (for cloning)

### Clone & Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd SastaMorningGlory

# Setup backend
cd backend
cp .env.example .env
npm install

# Setup frontend
cd ../frontend
cp .env.example .env
npm install
```

### Installation & Running

#### Backend (Port 5000)
```bash
cd backend
npm install
npm run dev
```

#### Frontend (Port 3000)
```bash
cd frontend
npm install
npm run dev
```

### Environment Setup

**Backend** (`backend/.env`):
```env
MONGODB_URI=mongodb://localhost:27017/sasta_morning_glory
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

⚠️ **IMPORTANT**: Never commit `.env` files to Git. Use `.env.example` as template.

## 📦 What's Included

### Frontend (React + Vite)
- ✅ Public news website with responsive design
- ✅ Category sections: National, International, J&K, Politics, Business, Technology, Entertainment, Sports
- ✅ Article detail pages with comments
- ✅ SEO optimized with meta tags and structured data
- ✅ Admin dashboard for content management
- ✅ Rich text editor for articles
- ✅ Image and video upload support
- ✅ Comment moderation panel

### Backend (Node.js + Express)
- ✅ RESTful API with Express
- ✅ MongoDB with Mongoose models
- ✅ JWT authentication for admin
- ✅ Security middleware (Helmet, CORS, rate limiting)
- ✅ File upload handling (Multer)
- ✅ HTML sanitization for XSS protection
- ✅ Comment approval workflow

## 🔐 Admin Access

**Login Credentials:**
- Username: `admin`
- Password: `12345678`

Navigate to: `http://localhost:3000/admin/login`

## 📝 Seeding Demo Data

To populate the database with sample articles:

```bash
cd backend
npm run seed
```

This will add 12 demo articles covering all categories with real placeholder images from Unsplash.

## 🌐 URLs

- **Public Website:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin/login
- **Backend API:** http://localhost:5000/api

## 📂 Project Structure

```
SastaMorningGlory/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── utils/      # API utilities, SEO helpers
│   │   └── styles/     # Global CSS
│   └── public/         # Static assets
└── backend/            # Express backend API
    ├── config/         # Database, environment config
    ├── controllers/    # Route handlers
    ├── middleware/     # Auth, sanitization, uploads
    ├── models/         # Mongoose schemas
    ├── routes/         # API routes
    ├── data/           # Demo articles JSON
    └── scripts/        # Database seeding scripts
```

## ✨ Features

### Public Features
- Homepage with hero headlines
- Category-based article browsing
- Article detail pages with rich content
- Public commenting (requires approval)
- Social sharing buttons
- Responsive mobile design

### Admin Features
- Secure login with JWT
- Create, edit, delete articles
- Upload images and videos
- Rich text content editor
- Article preview mode
- Comment moderation
- Category management

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router
- React Query
- Vite
- Axios

**Backend:**
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)
- Helmet, CORS, Rate Limiting

## 📸 Demo Articles

The seed script includes 12 articles covering:
- National news (Elections, Ayodhya, Mumbai Metro)
- International news (US-China trade, Europe energy, Middle East)
- Jammu & Kashmir (Tourism)
- Politics (MSP debate)
- Business (GDP growth)
- Technology (ISRO, Semiconductors)
- Entertainment (Bollywood)
- Sports (Cricket)

All articles include placeholder images from Unsplash that will display properly.

## 🔄 GitHub Setup

### Initial Commit
```bash
cd SastaMorningGlory
git init
git add .
git commit -m "Initial commit: Sasta Morning Glory news platform"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Important Files
- `.gitignore` - Excludes node_modules, .env, uploads, etc.
- `.env.example` - Template for environment variables (committed)
- `.env` - Actual environment variables (NOT committed)

### Cloning & Setup for Team Members
```bash
git clone <repo-url>
cd SastaMorningGlory

# Backend setup
cd backend
cp .env.example .env
# Edit .env with your local configuration
npm install

# Frontend setup
cd ../frontend
cp .env.example .env
# Edit .env if needed
npm install
```

## 🚨 Troubleshooting

### MongoDB Connection Issues
If you see MongoDB connection errors:
1. Ensure MongoDB is running: `mongod` or start your MongoDB service
2. Check connection string in `backend/.env` or use default localhost
3. Server will still start but database operations will fail

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

## 🧰 Build & Run Commands Used

```bash
# Backend dev server
cd backend
npm install
npm run dev

# Frontend dev server
cd frontend
npm install
npm run dev

# Frontend production build preview
cd frontend
npm run build
npm run preview
```

## 📄 License

MIT

---

**Built with ❤️ for Sasta Morning Glory**

