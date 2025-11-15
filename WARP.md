# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 16 application using the App Router architecture, TypeScript, React 19, and Tailwind CSS v4. The project uses the React Compiler for optimizations.

## Commands

### Development
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Create production build
npm start            # Run production server
npm run lint         # Run ESLint
```

### Testing
This project does not currently have tests configured.

## Architecture

### Next.js App Router
- **Entry Points**: `src/app/layout.tsx` (root layout) and `src/app/page.tsx` (home page)
- **Routing**: File-system based routing within `src/app/` directory
- **Metadata**: Defined in layout files using Next.js Metadata API

### Styling
- **Framework**: Tailwind CSS v4 with PostCSS
- **Configuration**: Uses `@theme inline` in `globals.css` for theme customization
- **Fonts**: Geist Sans and Geist Mono loaded via `next/font/google`
- **Dark Mode**: Supports system preference via `prefers-color-scheme`

### TypeScript Configuration
- **Path Aliases**: `@/*` maps to `./src/*` for cleaner imports
- **Strict Mode**: Enabled
- **Target**: ES2017
- **JSX**: Uses `react-jsx` runtime

### React Compiler
- The project has `reactCompiler: true` enabled in `next.config.ts`
- This enables automatic optimizations for React components

## Code Conventions

### Component Structure
- Use functional components with TypeScript
- Server Components by default (App Router)
- Add `"use client"` directive only when needed for client-side interactivity

### Styling Patterns
- Use Tailwind utility classes directly in JSX
- CSS custom properties defined in `globals.css` for theme values
- Follow the existing dark mode pattern using Tailwind's `dark:` modifier

### Import Paths
- Use `@/` alias for imports from the `src` directory
- Example: `import Component from "@/app/components/Component"`

### Metadata
- Define metadata in layout.tsx or page.tsx files using Next.js Metadata API
- Export as `metadata` constant or `generateMetadata` function

## File Organization

```
src/
  app/
    layout.tsx       # Root layout with fonts and metadata
    page.tsx         # Home page
    globals.css      # Global styles and Tailwind imports
public/             # Static assets served from root
```

## Key Dependencies

- **Next.js**: 16.0.3
- **React**: 19.2.0
- **TypeScript**: ^5
- **Tailwind CSS**: ^4 (PostCSS version)
- **ESLint**: Configured with `eslint-config-next`
