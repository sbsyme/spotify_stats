
# Spotify Stats Web App

This project is a [Next.js](https://nextjs.org) web application bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), using TypeScript and Tailwind CSS. It allows users to authenticate with Spotify and view statistics about their listening activity.

## Features

- Spotify OAuth authentication
- View personalized Spotify listening statistics
- Modern, responsive UI with Tailwind CSS

## Getting Started

## Getting Started


First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Spotify API Setup

1. Register your app at the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
2. Add your Client ID and Client Secret to a `.env.local` file:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

3. Implement authentication and API calls in the Next.js API routes (see `/src/app/api`).

## Learn More

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
