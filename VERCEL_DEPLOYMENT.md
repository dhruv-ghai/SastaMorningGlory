# Vercel Deployment Guide

## Files Created
- backend/vercel.json
- frontend/vercel.json  
- Updated backend/server.js

## Deployment Steps

### 1. MongoDB Atlas Setup
- Go to mongodb.com/cloud/atlas
- Create FREE M0 cluster
- Add user and whitelist 0.0.0.0/0
- Get connection string

### 2. Deploy Backend
- Vercel.com → New Project
- Select backend folder
- Add environment variables
- Deploy

### 3. Deploy Frontend
- New Project → Select frontend folder
- Add VITE_API_URL
- Deploy

### 4. Update URLs
- Update FRONTEND_URL in backend
- Redeploy

Done! 100% FREE!