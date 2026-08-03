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

- Server Components
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
- Unit testing

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
---
The app doesnt include a user registration form. Use one of the seeded accounts below to test protected features such as deleting and creating ads. The seeded users already own sample ads, allowing you to test both public and authenticated features immediately:

email: ed@mk.io |
password: randomPwd123

email: Ss@mk.io |
password: randomPwd456

