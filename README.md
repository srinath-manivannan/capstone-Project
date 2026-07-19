# EMC — MERN + TypeScript Starter

A clean, reusable **MERN** base setup you can drop any project into. It already
includes: JWT authentication (register / login / logout), a themeable MUI layout
(AppBar + collapsible Sidebar, light/dark), protected routes, and **one complete
example CRUD resource ("Items")** you copy to build your own features.

> 📘 **Learning the backend?** Start with **[BACKEND-GUIDE.md](BACKEND-GUIDE.md)** —
> HTTP verbs, the full request flowchart, SRP/DRY/KISS, security, recipe cards
> and an interview Q&A bank.
> 📗 **Learning the frontend?** Start with **[FRONTEND-GUIDE.md](FRONTEND-GUIDE.md)** —
> the Redux data-flow (UI ➜ thunk ➜ API ➜ slice ➜ selector), the golden rules,
> SCSS conventions, performance playbook and recipes.
> 🧰 **Starting a new project?** Pick a starter from
> **[frontend-templates/](frontend-templates/)** — `react-ts` (no Redux),
> `react-redux-ts`, or `nextjs-ts` — all runnable instantly; this repo's
> `frontend/` is the full-scale Redux app (auth + MUI + guards).
> 🚀 **Shipping it?** Read **[DEVOPS-GUIDE.md](DEVOPS-GUIDE.md)** — quality
> gates, branching & PR flow, the CI pipeline in `.github/workflows/ci.yml`,
> deployments, Cloudflare/AWS architectures, DNS and cost optimization.
> Every source file carries the same WHAT/WHY/FLOW header.

---

## Tech stack

| Layer     | Tech |
|-----------|------|
| Frontend  | React + TypeScript, Vite, Redux Toolkit, MUI, SCSS, React Router, Formik + Yup, Axios |
| Backend   | Node + Express (TypeScript), Mongoose (MongoDB), JWT, bcrypt, Yup |
| Database  | MongoDB (Atlas or local) |

---

## Project structure

```
backend/
├── .env.example           # template of required secrets (copy to .env)
├── tsconfig.json          # TypeScript compiler rules (annotated)
└── src/
    ├── server.ts          # entry: connect DB, then start listening
    ├── app.ts             # express app: middleware + mounts every /api route
    ├── config/
    │   ├── db.ts          # MongoDB connection
    │   └── env.ts         # loads + validates .env
    ├── models/            # Mongoose schemas (User, Item)
    ├── types/             # TypeScript interfaces (+ express.d.ts augmentation)
    ├── validations/       # Yup schemas that guard each route
    ├── middleware/
    │   ├── auth.ts        # `protect` — verifies the JWT on protected routes
    │   ├── validateRequest.ts # runs a Yup schema before the controller
    │   └── errorHandler.ts    # turns thrown errors into clean JSON
    ├── controllers/       # thin: read request -> call service -> send response
    ├── services/          # the real work: DB queries + business rules
    ├── routes/            # maps URLs -> controllers
    └── utils/             # AppError, asyncHandler, generateToken

frontend/src/
├── main.tsx              # entry: Redux <Provider> + ColorModeProvider + App
├── App.tsx               # Router
├── config/env.ts         # reads VITE_* env vars (API base URL)
├── api/                  # endpoints.ts (all paths) + client.ts (one axios instance)
├── app/                  # store.ts + typed hooks (useAppDispatch/useAppSelector)
├── features/             # ⭐ Redux: one folder per feature (types/thunks/slice/selectors)
│   ├── auth/
│   └── items/
├── routes/AppRoutes.tsx  # navigation only: lazy pages + RequireAuth guard
├── theme/                # MUI theme + light/dark color-mode context
├── layouts/MainLayout/   # AppBar + Sidebar + content area (navItems.ts = menu)
├── components/           # shared UI (PageHeader)
├── styles/               # _variables.scss + main.scss (global styles only)
└── pages/                # one folder per screen; each component + its own .scss
    ├── Auth/             # login / register / forgot-password
    └── Items/            # ⭐ the example CRUD page (copy this)
```

