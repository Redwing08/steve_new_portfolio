# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
// 
//   "name": "steve-portfolio",
//   "private": true,
//   "version": "0.0.0",
//   "type": "module",
//   "scripts": {
//     "dev": "vite",
//     "build": "vite build",
//     "lint": "oxlint",
//     "preview": "vite preview"
//   },
//   "dependencies": {
//     "axios": "^1.19.0",
//     "framer-motion": "^13.0.0",
//     "react": "^19.2.8",
//     "react-dom": "^19.2.8"
//   },
//   "devDependencies": {
//     "@types/react": "^19.2.17",
//     "@types/react-dom": "^19.2.3",
//     "@vitejs/plugin-react": "^6.0.4",
//     "oxlint": "^1.75.0",
//     "vite": "^8.2.0"
//   }