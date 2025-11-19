# Emotional Flow

## Overview

Emotional Flow is a mood tracking application that allows users to log and analyze their emotional states over time. The application features authentication, daily emotion check-ins, and analytics visualization through calendar heatmaps and charts. Users can track various emotions (joy, sadness, anger, calm, anxiety, neutral) with intensity levels and notes, providing insights into emotional patterns and trends.

**Project Type:** Pure HTML, CSS, and JavaScript (no frameworks or build tools)

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (November 19, 2025)

Converted the entire application from React/TypeScript/Express to pure HTML, CSS, and vanilla JavaScript:
- Removed all React, TypeScript, Node.js dependencies and build tools
- Created standalone HTML pages (index.html for auth, analytics.html for dashboard)
- Implemented all UI components and interactions in vanilla JavaScript
- Set up Python HTTP server for static file serving
- All data persists in browser localStorage

## System Architecture

### Frontend Architecture

**Technology Stack**
- Pure HTML5 for semantic markup
- CSS3 with custom properties for theming
- Vanilla JavaScript (ES6+) for all interactivity
- No frameworks, no build process, no compilation needed

**Pages & Structure**
- `index.html` - Landing/authentication page with sign-in and sign-up forms
- `analytics.html` - Main dashboard with calendar, charts, and emotion tracking
- `style.css` - Comprehensive stylesheet with responsive design
- `script.js` - All application logic and interactivity

**UI Components**
- Custom-built modal system for check-ins and detail views
- Calendar widget with emotion heatmap visualization
- Weekly insights bar chart showing emotion distribution
- Three-step check-in flow (emotion selection, intensity rating, note taking)
- Responsive design with mobile/tablet breakpoints

**State Management**
- Browser localStorage for all data persistence
- Emotion entries stored as JSON with timestamps
- Client-side only - no server required for functionality
- Default sample data seeded on first visit

**Data Visualization**
- Custom bar chart implementation for weekly insights
- Calendar heatmap showing emotion colors by day
- Daily detail cards with emotion breakdown
- Real-time updates after each check-in

### Storage Solution

**LocalStorage Implementation**
- Key: `emotionEntries` stores array of emotion records
- Key: `userEmail` stores authenticated user email
- Each entry contains: date, emotion, intensity (1-10), note, time
- Automatic seeding with sample data for new users

**Data Structure**
```javascript
{
  date: ISO timestamp,
  emotion: 'joy'|'sadness'|'anger'|'calm'|'anxiety'|'neutral',
  intensity: 1-10,
  note: 'User's notes',
  time: 'HH:MM AM/PM'
}
```

### Authentication

**Current Implementation**
- Client-side form validation
- Email/password fields with toggle between sign-in/sign-up
- Mock authentication (no backend verification)
- Email stored in localStorage for personalization
- Direct redirect to analytics page on submission

### Server Setup

**Development Server**
- Python's built-in HTTP server (`python3 -m http.server`)
- Serves static files on port 5000
- No backend processing required
- All logic runs in the browser

### File Organization

```
/
├── index.html          # Landing/auth page
├── analytics.html      # Main dashboard
├── style.css          # All styling
├── script.js          # All JavaScript
├── img/               # Image assets
│   └── illustration.png
└── .gitignore
```

### Features Implemented

1. **Authentication Page**
   - Sign in / Sign up form toggle
   - Email and password validation
   - Responsive design with illustration

2. **Analytics Dashboard**
   - Monthly calendar with emotion heatmap
   - Navigate between months
   - Click days to view details
   - Weekly insights bar chart
   - Today's emotion entries
   - Daily check-in button

3. **Check-in Modal (3 steps)**
   - Step 1: Select emotion category (6 options with icons)
   - Step 2: Rate intensity (1-10 slider)
   - Step 3: Add notes/trigger description
   - Progress indicator
   - Back/Next navigation

4. **Details Modal**
   - Shows all emotion entries for a selected day
   - Time, emotion type, and notes displayed
   - Color-coded by emotion

5. **Data Persistence**
   - All entries saved to localStorage
   - Survives page refreshes
   - Sample data included

### Design System

**Emotion Color Palette**
- Joy: #facc15 (yellow)
- Sadness: #60a5fa (blue)
- Anger: #ef4444 (red)
- Calm: #34d399 (green)
- Anxiety: #c084fc (purple)
- Neutral: #d5c7b4 (beige)

**Typography**
- Font: Inter (Google Fonts)
- Weights: 400, 500, 600, 700

**Responsive Breakpoints**
- Desktop: 1024px+
- Tablet: 640px - 1024px
- Mobile: < 640px

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ JavaScript support
- localStorage API required
- No polyfills included

### Deployment

**Static Hosting Ready**
- Can be deployed to any static hosting service
- No build process required
- No environment variables needed
- Works with GitHub Pages, Netlify, Vercel, etc.

**Replit Deployment**
- Python HTTP server configured in workflow
- Runs on port 5000
- Accessible via Replit's webview
