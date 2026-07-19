# 🧰 Frontend Templates — pick one, build anything

Three **standalone reference templates**, each a complete runnable project.
They all implement the SAME tiny app (a Todos CRUD) with the SAME methodology —
only the architecture changes. Learn one, and the other two feel familiar.

| Template | State/API layer | Choose it when… |
|---|---|---|
| [`react-ts/`](react-ts/) | React Context + `useReducer` + a service layer | small/medium apps, minimal dependencies, you want to understand React itself first |
| [`react-redux-ts/`](react-redux-ts/) | Redux Toolkit (thunks → slice → selectors) | shared state across many screens, teams, DevTools debugging |
| [`nextjs-ts/`](nextjs-ts/) | Server Components + client components + service layer | you need SEO/SSR, file-based routing, or a full-stack React framework |

## The shared methodology (identical in all three)

Every API call travels the same pipeline — only the "state layer" box differs:

```
.env  ➜  config/env  ➜  api/endpoints  ➜  api/client  ➜  STATE LAYER  ➜  UI
                                                          │
        react-ts:        Context + useReducer ────────────┤
        react-redux-ts:  thunks → slice → selectors ──────┤
        nextjs-ts:       server fetch + client state ─────┘
```

Shared standards (see each template's README for details):

- Every file opens with the same header: `📄 WHAT / 🎯 WHY / 🔁 FLOW`
- **No API calls inside UI components** — components ask the state layer
- **Endpoints in ONE file**, base URL from env config — never hardcoded
- One component = one stylesheet next to it (SCSS / CSS Module)
- Routes/pages are navigation only; TypeScript everywhere; Prettier formatting
- Local state only for pure-UI state; server data lives in the state layer

## Quick start (any template)

```bash
cd frontend-templates/<template>
npm install
npm run dev
```

Each template ships pointed at the free JSONPlaceholder fake API, so it works
with ZERO backend setup. To use a real backend (like this repo's `backend/`),
change one line in `.env` — the template READMEs show exactly how.

## How these relate to the main app

- [`../frontend/`](../frontend/) = the **full-scale** version of
  `react-redux-ts`: same Redux pattern plus MUI, theming, auth and guards.
  Graduate to it after the template makes sense — its full write-up is
  [FRONTEND-GUIDE.md](../FRONTEND-GUIDE.md).
- `backend/` = the API twin; its guide is [BACKEND-GUIDE.md](../BACKEND-GUIDE.md).
