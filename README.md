# capstone-Project

frontend :
src/
├── main.tsx                  # app entry, wraps everything in ThemeProvider
├── App.tsx                   # sets up router
├── theme/
│   └── theme.ts              # MUI theme: colors, fonts, breakpoints
├── layouts/
│   └── MainLayout/
│       ├── MainLayout.tsx    # combines AppBar + Sidebar + page content
│       ├── AppBar.tsx        # top bar
│       ├── Sidebar.tsx       # side navigation (MUI Drawer)
│       └── index.ts
├── pages/                    # one folder per screen/branch
│   ├── Dashboard/
│   │   └── Dashboard.tsx
│   └── Branches/
│       └── BranchList.tsx
├── routes/
│   └── AppRoutes.tsx         # all page routes, each wrapped in MainLayout
├── context/
│   └── SidebarContext.tsx    # remembers if sidebar is open/closed
├── services/
│   └── api.ts                # connects to your backend
├── types/
│   └── index.ts              # shared TypeScript types
└── hooks/
    └── useResponsive.ts      # helper to detect mobile vs desktop



    backend:
    backend/
├── src/
│   ├── server.ts                 # starts the app, connects to DB
│   ├── app.ts                    # express app config, mounts all routes
│   ├── config/
│   │   ├── db.ts                 # MongoDB connection logic
│   │   └── env.ts                # loads .env variables safely
│   ├── models/
│   │   └── Item.model.ts         # Mongoose schema
│   ├── routes/
│   │   └── item.routes.ts        # defines URL endpoints
│   ├── controllers/
│   │   └── item.controller.ts    # handles request/response
│   ├── services/
│   │   └── item.service.ts       # business logic, talks to the model
│   ├── middleware/
│   │   ├── errorHandler.ts       # catches errors, sends clean response
│   │   └── validateRequest.ts    # checks incoming data before it hits controller
│   ├── types/
│   │   └── item.types.ts         # shared TypeScript interfaces
│   └── utils/
│       ├── asyncHandler.ts       # wraps async functions so errors don't crash the app
│       └── logger.ts             # simple logging helper
├── .env
├── .gitignore
├── package.json
└── tsconfig.json