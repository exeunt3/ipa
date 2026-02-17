# Intensive Protocol Archive (IPA)

## Overview

IPA is a wiki for documenting intensive protocols (facilitation practices, group experiences, sound baths, ensemble performances, etc.) and the lived experience reports they generate. The application provides a calm, text-first interface for browsing, creating, and linking protocols with experience narratives. All content is stored in a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 16 with App Router
- **Rendering**: Server-side rendering for content pages, client components for forms
- **Styling**: Editorial black/white design system with square cards, inspired by modesofcognition.antikythera.org
- **Typography**: Cormorant Garamond (serif) for body text, Inter (sans-serif) for headers and UI elements
- **Hero**: Full-bleed atmospheric image (`public/hero-bg.png`) with dynamic serif typography

### Content Management
- **Storage**: PostgreSQL database with two main tables:
  - `protocols` - Protocol definitions with title, summary, overview, steps, tags, categories, constraints, safety
  - `experiences` - Experience reports linked to protocols with narrative, aftereffects, context, sei_effects
- **Validation**: Zod schemas (`lib/schemas.ts`) enforce structure for protocols and experiences
- **Categories**: Protocols can be tagged with one or more categories:
  - Music & Sound
  - Embodied Practices
  - Environmental & Spatial Practices
  - Games, Media & Technology
- **Category Images**: Located in `public/` as music.png, embodied.png, environment.png, technology.png

### Data Flow
1. Content is read from PostgreSQL database via `lib/content-read.ts`
2. New content is submitted via API routes (`/api/protocols/new`, `/api/experiences/new`)
3. API routes validate with Zod and insert directly into the database

### Key Design Decisions
- **Database-backed**: PostgreSQL for reliable persistence, no external API dependencies
- **Simple CRUD**: Direct database operations for fast, reliable content management
- **Markdown rendering**: Overview and steps are rendered as Markdown to HTML for display

### Route Structure
- `/` - Landing page
- `/protocols` - Protocol index with scrollable list of all protocols
- `/protocols/[slug]` - Individual protocol with aggregated experience stats
- `/protocols/new` - Form to create new protocol
- `/experiences/new` - Form to submit experience report
- `/about` - About page with IPA mission and philosophy

### Features
- **Dark Mode**: Toggle between light and dark themes using the moon/sun icon in the navigation. Theme preference is persisted in localStorage.
- **Responsive Design**: All pages adapt to mobile and desktop viewports

## External Dependencies

### Database
- **PostgreSQL**: Primary data store for protocols and experiences
  - `DATABASE_URL` environment variable automatically configured by Replit

### NPM Packages (Key Dependencies)
- `next` (16.x) - React framework with App Router
- `react` / `react-dom` (19.x) - UI library
- `pg` - PostgreSQL client
- `remark` / `remark-html` - Markdown to HTML conversion
- `zod` - Runtime schema validation for content structures

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string (automatically set by Replit)
- `GITHUB_TOKEN` - Personal access token (optional, for any remaining GitHub features)

## Database Schema

### protocols table
- `id` - SERIAL PRIMARY KEY
- `slug` - VARCHAR(255) UNIQUE NOT NULL
- `title` - VARCHAR(255) NOT NULL
- `summary` - TEXT NOT NULL
- `overview` - TEXT
- `steps` - TEXT
- `status` - VARCHAR(50) DEFAULT 'draft'
- `version` - INTEGER DEFAULT 1
- `tags` - TEXT[]
- `categories` - TEXT[]
- `constraints` - JSONB
- `safety` - JSONB
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

### experiences table
- `id` - SERIAL PRIMARY KEY
- `protocol_id` - INTEGER REFERENCES protocols(id)
- `protocol_slug` - VARCHAR(255) NOT NULL
- `reported_at` - DATE
- `anonymity` - VARCHAR(50)
- `sei_effects` - TEXT[]
- `context` - JSONB
- `narrative` - TEXT NOT NULL
- `aftereffects` - TEXT
- `created_at` - TIMESTAMP

## Recent Changes

- **2026-01-23**: Migrated from GitHub-based storage to PostgreSQL database
  - Removed GitHub API integration
  - Added `lib/db.ts` for database connection
  - Updated `lib/content-read.ts` to query database
  - Updated API routes to insert into database
  - Simplified protocols page to show all protocols in scrollable list
