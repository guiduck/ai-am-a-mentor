# Project Plan: AI-Powered Video Learning Platform

## 1. Project Vision

A modern, AI-enhanced e-learning platform where creators can upload and sell video courses, and students can purchase access to watch them. The platform's key differentiator is an AI assistant, available in a chat interface, that can answer student questions by drawing context from the video transcripts of the course they are currently watching. This provides instant, on-demand support and enhances the learning experience.

## 2. Core Architecture & Technology Choices

- **Monorepo:** Use `pnpm workspaces` to manage the project, allowing for shared code (e.g., validation schemas, UI components) between the frontend and backend.
- **Frontend (Web App):** `Next.js` with TypeScript. This enables a fast, modern, and SEO-friendly user interface.
- **Backend (API):** `Fastify` with Node.js and TypeScript. Fastify is a high-performance, low-overhead web framework ideal for building robust APIs.
- **Database:** `PostgreSQL` for reliable, relational data storage (users, courses, videos, payments, etc.).
- **Video Processing & Storage:** A dedicated service like `AWS S3` for storing raw video uploads and `AWS Elemental MediaConvert` (or a similar service) for transcoding videos into various streaming formats (like HLS). This is crucial for providing a smooth streaming experience across different devices and network conditions.
- **Deployment:** `Docker` and `docker-compose` for containerizing the application, ensuring consistency between development and production environments.
- **AI Assistant:** A Retrieval-Augmented Generation (RAG) model. We will use a powerful Large Language Model (LLM) and provide it with context from video transcripts to answer user questions accurately.

## 3. Key Features

### Creator Portal

- **Authentication:** Secure registration and login for creators.
- **Course Management:**
  - Create, update, and publish courses.
  - Upload video files for each lesson.
  - Set course price and promotional materials.
- **Dashboard:** View sales data, student enrollment, and revenue reports.

### Student Portal

- **Authentication:** Secure registration and login for students.
- **Course Discovery:** Browse and search for available courses.
- **Payment Integration:** Securely purchase courses using a payment gateway like `Stripe`.
- **Video Player:** A high-quality, responsive video player to watch purchased course content.
- **AI Assistant Chat:**
  - A chat window available on the video-watching page.
  - Students can ask questions about the video content (e.g., "What did the instructor say about variable scope?", "Can you summarize the key steps for setting up the database?").
  - The AI provides answers based on the transcript of the current video.

## 4. AI Assistant Implementation (How it Works)

This feature does **not** require retraining a large language model, which would be extremely expensive and complex. Instead, we use a more clever and cost-effective approach called **Retrieval-Augmented Generation (RAG)**.

**Difficulty:** Medium to High. The complexity lies in the pipeline setup, not in model training.

**Steps:**

1.  **Video Transcription:**

    - When a creator uploads a video, our backend sends it to a transcription service (e.g., `AWS Transcribe`, `Deepgram`, or an open-source model).
    - This service processes the audio and generates a full text transcript with timestamps.
    - The transcript is saved and linked to the video in our database.

2.  **Contextual Retrieval:**

    - When a student asks a question in the chat while watching a specific video, the backend retrieves the transcript for that video.
    - For longer videos, we can use the current video timestamp to narrow down the relevant part of the transcript, making the context more precise.

3.  **AI-Powered Answering (The "Generation" part):**
    - The backend sends a carefully crafted prompt to a powerful LLM (like those from OpenAI, Google, or Anthropic).
    - This prompt includes:
      - **The System Instruction:** "You are a helpful assistant for a video course. Answer the user's question based _only_ on the provided video transcript."
      - **The Context:** The retrieved video transcript text.
      - **The User's Question:** The question the student typed into the chat.
    - The LLM reads the transcript and the question, and generates an answer that directly addresses the student's query using the information found in the video.

**Why this is powerful:**

- **Accurate:** The AI's knowledge is strictly limited to the video's content, preventing it from giving incorrect or out-of-scope answers.
- **Scalable:** It works for any video as long as we can transcribe it. We don't need a new AI model for each course.
- **Cost-Effective:** We only pay for transcription and LLM API calls per use, which is far cheaper than training a model.

## 5. Development & Deployment Workflow

1.  **Setup:** Initialize the pnpm monorepo, Next.js app, and Fastify API.
2.  **Database Schema:** Design and create the database tables for users, courses, videos, etc.
3.  **Authentication:** Implement user registration and login for both creators and students.
4.  **Video Upload & Processing:**
    - Set up the backend to handle large file uploads.
    - Integrate with S3 for storage and a transcription service.
    - Implement the video transcoding pipeline.
5.  **Payment Gateway:** Integrate Stripe or a similar service for course purchases.
6.  **Frontend Development:** Build the UI components for course creation, discovery, and the video player page.
7.  **Documentation:** Always update docs.md and nextSteps.md for each project of this monorepo after making changes so we can track progress on the docs can even set links to project folders referencing them
8.  **AI Integration:**
    - Develop the chat interface on the frontend.
    - Create the backend service that implements the RAG pipeline described above.
9.  **Deployment:**
    - Write `Dockerfile`s for the frontend and backend.
    - Create a `docker-compose.yml` file to orchestrate the services (webapp, api, database) for easy local development and deployment.

## Project Naming Suggestions

- **LearnFlow AI:** Emphasizes learning and the AI aspect.
- **EduMind AI:** Combines education with intelligent assistance.
- **CourseGenius:** Highlights the course content and smart features.
- **VideoMentor:** Focuses on video learning with an AI mentor.
- **InsightLearn:** Suggests deep understanding through AI.

## AI Model Naming Suggestions

- **VidSense:** Implies understanding video content.
- **CourseQuery:** Direct and functional, for querying course content.
- **EduBot:** Simple, friendly, and educational.
- **TranscriptMind:** Highlights its core function of processing transcripts.
- **Contextual Tutor:** Describes its role in providing context-aware answers.

## Winner

- **AiAmAMentor:** Focuses on video learning with an AI mentor.

## 6. API Route Definitions

### Creator Portal

- **Authentication**
  - `POST /api/creators/register`
  - `POST /api/creators/login`
- **Course Management**
  - `POST /api/courses`
  - `PUT /api/courses/:courseId`
  - `GET /api/courses/:courseId`
  - `GET /api/creators/courses`
  - `POST /api/courses/:courseId/videos`
- **Dashboard**
  - `GET /api/creators/dashboard`

### Student Portal

- **Authentication**
  - `POST /api/students/register`
  - `POST /api/students/login`
- **Course Discovery**
  - `GET /api/courses`
  - `GET /api/courses/:courseId`
- **Payment**
  - `POST /api/courses/:courseId/purchase`
- **Video Player**
  - `GET /api/courses/:courseId/videos`

### AI Assistant

- `POST /api/ai/ask`
