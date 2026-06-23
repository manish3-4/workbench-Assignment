# Workbench RBAC Builder

Workbench RBAC Builder is a full-stack SaaS-style admin dashboard for managing roles, assigning multiple roles to users, and inspecting effective permissions resolved from overlapping role assignments.

## Project Overview

Administrators can:

- View all normalized permissions grouped by resource.
- Create, edit, preview, duplicate, and delete custom roles.
- Assign and remove multiple roles from users.
- Inspect each user's effective permissions.
- Work with preloaded seed roles and users in an in-memory store.

## Tech Stack

- Frontend: React, TypeScript, Vite, TailwindCSS, React Query, Zustand, React Hook Form, Zod, Lucide React
- Backend: Node.js, Express, TypeScript, Zod
- Storage: In-memory data only

## Setup

```bash
npm install
```

## Run Locally

Start the API and frontend together:

```bash
npm run dev
```

The app runs at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000/api

## Build

```bash
npm run build
```

## Type Check

```bash
npm run typecheck
```

## API Endpoints

- `GET /api/permissions`
- `GET /api/roles`
- `POST /api/roles`
- `PUT /api/roles/:id`
- `DELETE /api/roles/:id`
- `GET /api/users`
- `POST /api/users/:id/roles`
- `DELETE /api/users/:id/roles/:roleId`
- `GET /api/users/:id/effective-permissions`

## Seed Data

Roles:

- Owner: all permissions
- Admin: all permissions except `billing:update`
- Member: project, task, and member visibility permissions for contributors
- Viewer: read-only permissions across resources

Users:

- Sarah Johnson: Owner
- Alex Chen: Admin + Member
- Priya Singh: Member
- John Carter: Viewer

## Screenshots

Add screenshots here after running the app:

- `docs/screenshots/users-page.png`
- `docs/screenshots/roles-page.png`
- `docs/screenshots/role-form.png`

