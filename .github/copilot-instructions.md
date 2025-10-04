## Quick orientation for AI coding agents

This repo is an Angular 20 application (standalone-component style) generated with Angular CLI and using @angular/build. Use this file as the minimal, actionable guide to be productive quickly.

- Entry points
  - `src/main.ts` — calls `bootstrapApplication(App, appConfig)`; App is a standalone root component in `src/app/app.ts`.
  - `src/app/app.config.ts` — provides Router and zoneless change detection via `provideRouter`, `provideZonelessChangeDetection()` and `provideBrowserGlobalErrorListeners()`.

- Routing & auth
  - Routes are declared in `src/app/app.routes.ts`. Example: `{ path: 'dashboard', component: DashboardLayout, canActivate: [AuthGuard] }`.
  - `src/app/Guards/auth-guard.ts` uses `AuthServices.getAuthStatus()` which checks `localStorage.getItem('userInfo')`.
  - `src/app/Services/auth-services.ts` stores a JSON object in `localStorage` under the key `userInfo` for login state. Search for `userInfo` when changing auth behavior.

- Component conventions
  - The project uses Angular standalone components (look for `standalone: true` in components such as `src/app/Pages/Layout/Public/header/header.ts`).
  - Components keep view and styles as sibling files: `*.html`, `*.css`, `*.ts`, and optional `*.spec.ts` (unit tests).
  - Many components include an `imports: [...]` array listing required Angular modules and other components — follow this pattern when creating new standalone components.

- Project layout (important folders)
  - `src/app/Pages/Layout/Public` and `/Secure` — top-level layout components (header, footer, dashboard layout/sidebar).
  - `src/app/Pages/Views/Public` and `/Secure` — page views (home, about, courses, etc.).
  - `src/app/Services` — injectable services (providedIn: 'root').
  - `public/` — static assets served by the app (configured in `angular.json` under `assets`).

- Build / dev / test commands
  - Start dev server: `npm run start` (runs `ng serve`, default host http://localhost:4200/).
  - Build production: `npm run build` (uses `@angular/build` builder; default configuration is `production`).
  - Run tests: `npm run test` (Karma + Jasmine configured). See `tsconfig.spec.json` and `angular.json` test section.

- Key environment / config notes
  - Tailwind is present (`tailwind.config.js`) and `@ngneat/tailwind` is installed. Global styles live in `src/styles.css` and are referenced in `angular.json`.
  - The app uses `@angular/material`, Bootstrap and Bootstrap Icons — styles are included via `angular.json`.
  - Change detection is zoneless (see `provideZonelessChangeDetection()` in `app.config.ts`). Be careful when introducing code that relies on NgZone or Zone.js behavior.

- Small but important patterns and gotchas
  - Auth is client-side dummy data (see `auth-services.ts`). Do not assume a backend exists — adapt integration points if adding real APIs.
  - Routes use a wildcard redirect at the end of `app.routes.ts` — always append new routes before `**`.
  - Many components use `styleUrl` vs `styleUrls` inconsistently; review component metadata if styles fail to load.
  - Local UI state is often stored in component fields (e.g., `loginModal` in header) and passed via child component inputs — check the `imports` arrays for component composition.

- Where to make common changes
  - Add a new page: create a standalone component in `src/app/Pages/Views/...`, add route to `src/app/app.routes.ts`, and import it where needed.
  - Add a service: create in `src/app/Services`, use `@Injectable({ providedIn: 'root' })`.
  - Modify layouts: edit `src/app/Pages/Layout/Public/*` or `.../Secure/*`.

- Testing and CI hints
  - Unit tests use Karma; find specs next to components (`*.spec.ts`). Keep tests fast and avoid real network calls — the app currently uses static/dummy data.

If anything above is unclear or you want the agent to follow stricter rules (naming, tests, branching), tell me what to add and I will iterate.  
