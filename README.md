# News Chatbot Frontend

A modern React-based frontend for an AI-powered news chatbot. This application provides an intuitive interface for users to interact with a chatbot that can answer questions about news articles using RAG (Retrieval Augmented Generation) technology.

## Features

- 💬 Real-time chat interface
- 🔄 Persistent chat sessions
- 📰 News article context in responses
- 🎨 Modern and responsive UI
- ⚡ Fast and efficient communication with backend

## Tech Stack

- React + TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Fetch API for backend communication

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with:
   ```env
   VITE_API_URL="Your backend URL"  # For local development
   ```

## Available Scripts

### `npm run dev`

Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.
The build is minified and optimized for the best performance.

### `npm run preview`

Locally preview the production build.

## Deployment

This application is configured for deployment on Render. To deploy:

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the following settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run preview`
4. Add environment variables:
   - `VITE_API_URL`: Your backend URL

## Project Structure

```
src/
├── components/     # React components
│   ├── ChatContainer.tsx    # Main chat interface
│   ├── ChatInput.tsx        # Message input
│   ├── Header.tsx           # App header
│   ├── MessageList.tsx      # Chat messages display
│   └── TypingIndicator.tsx  # Loading animation
├── App.tsx         # Root component
└── main.tsx        # Entry point
```

## Environment Variables

- `VITE_API_URL`: Backend API URL
  - Local: `http://localhost:8000`
  - Production: Your deployed backend URL
