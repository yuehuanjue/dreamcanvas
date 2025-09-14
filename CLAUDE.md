# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Type checking**: `npm run type-check`
- **Lint code**: `npm run lint`
- **Install dependencies**: `npm install`

## Architecture

This is a Vue 3 project featuring interactive UI components and 3D graphics:

### Core Technologies
- **Framework**: Vue 3 with Composition API and `<script setup>`
- **Build Tool**: Vite with HMR and optimized builds
- **Language**: TypeScript for type safety
- **Routing**: Vue Router with client-side navigation

### UI and Styling
- **Component System**: Based on shadcn-vue architecture
- **Styling**: Tailwind CSS with CSS variables for theming
- **Animations**: VueUse Motion (`@vueuse/motion`) and GSAP
- **3D Graphics**: Three.js with OGL for WebGL components
- **Icons**: Lucide Vue Next

### Key Dependencies
- **Motion Libraries**: `@vueuse/motion`, `gsap`, `motion-v`
- **3D Graphics**: `three`, `@types/three`, `ogl`
- **UI Primitives**: `radix-vue` for headless components
- **Utility Libraries**: `@vueuse/core`, `class-variance-authority`, `tailwind-merge`

## Project Architecture

### Directory Structure
```
src/
├── main.ts              # App entry point with router and motion plugin
├── App.vue              # Root component
├── components/
│   ├── Home.vue         # Home page component
│   ├── Generate.vue     # Generation/demo page component
│   ├── ClientOnly.vue   # Client-side only wrapper
│   └── ui/              # UI component library (18+ components)
└── lib/
    └── utils.ts         # Utility functions (cn, valueUpdater)
```

### UI Component Library
The `src/components/ui/` directory contains interactive components including:
- Animation components (animated-border-trail, typing-animation, text-reveal)
- Background effects (bg-neural, bg-stars, cosmic-portal)
- Interactive elements (fluid-cursor, ripple-button, gradient-button)
- Visual effects (border-beam, orbiting-circles, number-ticker)
- Utility components (file-upload, shimmer-button)

### Routing Configuration
- **Home Route** (`/`) - Main landing page with component showcase
- **Generate Route** (`/generate`) - Interactive demo and generation interface

## Configuration Details

### Path Aliases
- `@/` → `src/` directory
- `@/lib` → `src/lib/` directory

### Tailwind CSS
- Uses CSS variables for theming (light/dark mode support)
- Custom design system with semantic color tokens
- Animation utilities with custom keyframes
- Responsive container configuration

### Development Setup
- ESLint with Vue and TypeScript rules
- Prettier integration for code formatting
- Type checking with vue-tsc
- PostCSS for Tailwind CSS processing

## Working with Components

- All UI components follow shadcn-vue architecture patterns
- Use `cn()` utility function from `@/lib/utils` for conditional styling
- Components support automatic light/dark mode theming
- Motion directives are globally available (e.g., `v-motion-slide-visible-once-bottom`)
- Three.js components should be wrapped in `ClientOnly.vue` for SSR compatibility

## Important Notes

- The project uses Vue Router with history mode for navigation
- Motion plugin is globally installed and available in all components
- All styling uses Tailwind CSS with design system variables
- TypeScript is strictly enforced throughout the codebase
- 3D graphics components require client-side rendering only