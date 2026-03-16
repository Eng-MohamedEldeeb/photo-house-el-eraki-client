# Photo House El Eraki — Frontend

React + TypeScript frontend for **Photo House El Eraki**, a photography e-commerce and inventory management system. No payment integration — purchases are handled offline.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (native Vite plugin) |
| Routing | React Router v6 — `createBrowserRouter` array config |
| Data Fetching | TanStack React Query v5 |
| Global State | Redux Toolkit + redux-persist |
| HTTP | Axios |
| Forms | Formik + Yup |

---

## Project Structure

```
src/
├── api/
│   ├── axios.ts                  # Axios instance + JWT interceptor
│   ├── products.api.ts           # Products endpoints
│   ├── categories.api.ts         # Categories endpoints
│   ├── auth.api.ts               # Login endpoint
│   └── importExport.api.ts       # Excel import / export
│
├── store/
│   ├── index.ts                  # Redux store + persistor
│   └── slices/
│       └── authSlice.ts          # Auth state (token + admin)
│
├── hooks/
│   ├── useProducts.ts            # useProducts, useProduct, useAdminProducts,
│   │                             #   useCreateProduct, useUpdateProduct,
│   │                             #   useDeleteProduct, useStockSummary
│   ├── useCategories.ts          # useCategories, useCreateCategory,
│   │                             #   useUpdateCategory, useDeleteCategory
│   ├── useAppDispatch.ts
│   ├── useAppSelector.ts
│   └── useToast.ts
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx             # in_stock / low_stock / out_of_stock
│   │   ├── Spinner.tsx
│   │   ├── ConfirmModal.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ToastContainer.tsx
│   │   └── TableRowSkeleton.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminLayout.tsx       # sidebar + Outlet wrapper
│   │   └── ProtectedRoute.tsx    # redirects to /admin/login if no token
│   └── product/
│       ├── ProductCard.tsx
│       └── ProductCardSkeleton.tsx
│
├── pages/
│   ├── Landing/                  # Hero, Ticker, CategoriesSection
│   ├── Store/                    # FilterBar, Pagination, product grid
│   ├── ProductDetail/
│   └── Admin/
│       ├── Login/
│       ├── Dashboard/            # KPI cards, stock summary
│       ├── Products/             # list + form (add/edit) + import/export
│       └── Categories/           # inline edit table + import/export
│
├── types/
│   ├── product.types.ts
│   ├── category.types.ts
│   └── api.types.ts              # PaginatedResponse, StockSummary,
│                                 #   ImportResultDto, LoginResponse
│
├── router.tsx                    # createBrowserRouter array config
├── App.tsx                       # <RouterProvider router={router} />
├── main.tsx                      # Redux Provider + QueryClientProvider
└── index.css                     # Tailwind v4 @import + @theme tokens
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- The [backend API](../photo-house-backend) running on `http://localhost:3000`

### Installation

```bash
git clone https://github.com/your-username/photo-house-frontend.git
cd photo-house-frontend
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000/api
```

For production, point this to your deployed backend URL.

### Running the App

```bash
# Development
npm run dev

# Production build
npm run build
npm run preview
```

The app runs at `http://localhost:5173`.

---

## Routes

| Route | Page | Auth |
|-------|------|------|
| `/` | Landing page | Public |
| `/store` | Product listing + filters | Public |
| `/products/:id` | Product detail | Public |
| `/admin/login` | Admin login | Public |
| `/admin` | Dashboard (KPIs) | **Protected** |
| `/admin/products` | Products list | **Protected** |
| `/admin/products/new` | Add product form | **Protected** |
| `/admin/products/:id/edit` | Edit product form | **Protected** |
| `/admin/categories` | Categories management | **Protected** |

Protected routes redirect to `/admin/login` if no valid JWT is found in the persisted Redux store.

---

## Router Architecture

Uses the modern `createBrowserRouter` array config — no `<BrowserRouter>`, `<Routes>`, or `<Route>` JSX components.

