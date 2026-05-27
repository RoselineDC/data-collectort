Client Asset & Information Collection Platform

Project Overview

A web-based platform that helps developers, agencies, and creatives collect structured project information and digital assets from clients in an organized, efficient manner.

The Problem

Clients typically provide incomplete, disorganized, or low-quality information during website and branding projects. Developers often receive:

•
Random WhatsApp messages

•
Poor-quality images

•
Missing product specifications

•
Unclear service descriptions

•
Inconsistent documentation

This fragmented approach slows down project delivery and creates friction in the onboarding process.

The Solution

This platform centralizes and structures the entire onboarding and content collection process through dynamic, template-driven forms that clients can easily complete from any device.




Core Concept

The platform enables a developer or agency to:

1.
Create a project — Set up a new client engagement

2.
Select or create a form template — Choose from pre-built templates or customize one

3.
Generate a public form link — Create a shareable URL for the client

4.
Send the link to the client — Distribute via email or messaging

5.
Receive structured submissions — Collect responses and uploaded files directly into a dashboard

Clients require no technical knowledge—they simply open the shared form link and complete guided sections.




Use Cases

•
Printer shops — Upload product catalogs, installation services, printer parts, toner products, and manuals

•
Photography studios — Upload portfolio images, service packages, and project descriptions

•
Construction companies — Upload completed projects, service categories, and documentation

•
Restaurants — Upload menus, dishes, branding assets, and social media links

•
Any service-based business — Streamline client onboarding and asset collection




Technical Architecture

Design Philosophy

The system is fully dynamic and template-driven, not hardcoded for specific use cases.

What we are NOT building:

JavaScript


// ❌ Hardcoded forms like this:
<input name="printer_name" />
<input name="product_description" />



What we ARE building:

JavaScript


// ✅ Schema-driven form engine:
fields.map(field => renderField(field))



This approach enables the platform to support multiple industries without changing frontend logic.




Primary Features (MVP)

Developer Features

•
Authentication — Secure login for developers and agencies

•
Dashboard — Central hub for managing projects and submissions

•
Create/manage projects — Set up and configure client projects

•
Select templates — Choose from pre-built or custom form templates

•
Generate public form links — Create shareable URLs for clients

•
View client submissions — Access all submitted data and files

•
Manage uploaded assets — Organize and preview client-provided media

Client Features

•
Open public form URL — Access forms via simple link

•
Fill structured business information — Complete guided form sections

•
Upload images/documents/files — Attach media assets

•
Submit forms from mobile or desktop — Responsive form experience

System Features

•
Dynamic form rendering — Fields rendered from database definitions

•
File upload handling — Secure file storage and management

•
Database storage — Persistent data and metadata storage

•
Submission management — Track and organize client responses

•
Media organization — Centralized asset management




Technology Stack

Frontend

Technology
Purpose
Next.js (App Router)
React framework with server-side capabilities
TypeScript
Type-safe development
Tailwind CSS
Utility-first styling
shadcn/ui
Pre-built, customizable UI components
React Hook Form
Efficient form state management
Zod
Schema validation




Backend

Technology
Purpose
Next.js Server Actions
Server-side logic and API endpoints
API Routes
RESTful endpoints where needed




Database

Technology
Purpose
PostgreSQL
Primary relational database
Drizzle ORM
Type-safe database queries




Authentication & Storage

Technology
Purpose
Manus OAuth
Developer authentication
S3
Media and file storage







Database Schema

Core Entities

1. Users

Stores developer and agency accounts.

Fields:

•
id — Unique identifier

•
email — User email

•
name — User name

•
createdAt — Account creation timestamp

•
updatedAt — Last update timestamp

2. Projects

Represents a client project.

Fields:

•
id — Unique identifier

•
userId — Reference to user/agency owner

•
name — Project name

•
description — Project description

•
clientName — Name of the client

•
status — Project status (active, archived, etc.)

•
createdAt — Creation timestamp

•
updatedAt — Last update timestamp

3. Templates

Reusable form blueprints for different industries/use cases.

Fields:

•
id — Unique identifier

•
userId — Reference to template creator

•
name — Template name (e.g., "Printer Shop Template")

•
description — Template description

•
industry — Industry category

•
isPublic — Whether template is shareable across users

•
createdAt — Creation timestamp

•
updatedAt — Last update timestamp

4. TemplateFields

Defines dynamic field configurations for templates.

Fields:

•
id — Unique identifier

•
templateId — Reference to template

•
label — Field label (e.g., "Business Name")

•
fieldType — Type of field (text, textarea, select, etc.)

•
placeholder — Placeholder text

•
required — Whether field is mandatory

•
validationRules — JSON object with validation constraints

•
options — JSON array of options (for select/radio/checkbox)

•
order — Display order in form

