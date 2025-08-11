# AI Workspace Chat Assistant

A React + Vite front-end application providing an immersive AI chat interface with workspace update capabilities.  
Features include user and bot chat bubbles, dynamic workspace update modal with support for PDF, Wikipedia, and YouTube sources, and asynchronous backend integration.

---

## Features

- Responsive chat UI with user and AI messages  
- Bot avatar and typing indicator for smooth UX  
- Workspace update modal supporting multiple source types (PDF, Wikipedia, YouTube)  
- Custom prompts generated based on user input and source selection  
- Async integration with backend API for AI responses  
- Modular, reusable React components

---

## Tech Stack

- React 18  
- Vite (fast dev server and build)  
- Redux Toolkit for state management  
- Tailwind CSS for styling  
- React Icons for UI icons

---

## Getting Started

### Prerequisites

- Node.js v18+  
- npm or yarn package manager

### Installation

#### 1. Clone the repository:

```bash
git clone https://github.com/anugrah18/cognitize-frontend.git
cd your-directory
```

#### 2. Install dependencies:
```bash
npm install
```
 or
```bash
yarn install
```

#### 3. Check the backend link (cognitize-backend):
Ensure the url is exactly same on which backend server is running in `constants.js` file
```bash
export const BACKEND_URL = "http://localhost:8001"
```

#### 4. Run the deployment server
```bash
npm run dev
```
or
```bash
yarn dev

```