```
router.tsx
  ├── PublicLayout (Navbar + Footer)
  │     ├── /
  │     ├── /store
  │     └── /products/:id
  ├── /admin/login
  └── ProtectedRoute
        └── AdminLayout (sidebar)
              ├── /admin
              ├── /admin/products
              ├── /admin/products/new
              ├── /admin/products/:id/edit
              └── /admin/categories
```

`App.tsx` is just:
```tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export default function App() {
  return <RouterProvider router={router} />;
}
```

---

## State Management

**Redux Toolkit** handles auth state only — the JWT token and admin info.

```typescript
// Auth slice shape
{
  auth: {
    token: string | null;
    admin: { id: number; username: string } | null;
    isAuthenticated: boolean;
  }
}
```

The token is persisted to `localStorage` via `redux-persist`, so the admin stays logged in across page refreshes.

**React Query** handles all server data — products, categories, stock summary. The Axios instance automatically attaches the JWT from the Redux store to every request via an interceptor.

---

## Design System

Tailwind CSS v4 with custom tokens defined in `index.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `bg-black` | `#0A0A0A` | App background |
| `bg-dark` | `#111111` | Page sections |
| `bg-dark2` | `#1A1A1A` | Cards, panels |
| `bg-dark3` | `#222222` | Table headers, borders |
| `text-gold` | `#C9A84C` | Primary accent |
| `text-ivory` | `#F2EDE0` | Headings |
| `text-text2` | `#B5AD98` | Body text |
| `text-text3` | `#6A6255` | Muted / labels |
| `text-green` | `#7AB87A` | In stock |
| `text-amber` | `#D4A847` | Low stock |
| `text-red` | `#E07272` | Out of stock / danger |
| `font-display` | Playfair Display | Headings |
| `font-ui` | Montserrat | UI / body |

---

## Admin Features

### Products

- Paginated table with image thumbnails
- Inline **Active** and **Featured** toggles (PATCH without opening the form)
- Add / Edit form with image upload preview (Cloudinary via backend)
- Delete with confirmation modal + toast feedback
- **Export** — downloads current DB as `.xlsx`
- **Import** — upload `.xlsx` to bulk upsert (shows inserted / updated / skipped result modal)

### Categories

- Inline edit rows — click Edit to turn a row into an input form
- Delete with confirmation (products are unlinked, not deleted)
- **Export** — downloads categories as `.xlsx`
- **Import** — upload `.xlsx` to bulk upsert

---

## API Layer

All API calls go through `src/api/axios.ts` which:
1. Sets `baseURL` from `VITE_API_URL`
2. Attaches `Authorization: Bearer <token>` from Redux store on every request
3. On `401` response — dispatches logout and redirects to `/admin/login`

```typescript
// src/api/importExport.api.ts
exportProducts()     → GET /admin/export/products  → triggers .xlsx download
exportCategories()   → GET /admin/export/categories → triggers .xlsx download
importProducts(file) → POST /admin/import/products  → returns ImportResultDto
importCategories(file)→ POST /admin/import/categories→ returns ImportResultDto
```

---

## Scripts

```bash
npm run dev       # Vite dev server with HMR
npm run build     # TypeScript check + Vite production build
npm run preview   # Preview production build locally
```

---

## Deployment (Vercel)

1. Push to GitHub.
2. Import the repo in [vercel.com](https://vercel.com).
3. Set `VITE_API_URL` to your backend URL in Vercel environment variables.
4. Deploy — Vercel auto-detects Vite.

Add a `vercel.json` at the project root to handle client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## Notes

- No payment integration — all purchases are completed offline / in-person.
- `useUpdateProduct()` takes `{ id, data }` in the mutation payload (not the hook) so a single instance handles both the form save and the inline toggles.
- Tailwind v4 does not use `tailwind.config.ts` — all tokens live in `index.css` under `@theme {}`.
