# DreamCanvas

A modern Vue 3 application featuring interactive UI components with stunning animations and 3D graphics. Built with cutting-edge technologies for creating immersive user experiences.

## ✨ Features

- **Interactive UI Components** - 16+ beautifully crafted components with animations
- **3D Graphics** - Three.js and OGL integration for WebGL experiences
- **Motion Animations** - GSAP and VueUse Motion for smooth transitions
- **Modern Architecture** - Vue 3 Composition API with TypeScript
- **Design System** - Tailwind CSS with shadcn-vue components
- **Dark Mode** - Built-in theme switching support

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dreamcanvas

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 📁 Project Structure

```
src/
├── main.ts              # Application entry point
├── App.vue              # Root component
├── components/
│   ├── Home.vue         # Home page with component showcase
│   ├── Generate.vue     # Interactive demo page
│   ├── ClientOnly.vue   # SSR compatibility wrapper
│   └── ui/              # UI component library (16+ components)
│       ├── animated-border-trail/
│       ├── bg-neural/
│       ├── cosmic-portal/
│       ├── fluid-cursor/
│       ├── gradient-button/
│       ├── orbiting-circles/
│       ├── ripple-button/
│       ├── shimmer-button/
│       └── ...
└── lib/
    └── utils.ts         # Utility functions
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Lint and fix code issues

### Tech Stack

**Core**
- Vue 3 with Composition API
- TypeScript for type safety
- Vite for fast development and builds
- Vue Router for client-side navigation

**UI & Styling**
- Tailwind CSS with custom design tokens
- shadcn-vue component architecture
- CSS variables for theming
- Responsive design patterns

**Animations & Graphics**
- VueUse Motion for declarative animations
- GSAP for advanced animations
- Three.js for 3D graphics
- OGL for WebGL rendering

**Development Tools**
- ESLint + Prettier for code quality
- TypeScript strict mode
- PostCSS for CSS processing
- Lucide icons

## 🎨 UI Components

The project includes a comprehensive library of interactive components:

### Animation Components
- **Animated Border Trail** - Dynamic border animations
- **Typing Animation** - Typewriter text effects
- **Text Reveal** - Progressive text animations

### Background Effects
- **Neural Background** - Animated neural network visualization
- **Starry Background** - Interactive star field
- **Cosmic Portal** - 3D portal effects

### Interactive Elements
- **Fluid Cursor** - Mouse-following effects
- **Ripple Button** - Click ripple animations
- **Gradient Button** - Animated gradient backgrounds
- **Shimmer Button** - Shimmering hover effects

### Visual Effects
- **Border Beam** - Animated border highlights
- **Orbiting Circles** - Circular motion animations
- **Number Ticker** - Animated number counters

## 🔧 Configuration

### Path Aliases
- `@/` → `src/` directory
- `@/lib` → `src/lib/` directory

### Theme System
The project uses CSS variables for consistent theming:
- Light/dark mode support
- Semantic color tokens
- Responsive breakpoints
- Custom animation keyframes

## 📱 Responsive Design

All components are built with mobile-first responsive design:
- Breakpoints: sm, md, lg, xl, 2xl
- Container max-width: 1400px
- Flexible grid and spacing system

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
