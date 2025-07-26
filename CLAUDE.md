# NOL-Play Mobile Game Application

## Overview
A mobile-optimized React TypeScript application featuring two games: picture guessing and coloring. Built with Vite, Chakra UI v3, and Tailwind CSS v4.

## Architecture

### Core Components
- `src/App.tsx`: Main application entry point, renders GameSelector
- `src/components/GameSelector.tsx`: Navigation hub with game selection and home button functionality
- `src/components/PictureGuessingGame.tsx`: Progressive image reveal game with Unsplash API
- `src/components/ColoringGame.tsx`: Canvas-based coloring game with brush tools

### Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **UI Libraries**: Chakra UI v3, Tailwind CSS v4
- **Build Tools**: Vite, ESLint, PostCSS
- **APIs**: Unsplash API for random images

## Build Commands
```bash
npm run dev      # Development server
npm run build    # Production build (includes TypeScript check)
npm run lint     # ESLint linting
npm run preview  # Preview production build
```

## Game Features

### Picture Guessing Game
- Progressive blur reveal (10%, 30%, 50%, 80%)
- Draggable slider for smooth reveal control
- Mobile touch support
- Random animal/fruit/vegetable images from Unsplash
- Left/right navigation between images

### Coloring Game
- HTML5 Canvas drawing system
- 25-color palette
- Multiple brush sizes (4px, 8px, 12px, 20px)
- Mobile touch and desktop mouse support
- Template outline system

## Mobile Optimization
- Touch event handling for canvas drawing
- Responsive design with Chakra UI breakpoints
- Mobile-first approach
- Fixed home button positioning

## Configuration Files
- `postcss.config.js`: PostCSS with Tailwind CSS v4 plugin
- `tailwind.config.ts`: Tailwind configuration
- `tsconfig.json`: TypeScript configuration
- `vite.config.ts`: Vite build configuration

## Development Notes
- Uses Chakra UI v3 Provider for theming
- Implements custom drag handlers for slider functionality
- Canvas drawing with requestAnimationFrame optimization
- State management with React hooks (useState, useCallback)