# Prisma Relationships Learning Guide - Progressive Database Design

This guide demonstrates the step-by-step process of learning Prisma relationships and database design concepts through a blogging platform example.

## 🎯 Learning Progression Overview

### Level 1: Basic One-to-Many Relationship

### Level 2: Multiple One-to-Many Relationships  

### Level 3: Many-to-Many Relationships (Implicit)

### Level 4: Many-to-Many Relationships (Explicit Join Tables)

### Level 5: Advanced Features (Enums, Timestamps, Soft Deletes)

---

## 📚 Level 1: Basic One-to-Many Relationship

**Concept Learned**: User can create multiple Posts

```prisma
model User {
  id    String @id @default(uuid())
  name  String
  email String @unique
  posts Post[] // One user → many posts
}

model Post {
  id     String  @id @default(uuid())
  title  String
  blog   String
  user   User?   @relation(fields: [userId], references: [id])
  userId String?
}
```

**Key Learnings:**

- Foreign key relationships with `@relation(fields: [...], references: [...])`
- Optional relationships with `?`
- One-to-many: User has many Posts, Post belongs to one User

---

## 📚 Level 2: Multiple One-to-Many Relationships

**Concept Learned**: Adding Comments (User → Comments, Post → Comments)

```prisma
model User {
  id       String    @id @default(uuid())
  name     String
  email    String    @unique
  posts    Post[]
  comments Comment[] // User can write many comments
}

model Post {
  id       String    @id @default(uuid())
  title    String
  blog     String
  user     User?     @relation(fields: [userId], references: [id])
  userId   String?
  comments Comment[] // Post can have many comments
}

model Comment {
  id     String @id @default(uuid())
  text   String
  user   User   @relation(fields: [userId], references: [id])
  userId String
  post   Post   @relation(fields: [postId], references: [id])
  postId String
}
```

**Key Learnings:**

- Multiple relationships from one model (User → Posts, User → Comments)
- Comment belongs to both User and Post
- Required vs optional relationships

---

## 📚 Level 3: Many-to-Many Relationships (Implicit)

**Concept Learned**: Posts can have multiple Tags, Tags can belong to multiple Posts

```prisma
model User {
  id       String    @id @default(uuid())
  name     String
  email    String    @unique
  posts    Post[]
  comments Comment[]
}

model Post {
  id       String    @id @default(uuid())
  title    String
  blog     String
  user     User?     @relation(fields: [userId], references: [id])
  userId   String?
  comments Comment[]
  tags     Tag[]     @relation("PostTags") // Many-to-many
}

model Comment {
  id     String @id @default(uuid())
  text   String
  user   User   @relation(fields: [userId], references: [id])
  userId String
  post   Post   @relation(fields: [postId], references: [id])
  postId String
}

model Tag {
  id    String @id @default(uuid())
  tag   String @unique
  posts Post[] @relation("PostTags") // Many-to-many
}
```

**Key Learnings:**

- Implicit many-to-many relationships with `@relation("Name")`
- Prisma automatically creates join table
- Symmetric relationship declarations

---

## 📚 Level 4: Many-to-Many with Explicit Join Tables

**Concept Learned**: When you need metadata on relationships (timestamps, who assigned tag)

```prisma
model User {
  id       String     @id @default(uuid())
  name     String
  email    String     @unique
  posts    Post[]
  comments Comment[]
  PostTags PostTags[] // User can assign tags to posts
}

model Post {
  id       String     @id @default(uuid())
  title    String
  blog     String
  user     User?      @relation(fields: [userId], references: [id])
  userId   String?
  comments Comment[]
  PostTags PostTags[] // Post has many tag assignments
}

model Comment {
  id     String @id @default(uuid())
  text   String
  user   User   @relation(fields: [userId], references: [id])
  userId String
  post   Post   @relation(fields: [postId], references: [id])
  postId String
}

model Tag {
  id       String     @id @default(uuid())
  tag      String     @unique
  PostTags PostTags[] // Tag can be assigned to many posts
}

model PostTags {
  post   Post   @relation(fields: [postId], references: [id])
  postId String
  user   User   @relation(fields: [userId], references: [id])
  userId String
  tag    Tag    @relation(fields: [tagId], references: [id])
  tagId  String

  assignedAt DateTime @default(now()) // Metadata on relationship

  @@id([postId, tagId]) // Composite Primary key
}
```

