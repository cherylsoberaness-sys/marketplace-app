## marketplace app built with next.js

---

## Features

Users can perform the following actions:

- Log in.
- Search for ads using the search form.
- Create ads when authenticated.
- Delete their own ads.

---

## Concepts

- Server Compponents
- Server Actions
- use client
- use server
- Streaming/Suspense
- Dynamic Routes
- Metadata generation
- SEO
- SSG, SSR, ISR
- Static params
- Error Boundaries
- Unit testng

## Technologies

- Next.js
- React
- Node.js
- TypeScrypt
- JavaScrypt
- Vitest
- Tailwind CSS
- Prisma
- Docker Compose
- Vercel

---

## Getting started:

### Clone the repositorie:

```bash
git clone <REPOSITORY_URL>
cd <PROJECT_NAME>
```

### Install dependencies:

```bash
npm install
```

### Configure environment variables:

Create a .env file based on .env.example:

```bash
cp .env.example .env
```

### Start the database

```bash
cd setup-db
docker compose up -d
cd ../
```

### Generate Prisma client

```bash
npm run db:generate
```

### Run database migrations

```bash
npm run db:migrate
```

### Seed the database

```bash
npm run seed
```

### Start the development server

```bash
npm run dev
```

### Run unit tests

```bash
npm run test
```
