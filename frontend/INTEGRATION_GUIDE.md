# Chat Application Integration Guide

## Step 1: Project Setup

### Prerequisites
Make sure you have Node.js installed on your system.

### Create New Project (if starting fresh)
```bash
npm create vite@latest my-chat-app -- --template react
cd my-chat-app
npm install
```

### Install Required Dependencies
```bash
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Step 2: Configuration Files

### Update package.json
Add these dependencies to your existing package.json:
```json
{
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.18"
  }
}
```

### Configure Tailwind CSS
Update your `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Configure PostCSS
Create/update `postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autopre