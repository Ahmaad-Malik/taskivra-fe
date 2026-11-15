# Taskivra

Frontend of the AI Smart Task Assistant (FYP), built with React + Vite + Tailwind CSS.

## Run the project

```
npm install
npm run dev
```

## Preview mode (backend not connected yet)

`src/api/api.js` has `PREVIEW_MODE = true`. While it is true:

- the app starts with a demo user and a demo admin already logged in (`src/data/demo.js`), so every page opens from the url
- every form validates for real, then the API call is a commented `axios` block marked **"When the backend is connected"**
- popups can be opened from the url with `?dialog=...` (see the list below)

To connect the backend: set `PREVIEW_MODE = false`, then search the project for `When the backend is connected` and replace each commented block with the real call.

## Folder structure

```
src/
├── api/          BASE_URL and PREVIEW_MODE
├── assets/       icons (from Figma)
├── components/   reusable components (layouts, Button, InputField, Modal, Notice, ...)
├── context/      AuthContext (logged in user + admin)
├── data/         demo data used until the backend is ready
├── pages/        one file per page (user side)
│   └── admin/    admin pages
├── utils/        password rules
├── App.jsx       all routes
├── main.jsx      BrowserRouter + app entry
└── index.css     tailwind import + design tokens
```

## Sprint 1 screens

| Jira | Screen | URL |
| --- | --- | --- |
| SCRUM-11 | Register | `/register` |
| SCRUM-11 | Check your email / resent | `/register/check-email?email=a@b.com`, `?resent=yes` |
| SCRUM-11 | Email verified / invalid / expired | `/verify-email/abc`, `?dialog=invalid`, `?dialog=expired` |
| SCRUM-12 | Login + popups | `/login`, `?dialog=loading`, `error`, `blocked`, `logged-out` |
| SCRUM-14 | Forgot password flow | `/forgot-password` → `/forgot-password/sent` → `/reset-password/abc` → `/reset-password/success`, `/reset-password/expired`, `/forgot-password?dialog=error` |
| SCRUM-13 | User logout | "Log out ↗" in the left menu or the top-right Profile button |
| SCRUM-15 | View profile | `/profile`, `?dialog=loading`, `?dialog=error` |
| SCRUM-16 | Edit profile + popups | `/profile/edit`, `?dialog=saved`, `error`, `unsaved` |
| SCRUM-17 | Change password | `/settings?dialog=change-password`, `?dialog=password-changed` |
| SCRUM-18 | Delete account | `/settings?dialog=delete-account`, `deleting`, `account-deleted` |
| SCRUM-20 | Private workspace / session expired | any user page `?dialog=access-denied`, `?dialog=session-expired` |
| SCRUM-19 | Admin login + popups | `/admin/login`, `?dialog=loading`, `error`, `logged-out` |
| SCRUM-92 | Admin forgot password flow | `/admin/forgot-password` (same steps as the user flow under `/admin`) |
| SCRUM-91 | Admin logout | "Log out ↗" in the admin menu |
| SCRUM-110 | Admin change password | `/admin/profile`, `?dialog=change-password`, `?dialog=password-changed` |
| SCRUM-111 | Admin access denied / session expired | any admin page `?dialog=access-denied`, `?dialog=session-expired` |

## Tech used

- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
