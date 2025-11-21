# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Docusaurus 3.9 documentation website using TypeScript. It uses the classic preset with docs, blog, and custom pages.

## Common Commands

```bash
pnpm start          # Start local dev server (hot reload)
pnpm build          # Build static site to /build
pnpm serve          # Serve production build locally
pnpm typecheck      # Run TypeScript type checking
pnpm clear          # Clear Docusaurus cache
```

## Architecture

- **docusaurus.config.ts** - Main site configuration (title, URL, navbar, footer, presets)
- **sidebars.ts** - Sidebar configuration for docs (auto-generated from filesystem by default)
- **docs/** - Documentation markdown files (MDX supported)
- **blog/** - Blog posts in markdown
- **src/pages/** - Custom React pages and standalone markdown pages
- **src/components/** - Reusable React components
- **src/css/custom.css** - Global CSS customizations and theme variables
- **static/** - Static assets served at site root

## Key Patterns

- Uses `@site/` path alias for imports from project root
- Uses `@theme/` alias for Docusaurus theme components
- CSS Modules (`.module.css`) for component-scoped styles
- MDX files support React components inline

## Requirements

- Node.js >= 20.0
