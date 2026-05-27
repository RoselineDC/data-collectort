# Client Asset & Information Collection Platform

<p align="center">
  <strong>
    A modern platform for collecting structured client information,
    digital assets, product specifications, and project documentation.
  </strong>
</p>

<p align="center">
  Built for developers, agencies, and creatives.
</p>

---

## 🚀 Overview

This platform solves a major problem faced by developers and agencies:

Clients usually provide:
- random WhatsApp messages,
- poor quality images,
- incomplete product specifications,
- missing branding assets,
- inconsistent documentation.

This system centralizes and structures the entire onboarding workflow.

---

# ✨ Features

## Developer Features
- Authentication
- Project management
- Dynamic form creation
- Public form sharing
- Submission dashboard
- Asset management

---

## Client Features
- Public upload forms
- Guided submissions
- File uploads
- Mobile-friendly UI

---

# 🧠 Core Concept

Developers create projects and generate public form links.

Example:

```txt
domain.com/form/abc123
```

Clients use the link to:
- upload images,
- submit product information,
- upload PDFs/documents,
- provide structured business information.

All data is stored in a centralized dashboard.

---

# 🏗️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | Next.js |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| ORM | Prisma |
| Uploads | Cloudinary |
| Auth | Clerk |

---

# ⚡ Dynamic Form Engine

Instead of hardcoded forms:

```tsx
<input name="printer_name" />
```

The platform renders fields dynamically:

```tsx
fields.map(field => renderField(field))
```

This makes the system scalable across industries.

---

# 📦 Example Use Cases

## Printer Shops
- Product catalogs
- Printer specifications
- Toner products
- Manuals
- Service listings

## Photography Studios
- Portfolio uploads
- Event galleries
- Service packages
- Branding assets

## Construction Companies
- Previous projects
- Renovation galleries
- Service documentation

---

# 📂 Project Structure

```txt
app/
 ├── dashboard/
 ├── projects/
 ├── form/[token]/
 ├── api/

components/
 ├── forms/
 ├── uploads/
 ├── dashboard/

lib/
 ├── prisma.ts
 ├── cloudinary.ts
```

---

# 🔐 Environment Variables

```env
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLOUDINARY_URL=
```

---

# 🛠️ Installation

## Clone Repository

```bash
git clone <repo-url>
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

---

# 🎯 MVP Goals

- Dynamic forms
- File uploads
- Submission management
- Project dashboards
- Structured client onboarding

---

# 🔮 Future Features

- AI content generation
- OCR extraction
- White-label portals
- Analytics
- Team collaboration

---

# 📄 License

MIT License

---

# 👨‍💻 Author

Built for developers tired of chaotic client onboarding workflows.