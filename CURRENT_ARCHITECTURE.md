# Video Learning Platform - Current Architecture

## Overview

AI Am A Mentor is a video learning platform with AI-powered mentorship. The platform allows creators to upload video courses and provides students with AI assistance while watching.

## Current Tech Stack

### Backend (API)

- **Framework**: Fastify (Node.js/TypeScript)
- **Database**: PostgreSQL on Render
- **ORM**: Drizzle ORM
- **Authentication**: JWT
- **Validation**: Zod

### Storage & Services

- **Video Storage**: Cloudflare R2 (S3-compatible)
- **Video Transcription**: OpenAI Whisper API
- **Database Hosting**: Render PostgreSQL

### Frontend

- **Framework**: Next.js 15
- **Styling**: CSS Modules with custom design system
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Validation**: Zod

## Architecture

```
Frontend (Next.js) → API (Fastify) → Database (Render PostgreSQL)
                                  ↓
                              Cloudflare R2 (Videos)
                                  ↓
                              OpenAI Whisper (Transcription)
```

## Key Features

### For Creators

- User registration and authentication
- Course creation and management
- Video upload to Cloudflare R2
- Automatic video transcription via OpenAI Whisper
- Course analytics

### For Students

- Course browsing and enrollment
- Video playback with AI mentor chat
- AI assistance trained on video transcripts
- Progress tracking

## Environment Setup

### Backend (.env)

```bash
# Database (Render PostgreSQL)
DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require"

# JWT
JWT_SECRET="your-jwt-secret"

# Server
PORT=3333
NODE_ENV="development"

# Cloudflare R2
CLOUDFLARE_ACCOUNT_ID="your-account-id"
CLOUDFLARE_ACCESS_KEY_ID="your-access-key"
CLOUDFLARE_SECRET_ACCESS_KEY="your-secret-key"
CLOUDFLARE_BUCKET_NAME="ai-am-a-mentor"
CLOUDFLARE_R2_ENDPOINT="https://account-id.r2.cloudflarestorage.com"

# OpenAI
OPENAI_API_KEY="sk-proj-..."
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_BASE_URL="http://localhost:3333"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NODE_ENV="development"
```

## API Endpoints

### Authentication

- `POST /api/creators/register` - Creator registration
- `POST /api/creators/login` - Creator login
- `POST /api/students/register` - Student registration

### Courses

- `GET /api/creators/courses` - List creator's courses
- `POST /api/creators/courses` - Create new course

### Videos

- `POST /api/videos/upload-url` - Generate R2 upload URL
- `POST /api/videos/transcribe` - Transcribe video with OpenAI Whisper
- `GET /api/videos` - List videos

### Health

- `GET /health` - API health check

## Database Schema

### Users

- id (UUID, PK)
- username (unique)
- email (unique)
- password_hash
- role (creator/student)
- created_at, updated_at

### Courses

- id (UUID, PK)
- title
- description
- creator_id (FK → users.id)
- price
- created_at, updated_at

### Videos

- id (UUID, PK)
- course_id (FK → courses.id)
- title
- r2_key (Cloudflare R2 key)
- transcript_r2_key (R2 key for transcript)
- duration
- created_at, updated_at

### Transcripts

- id (UUID, PK)
- video_id (FK → videos.id)
- content (transcript text)
- created_at

## Development Workflow

1. **Database**: Render PostgreSQL (always SSL)
2. **Local Development**: Use production env for consistency
3. **Video Upload**: Direct to Cloudflare R2 via presigned URLs
4. **Transcription**: OpenAI Whisper API processing
5. **AI Chat**: Trained on video transcripts for student assistance

## No AWS Dependencies

- ❌ No AWS Lambda
- ❌ No AWS S3
- ❌ No AWS RDS
- ✅ Cloudflare R2 for storage
- ✅ Render for database and deployment
- ✅ OpenAI for AI services

## Deployment

- **Backend**: Render Web Service
- **Frontend**: Vercel (recommended) or Render Static Site
- **Database**: Render PostgreSQL (managed)
- **Storage**: Cloudflare R2 (managed)
