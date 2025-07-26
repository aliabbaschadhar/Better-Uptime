# Prisma Schema for Blogging Platform

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
  role      Role       @default(Guest)
  updatedAt DateTime   @default(now())
  deletedAt DateTime   @default(now())
}

model Post {
  id        String     @id @default(uuid())
  title     String
  blog      String
  user      User?      @relation(fields: [userId], references: [id])
  userId    String?
  comments  Comment[]
  tags      Tag[]
  PostTags  PostTags[]
  postTagId String
  Like      Like[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @default(now())
  deletedAt DateTime   @default(now())
}

model Comment {
  id        String   @id @default(uuid())
  text      String
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  post      Post     @relation(fields: [postId], references: [id])
  postId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
  deletedAt DateTime @default(now())
}

model Tag {
  id        String     @id @default(uuid())
  tag       String     @unique
  posts     Post[]
  PostTags  PostTags[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @default(now())
  deletedAt DateTime   @default(now())
}

model PostTags {
  post   Post   @relation(fields: [postId], references: [id])
  postId String
  user   User   @relation(fields: [userId], references: [id])
  userId String

  assignedAt DateTime @default(now())
  Tag        Tag?     @relation(fields: [tagId], references: [id])
  tagId      String?

  @@id([postId, userId]) // Composite Primary key
}

model Like {
  post   Post   @relation(fields: [postId], references: [id])
  postId String
  userId String
  user   User   @relation(fields: [userId], references: [id])

  updatedAt DateTime @default(now())

  @@id([postId, userId])
}
```

### Reference : [ChatGPT Thread](https://chatgpt.com/c/6884d94b-cadc-8011-99b3-904b6909db2a)