---

## Getting started

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env        # then fill in the values below
npm run dev                 # http://localhost:5000
```

`.env` needs:

```
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/emc?retryWrites=true&w=majority
JWT_SECRET=any-long-random-string
```

- Get `MONGO_URI` from **Atlas → Connect → Drivers**. URL-encode special
  characters in the password (`@` → `%40`, `#` → `%23`).
- In Atlas, **Network Access → Add IP** (use `0.0.0.0/0` for local dev) or the
  connection will hang.
- Generate a secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env        # VITE_API_URL=http://localhost:5000/api
npm run dev                 # http://localhost:5173
```

Open http://localhost:5173 → you'll land on **/login**. Register an account, and
you're in.

---

## How authentication works

1. Register/login hits the backend, which returns a **JWT token**.
2. The `authSlice` stores it in Redux (mirrored to `localStorage` for refresh).
3. `api/client.ts` auto-attaches it as `Authorization: Bearer <token>` on every request.
4. `RequireAuth` (in `AppRoutes.tsx`) keeps you on `/login` until a token exists.
5. On the backend, `protect` verifies the token and sets `req.userId` so a user
   only ever sees their own data. If the token is bad, the API returns 401 and
   the frontend auto-logs-out (response interceptor in `api/client.ts`).

## How a request flows (backend)

```
HTTP request
  → route            (routes/*.ts)        which URL + method
  → validateRequest  (Yup schema)         reject bad input early
  → asyncHandler     (utils)              catch errors so the app never crashes
  → controller       (thin)               read req, call service, send res
  → service          (logic)              talk to the model / DB
  → model            (Mongoose)           MongoDB
```

Every response has the same shape: `{ success: true, data: ... }`.

---

## ⭐ How to add a new resource (e.g. "Product")

The **Items** feature is the template. To add `Product`, copy the item files and
rename. That's it — same 6 backend files + 1 frontend service + 1 page.

**Backend** (copy `item.*` → `product.*`):
1. `types/product.types.ts` — the interface + input types.
2. `models/Product.model.ts` — the Mongoose schema.
3. `validations/product.validation.ts` — create/update Yup schemas.
4. `services/product.service.ts` — getAll / getById / create / update / remove.
5. `controllers/product.controller.ts` — thin wrappers.
6. `routes/product.routes.ts` — the 5 CRUD routes.
7. In `app.ts`, add one line: `app.use('/api/products', productRoutes);`

**Frontend** (full steps in [FRONTEND-GUIDE.md](FRONTEND-GUIDE.md)):
1. Add the paths in `api/endpoints.ts`.
2. `features/products/` — copy the `features/items/` folder (types/thunks/slice/selectors), rename.
3. Register the reducer in `app/store.ts` (1 line).
4. `pages/Products/…` — copy the `Items` page/components (+ their `.scss` files).
5. Add a `<Route>` in `routes/AppRoutes.tsx` and an entry in
   `layouts/MainLayout/navItems.ts`.

### The Items API (reference)

All require a valid token (`Authorization: Bearer <token>`).

| Method | Endpoint          | Purpose                     |
|--------|-------------------|-----------------------------|
| GET    | `/api/items`      | list your items             |
| GET    | `/api/items/:id`  | read one item               |
| POST   | `/api/items`      | create an item              |
| PUT    | `/api/items/:id`  | update an item (full)       |
| PATCH  | `/api/items/:id`  | update an item (partial)    |
| DELETE | `/api/items/:id`  | delete an item              |

---

## Scripts

**backend:** `npm run dev` (watch) · `npm run build` · `npm start` · `npm run typecheck`
**frontend:** `npm run dev` · `npm run build` · `npm run lint`