•
createdAt — Creation timestamp

5. Forms

Generated public forms tied to projects.

Fields:

•
id — Unique identifier

•
projectId — Reference to project

•
templateId — Reference to template used

•
publicUrl — Unique public URL slug

•
isActive — Whether form is accepting submissions

•
createdAt — Creation timestamp

•
updatedAt — Last update timestamp

6. Submissions

Stores client responses in JSON format.

Fields:

•
id — Unique identifier

•
formId — Reference to form

•
projectId — Reference to project

•
data — JSON object containing all form responses

•
submittedAt — Submission timestamp

•
clientEmail — Client email (if provided)

•
clientName — Client name (if provided)

7. Assets

Stores uploaded file metadata and URLs.

Fields:

•
id — Unique identifier

•
submissionId — Reference to submission

•
fileName — Original file name

•
fileType — MIME type

•
fileSize — File size in bytes

•
s3Url — URL to file in S3 storage

•
s3Key — S3 storage key

•
uploadedAt — Upload timestamp




Supported Field Types

The dynamic form engine supports the following field types:

Field Type
Use Case
Example
text
Single-line text input
Business name, contact person
textarea
Multi-line text input
Business description, service details
number
Numeric input
Price, quantity, phone number
email
Email input with validation
Contact email
phone
Phone number input
Contact phone
url
URL input with validation
Website, social media links
select
Dropdown selection
Industry category, service type
radio
Single choice from options
Yes/No questions, priority level
checkbox
Multiple choice selection
Services offered, product types
image upload
Single or multiple image uploads
Logo, product photos, portfolio
file upload
Document/file uploads
Specifications, manuals, contracts







Example Template Flow

Printer Shop Template

Template Name: Printer Shop Onboarding

Fields:

1.
Business Name (text, required)

2.
Logo Upload (image upload, required)

3.
Printer Brand (select, required)

4.
Product Name (text, required)

5.
Product Description (textarea, required)

6.
Product Images (image upload, multiple, required)

7.
Price (number, required)

8.
Social Media Links (url, multiple, optional)

9.
Service Categories (checkbox, required)

Public Form URL:

Plain Text


domain.com/form/abc123



Client Experience:

1.
Client receives link via email

2.
Opens form on mobile or desktop

3.
Fills in business information

4.
Uploads images and documents

5.
Submits form

6.
Developer receives structured data in dashboard




Dashboard Requirements

The developer dashboard provides:

Feature
Description
View all projects
List and filter all client projects
View all submissions
Access all form submissions across projects
Preview uploaded media
View images and documents inline
Download files
Export individual or batch files
Track missing information
Identify incomplete submissions
Edit templates
Modify form templates and fields
Submission details
View complete submission data
Asset management
Organize and manage uploaded files







Key Engineering Requirements

1. Dynamic Form Rendering

Fields must be stored in the database with configurations:

JSON


{
  "id": "field_001",
  "label": "Business Name",
  "fieldType": "text",
  "placeholder": "Enter your business name",
  "required": true,
  "validationRules": {
    "minLength": 3,
    "maxLength": 100,
    "pattern": "^[a-zA-Z0-9\\s&-]+$"
  }
}



2. Template Reusability

Templates must be:

•
Reusable across multiple projects

•
Customizable for specific use cases

•
Shareable between team members

•
Versionable to track changes

3. File Upload Handling

•
Store files in S3, not in database

•
Store only metadata (filename, size, type, URL) in database

•
Support multiple file uploads per field

•
Validate file types and sizes

•
Generate secure, expiring download URLs

4. Mobile Responsiveness

•
Forms must work seamlessly on mobile devices

•
Touch-friendly input fields and buttons

•
Responsive image previews

•
Mobile-optimized file upload

5. Data Validation

•
Client-side validation using Zod schemas

•
Server-side validation before storage

•
Custom validation rules per field

•
Clear error messaging




Development Priority

1.
Database architecture — Design and implement schema

2.
Dynamic form engine — Build form rendering system

3.
Upload system — Implement file upload to S3

4.
Dashboard — Create developer interface

5.
Submission management — Build submission viewing and filtering

6.
UX improvements — Polish UI and mobile experience

7.
AI enhancements — Add AI features later (not MVP)




Important Constraints

•
Mobile-first — Platform must work well on mobile devices

•
Non-technical clients — Forms should be simple and guided

•
Scalability — Architecture should support growth

•
Reusability — Avoid hardcoded business-specific logic

•
Database-driven — All forms and fields stored in database




Future Features (Not MVP)

The following features are intentionally deferred:

•
AI-generated descriptions

•
OCR extraction from images

•
Team collaboration features

•
Billing and subscription management

•
White-label portals

•
Drag-and-drop form builders

•
Email notifications

•
Analytics and reporting




Project Structure

Plain Text


