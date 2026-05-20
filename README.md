# SkillMatch

A mobile-first workshop marketplace where users can host and register for short-term, skill-focused sessions outside the standard curriculum.

## Overview

SkillMatch solves a real problem at institutions like UBC, SFU and BCIT - students want hands-on exposure to specific tools and frameworks before they appear in formal coursework, and instructors are willing to share that knowledge informally. SkillMatch replaces fragmented group chats and word-of-mouth with a centralized registration platform.

## Features

- **JWT Authentication** - Secure login and session management with token-based auth
- **Workshop Marketplace** - Browsable, searchable feed of upcoming workshops with live capacity indicators
- **Categorized Discovery** - Filter sessions by skill type: Front-End, Back-End, Graphic Design, DevOps, Databases
- **Full Registration Flow** - Multi-step checkout with payment method selection and QR receipt generation
- **Capacity Management** - Real-time attendee tracking with automatic seat enforcement
- **Workshop Hosting** - Create and manage workshops with image uploads, application periods, and attendee lists
- **User Profiles** - Editable profiles with hosted and attended workshop history

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, React Router |
| Backend | Node.js, Express |
| Database | MongoDB |
| Auth | JWT |
| Media | Cloudinary |
| UI Components | shadcn/ui |
| Styling | CSS Variables, Mobile-First |

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

```bash
git clone https://github.com/ClaisaZ/IDSP-MarketPlace-FSWD.git

cd frontend && npm install
cd ../backend && npm install
```

### Running the App

```bash
# Backend - http://localhost:3000
cd backend && npm run dev

# Frontend - http://localhost:5173
cd frontend && npm run dev
```

## Design Philosophy

Built mobile-first for the ~65% of users on mobile devices. The UI is optimized for speed - minimal taps from discovery to confirmed registration.

## Team

Built by BCIT FSWD students as part of the IDSP program (2026-05-21).

- Shervin
- Clay
- Ky
