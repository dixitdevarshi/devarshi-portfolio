# Devarshi Dixit — Portfolio

Personal portfolio site built with React, Vite, and Tailwind CSS. Single-page scroll layout covering an intro, projects, a publication, skills, and a contact form.

**Live site:** [devarshi-portfolio-sepia.vercel.app](https://devarshi-portfolio-sepia.vercel.app/)

## Stack

- React + Vite
- Tailwind CSS
- Framer Motion (animations, scroll effects, cursor)
- Formspree (contact form delivery)

## Running locally

\```bash
npm install
npm run dev
\```

## Environment variables

The contact form needs a Formspree endpoint to actually deliver messages. Create a `.env` file in the project root (this file is gitignored and never committed):

\```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
\```

Get your own endpoint by creating a free form at [formspree.io](https://formspree.io).

## Build

\```bash
npm run build
\```

Outputs to `dist/`.

## Deploy

Deployed on Vercel, connected to this repo for automatic deploys on push to `main`. Remember to add `VITE_FORMSPREE_ENDPOINT` as an environment variable in the Vercel project settings, it isn't picked up automatically from `.env`.