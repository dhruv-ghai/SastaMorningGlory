# Sasta Morning Glory API

## Getting started

```bash
cd backend
cp .env.example .env # set secrets
npm install
npm run dev
```

Seed demo articles:

```bash
npm run seed
```

## REST endpoints

### Auth
- `POST /api/auth/login` – body `{ username, password }` → returns JWT + cookie.

### Articles
- `GET /api/articles?category=&page=&limit=` – public list with pagination.
- `GET /api/articles/:slugOrId` – fetch article by slug or Mongo `_id`.
- `POST /api/articles` – (admin) multipart form to create article (fields: title, slug?, category, content, metaDescription, keywords[], tags[], videoUrl, youtubeId, thumbnail, heroImage).
- `PUT /api/articles/:id` – (admin) update article.
- `DELETE /api/articles/:id` – (admin) remove article.

### Comments
- `GET /api/comments/public/:articleId` – approved comments for article.
- `POST /api/comments/:articleId` – submit comment (username, text).
- `GET /api/comments/pending` – (admin) moderation queue.
- `PATCH /api/comments/:id/approve` – (admin) approve comment.
- `DELETE /api/comments/:id` – (admin) delete comment.

## Security middleware
- Helmet, CORS, cookie-parser, rate limiting, sanitize-html, multer validation, JWT guard.

## Data models
- `Article` – category, media, SEO meta, tags, optional video.
- `Comment` – username, text, approved flag (default false).
- `User` – admin account (currently hardcoded login before DB seeding).

