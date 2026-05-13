# Hand-off — ASO Studio mockup → new project (2026-05-13)

> **Mai mở session Claude mới, đọc file này + `~/.claude/projects/.../memory/MEMORY.md` để continue.**

## TL;DR

Mockup v2 (rebranded "ASO Studio") đã xong trên branch `v2-redesign`.
**Bước tiếp theo: tạo project mới hoàn toàn, không nhánh từ project này.**

## Cần làm khi bắt đầu session mới

### 1. Hỏi user 4 điểm trước khi làm gì

1. **Tên repo GitHub mới** — đề xuất `aso-studio`, private
2. **Tên Vercel project** — đề xuất `aso-studio` → `aso-studio.vercel.app`
3. **Quy trình**:
   - **Cách A (recommend)**: user tạo GitHub repo rỗng trước → gửi link → mình clone
   - **Cách B**: mình scaffold local trước → user tạo repo sau → add remote + push
4. **Confirm branding** vẫn là "ASO Studio" + icon A-with-bars (chưa đổi gì)

### 2. Sau khi confirm, scaffold project mới

```bash
cd ~/Projects
# Cách A: clone repo user vừa tạo
git clone https://github.com/<user>/aso-studio.git
cd aso-studio
npx create-next-app@latest . --typescript --tailwind --app --no-eslint --turbopack
# (chọn yes/no còn lại theo defaults Next 16)
```

### 3. Copy mockup từ project cũ

```bash
# Copy toàn bộ thư mục v2/ sang aso-studio, BỎ prefix /v2
cp -r ~/Projects/store-preview-tool/app/v2/* ~/Projects/aso-studio/app/

# File map ( ⤵ là sau khi copy):
#   app/v2/page.tsx              ⤵  app/page.tsx
#   app/v2/layout.tsx            ⤵  app/layout.tsx  (merge với root layout của Next)
#   app/v2/compare/page.tsx      ⤵  app/compare/page.tsx
#   app/v2/categories/page.tsx   ⤵  app/categories/page.tsx
#   app/v2/users/page.tsx        ⤵  app/users/page.tsx
#   app/v2/login/page.tsx        ⤵  app/login/page.tsx
#   app/v2/_components/*         ⤵  app/_components/*
```

Sau khi copy phải sửa các import path: bỏ `../v2/` đi.

### 4. Fix Turbopack workspace root (đã gặp lỗi này)

Thêm vào `aso-studio/next.config.ts`:

```ts
import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: { root: path.join(__dirname) },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "play-lh.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
```

Lý do: Next 16 auto-detect workspace root từ lockfile, có stray `~/package-lock.json` làm nó nhầm.

### 5. Pattern code cần nhớ

- Tất cả View component dùng `"use client"`
- **Helper components phải đặt TRÊN component chính** trong file (Turbopack RSC có bug với function hoisting trong client modules) — đã gặp lỗi `ReferenceError: ScoreRing is not defined` nhiều lần
- Logo riêng cho ASO Studio: `app/_components/Logo.tsx` (mới, không dùng chung với v1)

### 6. Initial commit + push

```bash
cd ~/Projects/aso-studio
git add .
git commit -m "Initial ASO Studio scaffold + mockup port from store-preview-tool@v2-redesign"
git push -u origin main
```

### 7. User connect Vercel
- Vercel dashboard → Add New → Project → Import từ GitHub `aso-studio`
- Deploy với defaults — preview URL: `aso-studio.vercel.app`

### 8. Vào Phase 1: Auth + Postgres

Sau khi preview deploy OK, user provision Vercel Postgres:
- Vercel dashboard → project `aso-studio` → Storage → Create → Postgres (Hobby)
- Copy `.env.local` block từ Vercel → paste vào file `.env.local` local

Schema cần migrate (em sẽ viết SQL):
```sql
CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, role TEXT NOT NULL CHECK (role IN ('admin','editor','viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE sessions (token TEXT PRIMARY KEY, user_id INT REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL);

CREATE TABLE categories (slug TEXT PRIMARY KEY, name TEXT NOT NULL,
  description TEXT, created_by INT REFERENCES users(id));

CREATE TABLE apero_apps (product_code TEXT PRIMARY KEY, name TEXT NOT NULL,
  package_id TEXT NOT NULL, store_link TEXT, category_slug TEXT REFERENCES categories(slug),
  note TEXT, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE competitor_apps (id SERIAL PRIMARY KEY, name TEXT NOT NULL, developer TEXT,
  store_link TEXT, category_slug TEXT REFERENCES categories(slug), note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE audit_cache (app_id TEXT, country TEXT, hl TEXT, version_hash TEXT,
  json JSONB NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ, PRIMARY KEY (app_id, country, hl));
```

Auth files cần build:
- `lib/db.ts` — Postgres pool (dùng `@vercel/postgres` hoặc `pg`)
- `lib/auth.ts` — `hashPassword(pw)`, `verifyPassword(pw, hash)` với bcrypt, session helpers
- `app/api/auth/login/route.ts` — POST email+password → set session cookie
- `app/api/auth/logout/route.ts` — DELETE session
- `app/api/auth/me/route.ts` — GET current user
- `middleware.ts` — bảo vệ tất cả routes trừ `/login` và `/api/auth/*`

Seed admin đầu:
```sql
-- bcrypt hash of password "changeme" (em sẽ generate hash thực khi làm)
INSERT INTO users (email, password_hash, role) VALUES
  ('long.phan@apero.vn', '$2b$10$...', 'admin');
```

---

## Memory files đã update (chứa context đầy đủ)

- `~/.claude/projects/-Users-thugiangpro-Projects-store-preview-tool/memory/conversation_log.md` — full session log 2026-05-13
- `~/.claude/projects/-Users-thugiangpro-Projects-store-preview-tool/memory/project_overview.md` — architecture v1 (legacy) + v2 (ASO Studio mockup) + roadmap

## Quick links

- GitHub repo cũ: `github.com/longphan28ai/store-preview-tool`
- Production v1: `store-preview-tool.vercel.app` (branch `dev`)
- Mockup branch: `v2-redesign` (12 commits, last: `6bc1f9c Rebrand tool to ASO Studio`)
- Memory dir: `~/.claude/projects/-Users-thugiangpro-Projects-store-preview-tool/memory/`
- Apero reference file: `~/Downloads/Mã CODE Ngôn ngữ & Quốc gia - [CODE] Ngôn ngữ & Quốc gia.pdf`

## User profile recap

- **Phan Long** @ Apero, Vietnamese, UA team
- Email: `long.phan@apero.vn` (seed admin)
- Style: thích visual-first UI, ít số liệu, dark emerald theme, multi-step toggle
- Workflow: mockup → user duyệt → mới làm backend. **KHÔNG nhảy backend khi UI chưa OK**
