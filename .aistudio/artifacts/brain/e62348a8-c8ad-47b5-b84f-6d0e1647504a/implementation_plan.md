# KASE ERP Home Portal Workspace News & Developments Feed

A two-column operational dashboard for the KASE ERP portal home workspace, featuring dedicated live feeds for internal organizational circulars & events alongside external skilling sector news, project milestones, and batch launches.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were confirmed based on the user's requirements:
> - **Layout Structure**: Side-by-side two columns layout with feed cards inside the home workspace canvas.
> - **Content Scope**: 
>   - **Column 1 (Internal)**: Administrative circulars, government orders, institutional events, capacity-building workshops, and internal notices.
>   - **Column 2 (External / Sectoral)**: Skilling sector developments, state/national project milestones, new training batch rollouts, and partnership announcements.

---

### 1. Overview & Core Concept

- **What It Does**: Replaces the currently blank right-hand canvas on the ERP Home portal view (`activeModule === 'home'`) with an institutional news and intelligence center.
- **Target Audience**: All KASE officers, division executives, project managers, and visitors accessing the ERP portal prior to or between divisional logins.
- **Key Value**: Provides situational awareness across KASE divisions without requiring sign-in to individual functional modules, keeping staff updated on recent government orders, training batch starts, and state skill mission milestones.

---

### 2. User Experience & Visual Design

- **Layout & Composition**:
  - The right-hand workspace displays a responsive two-column grid (`grid grid-cols-1 lg:grid-cols-2 gap-4 h-full p-4 overflow-y-auto`).
  - Strict adherence to the KASE ERP design system: `#f3f2f1` neutral backdrop, `#004578` deep blue accents, `#d2d0ce` hairline borders, single-elevation cards with hover highlights, and unboxed metadata lines separated by typographic dots (`·`).
- **Column 1: Internal Developments & Circulars**:
  - Header with icon, item counter, live search, and category filter (All, Circulars, Events, Orders).
  - Cards featuring official reference numbers (`KASE/ADMIN/CIR/2026/14`), release dates, issuing division (HR, IT, Administration, MD Office), title, brief synopsis, and an interactive "View Notice" trigger.
- **Column 2: External Skilling News & Project Milestones**:
  - Header with icon, item counter, and stream filter (All, Projects, Batch Launches, Sector News).
  - Cards featuring sector tags, partner organizations (e.g., Keltron, ASAP Kerala, NSDC, Industry Partners), progress metrics (e.g., "150 Candidates Enrolled"), execution timeline, and an interactive "Read Brief" trigger.
- **Interactive Detail Drawer / Modal**:
  - Clicking any card displays a clean preview modal with full circular text, reference numbers, signatory details, and simulated download/print actions.

---

### 3. Key Product Decisions & Trade-Offs

- **Component Architecture**:
  - Create `src/components/PortalHomeWorkspace.tsx` and mount it in `src/App.tsx` when `activeModule === 'home'` (retaining `BlankWorkspace.tsx` as a fallback or upgrading it directly).
  - *Why*: Maintains clean separation of concerns and allows independent filtering, search, and detail modal states without bloating `App.tsx`.
- **Domain Grounding**:
  - Populate with realistic KASE domain data representing ongoing initiatives: IndiaSkills Kerala competitions, Centre of Excellence infrastructure progress, PMKVY 4.0 batch approvals, and administrative holiday/guideline circulars.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        KASE ERP NavHeader                              │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           │                                                   │
┌──────────▼──────────┐                     ┌──────────────────▼──────────────────┐
│     NavSidebar      │                     │        PortalHomeWorkspace          │
│ (Functional Modules)│                     │       (Home Right Workspace)        │
└─────────────────────┘                     └──────────────────┬──────────────────┘
                                                               │
                           ┌───────────────────────────────────┴───────────────────────────────────┐
                           │                                                                       │
             ┌─────────────▼───────────────┐                                         ┌─────────────▼───────────────┐
             │       Block 1 (Left)        │                                         │       Block 2 (Right)       │
             │     Internal Circulars      │                                         │   External News & Projects  │
             │   & Organizational Events   │                                         │    & Batch Launch Milestones│
             ├─────────────────────────────┤                                         ├─────────────────────────────┤
             │ - Search & Category Filter  │                                         │ - Search & Stream Filter    │
             │ - Official Circular Cards   │                                         │ - Milestone & News Cards    │
             │ - Event Timeline Items      │                                         │ - Sector Progress Indicators│
             └─────────────┬───────────────┘                                         └─────────────┬───────────────┘
                           │                                                                       │
                           └───────────────────────────────┬───────────────────────────────────────┘
                                                           │ (Click card)
                                             ┌─────────────▼───────────────┐
                                             │     Notice / News Detail    │
                                             │       Preview Modal         │
                                             └─────────────────────────────┘
```

- **State Model**:
  - `internalNews`: Array of circulars and event objects (ID, refNo, title, category, date, division, synopsis, fullBody, priority).
  - `externalNews`: Array of project milestone and sector news objects (ID, title, stream, partner, date, summary, fullBody, keyMetrics).
  - `activePreview`: Selected item opened in the detail modal.
  - `internalFilter` / `externalFilter`: Category filter selection.
  - `searchQuery`: Live text filter across both feeds.