**Key Learnings:**

- Explicit join tables for storing relationship metadata
- Composite primary keys with `@@id([field1, field2])`
- Multiple foreign keys in join table

---

## 📚 Level 5: Advanced Features (Final Schema)

**Concepts Learned**: Enums, Timestamps, Soft Deletes, Like System

```prisma
enum Role {
  Admin
  Editor
  Guest
}

model User {
  id        String     @id @default(uuid())
  name      String
  email     String     @unique
  posts     Post[]
  comments  Comment[]
  PostTags  PostTags[]
  Like      Like[]
  role      Role       @default(Guest)        // Enum with default
  createdAt DateTime   @default(now())        // Timestamp
  updatedAt DateTime   @updatedAt             // Auto-update timestamp
  deletedAt DateTime?                         // Soft delete (optional)
}

model Post {
  id        String     @id @default(uuid())
  title     String
  blog      String
  user      User?      @relation(fields: [userId], references: [id])
  userId    String?
  comments  Comment[]
  PostTags  PostTags[]
  Like      Like[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  deletedAt DateTime?
}

model Comment {
  id        String   @id @default(uuid())
  text      String
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  post      Post     @relation(fields: [postId], references: [id])
  postId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?
}

model Tag {
  id        String     @id @default(uuid())
  tag       String     @unique
  PostTags  PostTags[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  deletedAt DateTime?
}

model PostTags {
  post   Post   @relation(fields: [postId], references: [id])
  postId String
  user   User   @relation(fields: [userId], references: [id])
  userId String
  tag    Tag    @relation(fields: [tagId], references: [id])
  tagId  String

  assignedAt DateTime @default(now())

  @@id([postId, tagId])
}

model Like {
  post   Post   @relation(fields: [postId], references: [id])
  postId String
  user   User   @relation(fields: [userId], references: [id])
  userId String

  likedAt DateTime @default(now())

  @@id([postId, userId]) // User can like a post only once
}
```

**Key Learnings:**

- **Enums**: Predefined value sets with `enum Role`
- **Timestamps**: `@default(now())` and `@updatedAt`
- **Soft Deletes**: Optional `deletedAt` field
- **Like System**: Another many-to-many with composite keys
- **Data Integrity**: Composite keys prevent duplicate likes

---

## 🎓 Summary of Relationship Types Learned

| Relationship Type | Example | Prisma Syntax |
|-------------------|---------|---------------|
| **One-to-Many** | User → Posts | `posts Post[]` and `user User @relation(...)` |
| **Many-to-Many (Implicit)** | Post ↔ Tag | `tags Tag[] @relation("Name")` both sides |
| **Many-to-Many (Explicit)** | Post ↔ Tag via PostTags | Separate join model with composite `@@id` |
| **Self-Referencing** | User → User (followers) | `followers User[] @relation("UserFollows")` |

## 🔗 Key Prisma Concepts Mastered

- ✅ Foreign keys with `@relation(fields: [...], references: [...])`
- ✅ Optional vs required relationships (`?`)
- ✅ Composite primary keys with `@@id([...])`
- ✅ Enums for constrained values
- ✅ Automatic timestamps with `@default(now())` and `@updatedAt`
- ✅ Unique constraints with `@unique`
- ✅ Join tables for metadata storage

### Reference: [ChatGPT Learning Thread](https://chatgpt.com/c/6884d94b-cadc-8011-99b3-904b6909db2a)

```dockerfile
FROM node:24-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY ./turbo.json ./turbo.json
COPY ./packages ./packages
COPY ./apps/http-backend/ ./apps/http-backend/

RUN pnpm install --frozen-lockfile

RUN pnpm db:generate
RUN pnpm build

FROM node:24-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY ./turbo.json ./turbo.json
COPY ./packages ./packages
COPY ./apps/http-backend/package.json ./apps/http-backend/package.json

RUN pnpm install --prod --frozen-lockfile

COPY --from=builder --chown=nodejs:nodejs /app/apps/http-backend/dist ./apps/http-backend/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/db ./packages/db
COPY --from=builder --chown=nodejs:nodejs /app/apps/http-backend/node_modules/@repo/db ./apps/http-backend/node_modules/@repo/db

RUN pnpm store prune

USER nodejs

EXPOSE 4000

ENV NODE_ENV=production

CMD ["pnpm", "start:backend"]
```