client-asset-platform/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── dashboard/          # Developer dashboard
│   │   ├── form/[id]/          # Public form page
│   │   └── api/                # API routes
│   ├── components/             # Reusable React components
│   │   ├── FormRenderer.tsx    # Dynamic form engine
│   │   ├── Dashboard.tsx       # Dashboard layout
│   │   └── ...
│   ├── lib/                    # Utility functions
│   │   ├── db.ts              # Database client
│   │   ├── validation.ts      # Zod schemas
│   │   └── ...
│   ├── db/                     # Database
│   │   ├── schema.ts          # Drizzle schema
│   │   └── migrations/        # Database migrations
│   └── types/                  # TypeScript types
├── public/                     # Static assets
├── .env.local                  # Environment variables
├── drizzle.config.ts          # Drizzle configuration
├── tsconfig.json              # TypeScript config
├── tailwind.config.ts         # Tailwind configuration
└── package.json               # Dependencies






Getting Started

Prerequisites

•
Node.js 18+

•
PostgreSQL database

•
S3 bucket for file storage

•
Manus OAuth credentials

Installation

1.
Clone the repository

Bash


git clone <repository-url>
cd client-asset-platform





2.
Install dependencies

Bash


npm install





3.
Set up environment variables

Bash


cp .env.example .env.local
# Fill in your credentials





4.
Run database migrations

Bash


npm run db:migrate





5.
Start development server

Bash


npm run dev





6.
Open in browser

Plain Text


http://localhost:3000








API Endpoints (Planned )

Authentication

•
POST /api/auth/login — Developer login

•
POST /api/auth/logout — Developer logout

Projects

•
GET /api/projects — List all projects

•
POST /api/projects — Create new project

•
GET /api/projects/:id — Get project details

•
PUT /api/projects/:id — Update project

•
DELETE /api/projects/:id — Delete project

Templates

•
GET /api/templates — List all templates

•
POST /api/templates — Create new template

•
GET /api/templates/:id — Get template details

•
PUT /api/templates/:id — Update template

•
DELETE /api/templates/:id — Delete template

Forms

•
POST /api/forms — Create public form

•
GET /api/forms/:id — Get form details

•
POST /api/forms/:id/submit — Submit form (public endpoint)

Submissions

•
GET /api/submissions — List submissions

•
GET /api/submissions/:id — Get submission details

•
GET /api/projects/:id/submissions — Get project submissions

Assets

•
POST /api/assets/upload — Upload file to S3

•
GET /api/assets/:id — Get asset details




Validation Rules Example

TypeScript


// Zod schema for template field validation
const TemplateFieldSchema = z.object({
  label: z.string().min(1).max(100),
  fieldType: z.enum([
    'text',
    'textarea',
    'number',
    'email',
    'phone',
    'url',
    'select',
    'radio',
    'checkbox',
    'image',
    'file'
  ]),
  placeholder: z.string().optional(),
  required: z.boolean().default(false),
  validationRules: z.record(z.any()).optional(),
  options: z.array(z.string()).optional()
});






Security Considerations

•
Authentication — Require login for developer features

•
Authorization — Developers can only access their own projects

•
File validation — Validate file types and sizes before upload

•
CORS — Configure CORS for public form endpoints

•
Rate limiting — Implement rate limiting on form submissions

•
Data encryption — Encrypt sensitive data in transit and at rest

•
SQL injection prevention — Use parameterized queries (Drizzle ORM)




Performance Optimization

•
Image optimization — Compress images before S3 upload

•
Pagination — Paginate submission lists in dashboard

•
Caching — Cache template definitions

•
Database indexing — Index frequently queried fields

•
Lazy loading — Load submissions on demand

•
CDN — Serve assets via CDN




Testing Strategy

•
Unit tests — Test validation schemas and utilities

•
Integration tests — Test API endpoints

•
E2E tests — Test complete user flows

•
Form testing — Test dynamic form rendering

•
Upload testing — Test file upload functionality




Deployment

The platform can be deployed to:

•
Vercel — Recommended for Next.js

•
Railway — Full-stack deployment

•
AWS — EC2, RDS, S3

•
DigitalOcean — App Platform

•
Manus — Built-in hosting with custom domains




Contributing

1.
Create a feature branch

2.
Make your changes

3.
Write tests

4.
Submit a pull request




License

[Specify your license here]




Contact & Support

For questions or support, please contact [your contact information].




Roadmap

Phase 1 (MVP)

•
Core form engine and template system

•
Basic dashboard

•
File upload to S3

•
Developer authentication

Phase 2

•
Team collaboration

•
Advanced analytics

•
Submission filtering and search

•
Email notifications

Phase 3

•
AI-powered descriptions

•
OCR extraction

•
White-label portals

•
Billing integration

Last Updated: May 2026