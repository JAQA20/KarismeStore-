# Implementation Plan - Convert La Comanda SaaS to React + TypeScript

We will migrate the static `sass.html` dashboard into a modern, interactive React + TypeScript single-page application (SPA). This will modularize the code, separate screens into clean components, and enable interactive features like station switching, table searching/updates, and kitchen ticket completions.

## User Review Required

> [!IMPORTANT]
> **Component Separation:** We will split the monolithic HTML file into modular page components under `src/pages/` and create reusable layout components (e.g., `SideNavBar` and `Header`).
>
> **Interactive State Management:** Instead of just static screens, we will create a shared React state/context in the main app. This will allow:
> - Logging in as a Waiter, Kitchen Staff, or Admin and landing on the correct screen.
> - Switching screens dynamically using the sidebar navigation.
> - Interactivity like searching tables, marking kitchen tickets as "Ready" (which updates KDS stats in real time), and managing products/users.

## Open Questions

> [!IMPORTANT]
> **Tailwind CSS Version:**
> - **Option 1 (Recommended): Tailwind CSS v3.** This matches the exact configuration format, plugins (forms, container-queries), and classes used in your original `sass.html` CDN script.
> - **Option 2: Tailwind CSS v4.** The latest version, which uses CSS-first configuration rather than `tailwind.config.js`.
> *We recommend Option 1 to ensure 100% styling fidelity with your original Tailwind theme settings.*
>
> Please confirm if you would like to proceed with Tailwind CSS v3.

---

## Proposed Changes

### Project Structure & Setup

We will create a Vite + React + TypeScript project in the current directory and install dependencies: `tailwindcss`, `postcss`, `autoprefixer`, and `lucide-react` or Google Material Symbols (as used in the original). We'll configure `tailwind.config.js` to match the exact custom colors, fonts, and spacing defined in `sass.html`.

---

### [Component Name] React App Infrastructure

#### [NEW] [tailwind.config.js](file:///Users/jaqa/Documents/Proyectos/LaComanda-SaaS/tailwind.config.js)
Tailwind configuration file mapping all custom theme variables (`primary`, `surface-container`, `font-headline-lg`, etc.) from the original script config.

#### [NEW] [postcss.config.js](file:///Users/jaqa/Documents/Proyectos/LaComanda-SaaS/postcss.config.js)
PostCSS configuration for Tailwind compiler.

#### [MODIFY] [index.html](file:///Users/jaqa/Documents/Proyectos/LaComanda-SaaS/index.html)
Load Google Fonts (Inter, JetBrains Mono) and Material Symbols Outlined stylesheet to display all icons correctly.

#### [NEW] [src/types/index.ts](file:///Users/jaqa/Documents/Proyectos/LaComanda-SaaS/src/types/index.ts)
TypeScript interfaces for Tables, Kitchen Tickets, Products, Users, and Stats.

#### [NEW] [src/components/SideNavBar.tsx](file:///Users/jaqa/Documents/Proyectos/LaComanda-SaaS/src/components/SideNavBar.tsx)
Shared navigation sidebar component that supports active state styling and lets users switch between views.

#### [NEW] [src/components/Header.tsx](file:///Users/jaqa/Documents/Proyectos/LaComanda-SaaS/src/components/Header.tsx)
Shared header component with search, stats indicators, notifications, and user profiles.

---

### Page Components

#### [NEW] [src/pages/LoginPage.tsx](file:///Users/jaqa/Documents/Proyectos/LaComanda-SaaS/src/pages/LoginPage.tsx)
The login portal screen featuring:
- Bento-style station toggle (WAITER, KITCHEN, ADMIN).
- Credential input fields with view password functionality.
- Direct redirection to the correct view upon clicking "Access Terminal".

#### [NEW] [src/pages/TableViewPage.tsx](file:///Users/jaqa/Documents/Proyectos/LaComanda-SaaS/src/pages/TableViewPage.tsx)
The Waiter Table floor monitor featuring:
- Live table grid with status filter (Occupied, Available, Pending Billing).
- Dynamic count indicators in the header.
- Interactive modal / buttons to take/open orders or process payments, which updates the application state.

#### [NEW] [src/pages/KitchenMonitorPage.tsx](file:///Users/jaqa/Documents/Proyectos/LaComanda-SaaS/src/pages/KitchenMonitorPage.tsx)
The dark-themed KDS (Kitchen Display System) view featuring:
- Live horizontal scrolling ticket feed.
- Dynamic color-coding and animations for urgent tickets (e.g. peanut allergy).
- "Ready" completion action that completes the ticket and updates metrics.
- Live kitchen statistics dashboard column.

#### [NEW] [src/pages/AdminDashboardPage.tsx](file:///Users/jaqa/Documents/Proyectos/LaComanda-SaaS/src/pages/AdminDashboardPage.tsx)
The business terminal featuring:
- Stats Bento Grid (Total Sales, Load, Alerts, Avg Fulfillment).
- Peak Hour Volume chart (CSS-based visual bar chart matching design).
- Staff performance leaderboards.
- Product/Menu editor table with "New Item" capability.
- User management table displaying role designations and status.

#### [MODIFY] [src/App.tsx](file:///Users/jaqa/Documents/Proyectos/LaComanda-SaaS/src/App.tsx)
State hub managing:
- Current route/screen state.
- List of tables, kitchen tickets, menu products, and system users.
- Renders the active Page component.

---

## Verification Plan

### Automated & Manual Verification
- **Compilation Check**: Run `npm run build` or `tsc` to verify that there are no TypeScript errors.
- **Visual Design Review**: Inspect layouts on desktop and mobile sizes to ensure responsive design parity.
- **Interactivity Flow Test**:
  1. Login page: Select station WAITER and enter dummy credentials. Verify login button takes you to Table View.
  2. Table View page: Use search input to filter tables. Verify counters at the top.
  3. KDS page: Click "Ready" on a ticket and check that it is removed and completed count increases.
  4. Admin dashboard page: Verify chart render, staff list, product edit buttons.
  5. Navigation: Use sidebar to jump between Dashboard, Table View, and Kitchen Monitor, and verify Logout redirects back to Login.
