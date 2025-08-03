# The Fader - Luxury Barbershop & Academy Platform

<div align="center">
  <img src="/public/images/logos/logo.png" alt="The Fader Logo" width="200" />
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.6-blue?logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Fader is a premium web platform serving both as a luxury barbershop website and a professional hairdressing academy. Built with modern web technologies, it offers an exceptional user experience with a focus on mobile-first design and luxury branding.

### Key Objectives
- Showcase barbershop services with luxury aesthetics
- Provide comprehensive information about hairdressing courses
- Enable easy contact and enrollment for potential students
- Deliver outstanding performance on all devices

## ✨ Features

### For Customers
- **Service Showcase**: Detailed presentation of barbershop services
- **Gallery**: Visual portfolio of work and achievements
- **Online Booking**: Direct WhatsApp integration for appointments
- **Location & Hours**: Easy access to business information

### For Students
- **Course Catalog**: Comprehensive course listings with details
- **Academy Information**: Staff profiles and academy history
- **Application System**: Streamlined enrollment process
- **Success Stories**: Alumni testimonials and achievements

### Technical Features
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Performance**: Optimized images, lazy loading, and code splitting
- **SEO**: Complete meta tags, Open Graph, and structured data
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Animations**: Smooth, GPU-accelerated animations with reduced motion support

## 🛠 Tech Stack

### Core
- **Framework**: [Next.js 15.3.0](https://nextjs.org/) - React framework with SSR/SSG
- **UI Library**: [React 18.3.1](https://reactjs.org/) - Component-based UI
- **Language**: [TypeScript 5.5.4](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 3.4.6](https://tailwindcss.com/) - Utility-first CSS

### Additional Libraries
- **Animations**: [Framer Motion 11.2.0](https://www.framer.com/motion/) - Production-ready animations
- **Icons**: [Lucide React](https://lucide.dev/) & [Heroicons](https://heroicons.com/)
- **Carousel**: [Keen Slider 6.8.6](https://keen-slider.io/) - Touch-friendly sliders
- **Utilities**: [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge)

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/barber-shem-tov.git
   cd barber-shem-tov
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_WHATSAPP_NUMBER=972528691415
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
barber-shem-tov/
├── public/                 # Static assets
│   ├── images/            # Images organized by section
│   │   ├── hero/         # Hero section images
│   │   ├── gallery/      # Gallery images
│   │   └── logos/        # Brand logos
│   └── fonts/            # Custom fonts
│
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   ├── academy/      # Academy pages
│   │   ├── courses/      # Courses pages
│   │   ├── gallery/      # Gallery page
│   │   └── apply/        # Application page
│   │
│   ├── components/       # React components
│   │   ├── common/       # Shared components
│   │   ├── home/         # Home page components
│   │   ├── academy/      # Academy components
│   │   ├── courses/      # Course components
│   │   ├── gallery/      # Gallery components
│   │   ├── navigation/   # Navigation components
│   │   └── icons/        # Icon components
│   │
│   ├── lib/              # Utilities and helpers
│   │   ├── data.ts       # Static data
│   │   └── utils.ts      # Utility functions
│   │
│   ├── config/           # Configuration files
│   │   └── navigation.ts # Navigation config
│   │
│   └── utils/            # Additional utilities
│       ├── galleryUtils.ts
│       └── openGraphUtils.ts
│
├── docs/                 # Documentation
│   ├── DEPLOYMENT.md     # Deployment guide
│   ├── API.md           # API documentation
│   └── COMPONENTS.md     # Component docs
│
├── .storybook/          # Storybook configuration
├── stories/             # Component stories
│
└── Configuration Files
    ├── next.config.js   # Next.js configuration
    ├── tailwind.config.js # Tailwind configuration
    ├── tsconfig.json    # TypeScript configuration
    └── package.json     # Dependencies and scripts
```

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check

# Storybook
npm run storybook    # Start Storybook server
npm run build-storybook # Build Storybook static files

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run E2E tests
```

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

### Git Workflow

1. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. Push to your branch
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build process or auxiliary tool changes

## 🧪 Testing

### Unit Testing
```bash
npm run test
```

### E2E Testing
```bash
npm run test:e2e
```

### Component Testing with Storybook
```bash
npm run storybook
```

## 📦 Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/barber-shem-tov)

## 📚 Documentation

- [Component Documentation](docs/COMPONENTS.md) - Detailed component API and usage
- [API Documentation](docs/API.md) - Data structures and API integration
- [Deployment Guide](docs/DEPLOYMENT.md) - Step-by-step deployment instructions
- [Storybook](https://your-storybook-url.com) - Interactive component documentation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from luxury brands
- Icons from [Lucide](https://lucide.dev/) and [Heroicons](https://heroicons.com/)
- Hosting by [Vercel](https://vercel.com)

---

<div align="center">
  Made with ❤️ by The Fader Development Team
</div>