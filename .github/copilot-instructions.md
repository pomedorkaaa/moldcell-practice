# Copilot instructions

## Commands

This repository uses npm and the scripts in `package.json`.

### Application

- `npm install` — install dependencies and run Nuxt's `postinstall` preparation.
- `npm run dev` — start the Nuxt development server at `http://localhost:3000`.
- `npm run build` — create the production Nuxt/Nitro build.
- `npm run generate` — generate a static build.
- `npm run preview` — preview the production build locally.

### Database

The server uses PostgreSQL through Drizzle ORM. Set `DATABASE_URL` in a local
`.env` file before running database commands.

- `npm run db:generate` — generate SQL migrations from `server/db/schema.ts`.
- `npm run db:migrate` — apply migrations in `drizzle/`.
- `npm run db:seed` — seed catalog categories, brands, and products from
  `server/data/catalog.seed.json`.
- `npm run db:studio` — open Drizzle Studio.

Run migrations before seeding a new database. The seed script is idempotent for
the existing primary-key targets and resets PostgreSQL sequences afterward.

### Tests and validation

There is currently no test runner, test directory, lint script, or configured
single-test command in this repository. Do not invent a test command; validate
changes with the narrowest relevant check, usually `npm run build`. For a
type-only check, use the installed tool directly with `npx vue-tsc --noEmit`
after Nuxt has generated its `.nuxt` types.

## Architecture

- This is a Nuxt 4 application using the `app/` source directory. `app/app.vue`
  mounts the default layout and page, while `app/layouts/default.vue` provides
  the shared promo bar, header, breadcrumbs, container, and footer. Routes are
  file-based under `app/pages/`.
- UI code is split into page-level components and reusable components under
  `app/components/`. Catalog/product components consume the shared catalog
  types and call Pinia stores for cart and favorite actions.
- `app/stores/cart.ts` and `app/stores/favorites.ts` are the client-side
  state boundary. They load initial data from the server and send mutations
  through `$fetch`; the layout reloads or resets both stores when the
  `nuxt-auth-utils` session changes.
- Server endpoints under `server/api/` are Nuxt/Nitro handlers. GET catalog
  endpoints use `useFetch` from pages/components for SSR-friendly data loading;
  mutations use `$fetch` from stores or forms. Endpoint filenames determine
  HTTP methods and route parameters, such as `products/[slug].get.ts` and
  `cart/[productId].patch.ts`.
- `server/db/schema.ts` defines PostgreSQL tables for categories, brands,
  products, users, favorites, and cart rows. `server/db/client.ts` creates the
  Drizzle connection from `DATABASE_URL`. Keep generated migration files in
  `drizzle/` synchronized with schema changes.
- `server/utils/catalog-data.ts` is the catalog query layer. It joins products
  with brands and categories, applies validated filters/search/sorting, and
  converts database dates to the string shape exposed by the API. Keep
  database access out of Vue components.
- `server/utils/customer.ts` centralizes ownership resolution: authenticated
  users use the session user ID, while anonymous visitors receive an
  HTTP-only `flux_guest_id` cookie. Cart and favorite handlers must use this
  helper so guest and signed-in data remain consistent.
- `server/schemas/` contains Zod input validation. API handlers should validate
  bodies with `readValidatedBody` and query strings with
  `getValidatedQuery` before accessing the database.
- Shared API-facing types live in `shared/types/` and are imported with the
  `#shared` alias. Nuxt aliases such as `~`, `@`, and `~~` are also used for
  app, root, and server imports; follow the nearest existing import style.

## Conventions

- Use `<script setup lang="ts">` in Vue components. Import each component's
  SCSS module as `styles` and bind classes through `:class="styles.foo"` or
  `styles["kebab-case"]`; shared global styles and design tokens are in
  `app/assets/styles/main.scss` and `tokens.scss`.
- Keep route query state in the URL for catalog filters and sorting. Catalog
  controls emit patches, and `app/pages/catalog/index.vue` normalizes them
  through `navigateTo(..., { replace: true })`; preserve this behavior instead
  of keeping filter state only in component-local refs.
- Preserve the catalog response shape: a product includes nested `brand` and
  `category` objects and an ISO `createdAt` string. Update
  `shared/types/catalog.ts` whenever that public shape changes.
- Enforce stock limits in both client store actions and server handlers.
  Cart quantities are changed with POST/PATCH/PUT/DELETE endpoints, while
  favorites use POST/DELETE endpoints and support both guest and user owners.
- Authentication uses `nuxt-auth-utils` sessions. Login and registration
  handlers set the session; protected pages opt into
  `definePageMeta({ middleware: "auth" })`, with the middleware redirecting
  unauthenticated users to `/login`.
- Use the custom icon collection configured in `nuxt.config.ts` with names such
  as `my-icon:cart` and `my-icon:heart`; SVGs belong in
  `app/assets/icons/`.
- Database prices are integer values and product images are PostgreSQL text
  arrays. Schema edits require a migration workflow rather than changing only
  the seed JSON.
- `server/schemas/сartDelta.ts` currently has a Cyrillic `с` in its filename;
  preserve the exact filename when importing it, or rename the file and all
  references together.
