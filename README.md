# Web Attendance System

React + Vite attendance application (frontend). Provides manual attendance, history, and monthly charts. Use this README to set up, run and extend the project.

## Features
- Manual attendance marking (by roll number)
- Student attendance history and stats
- Monthly attendance view and simple charts (table)
- Simple demo authentication (localStorage token)
- Vite + React + TypeScript project structure

## Prerequisites
- Node.js 18+ (recommended)
- npm (comes with Node.js)
- Git

## Quick setup (developer)
1. Clone repository:
   git clone https://github.com/Vishnu-Varthan1/webattendance.git
2. Change to react app folder:
   cd c:\Users\vishn\OneDrive\Desktop\web-attendance-system\react
3. Install dependencies:
   npm install
4. Run dev server:
   npm run dev
5. Open browser at the URL printed by Vite (usually http://localhost:5173)

## Scripts
- npm run dev — start development server (Vite)
- npm run build — production build (runs tsc then vite build)
- npm run preview — preview production build

## Project layout (key files)
- react/
  - src/
    - App.tsx — main routes and navigation
    - main.tsx — React entry
    - index.css — global CSS (Tailwind or plain)
    - components/
      - ManualAttendance.tsx — mark attendance UI
      - AttendanceHistory.tsx — search student and view history
      - AttendanceChart.tsx — month/year attendance overview
      - Login.tsx / Logout.tsx — demo auth
      - PrivateRoute.tsx — route protection
      - Authcontext.tsx — optional context provider
  - package.json — app scripts & deps
  - vite.config.ts — Vite config

## Using the app (demo)
- Login: navigate to /login and use any username/password (demo mode) to set token in localStorage.
- Mark attendance: navigate to Manual Attendance, enter roll number and mark present.
- History: navigate to Attendance History, enter roll number and click search to view mock history.
- Chart: navigate to Attendance Chart to view monthly overview and daily data (mock).

## Backend / Real integration
- Current implementation uses mock data. Replace the mock data / simulated API calls with real endpoints:
  - POST /api/auth/login — returns token
  - POST /api/attendance/mark — body: { roll_number, date, status }
  - GET /api/attendance/history?roll=123
  - GET /api/attendance/chart?month=MM&year=YYYY
- Use axios or fetch in components and handle loading/errors.

## Notes & troubleshooting
- Ensure Node.js version is >= 18 to avoid ESM issues with some vite plugins.
- If you see plugin/ESM errors, run:
  npm install
  npm cache clean --force
  rm -rf node_modules package-lock.json
  npm install
- On Windows, use PowerShell commands to remove folders (del /s /q ...) rather than Unix `rm -rf`.

## Contributing & pushing to GitHub
1. Create a branch: git checkout -b feat/your-feature
2. Commit changes: git add . && git commit -m "Add feature"
3. Pull remote updates before pushing: git pull origin main --allow-unrelated-histories
4. Push branch and open PR:
   git push -u origin feat/your-feature

## Next improvements (suggested)
- Persist attendance in a backend database (Express, FastAPI, etc.)
- Replace tables with charts (Chart.js / Recharts)
- Add user roles (teacher/admin) and secure authentication
- Export attendance CSV or PDF reports

## License
MIT
