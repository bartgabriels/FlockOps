# Schapentracker Server

## Setup

1. Copy `.env.example` to `.env` and update `DATABASE_URL`.
2. Install dependencies:
   ```bash
   cd server
   npm install
   ```
3. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
4. Run migration / create database schema:
   ```bash
   npm run prisma:migrate
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## Endpoints

- `GET /health`
- `GET /paddocks`
- `GET /sheep`
- `GET /movements`
- `POST /paddocks`
- `POST /sheep`
- `POST /movements`
