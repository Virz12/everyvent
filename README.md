# 🎉 Everyvent — Modern Event Management & Registration Platform

![Everyvent Banner](https://everyvent.vercel.app/og-image.png)

**Everyvent** is a modern platform designed to help you discover, manage, and register for events with ease. Whether you're an organizer or attendee, Everyvent provides the tools to streamline your event experience.

🔗 **Live Preview:** [https://everyvent.vercel.app](https://everyvent.vercel.app)

---

## 🚀 Features

- 🔍 Fast & responsive **event search**
- 📅 Easy-to-use **event management dashboard**
- ✅ **Google & Manual Authentication** (NextAuth v5)
- 📝 Real-time **registration & attendance**
- 📊 Insightful **event analytics dashboard**
- 📱 Fully **responsive UI** built with Tailwind CSS

---

## 🛠️ Tech Stack

| Frontend                | Backend        | Others                            |
| ----------------------- | -------------- | --------------------------------- |
| Next.js 15 (App Router) | Prisma ORM     | Tailwind CSS                      |
| React                   | PostgreSQL     | NextAuth v5 (OAuth + Credentials) |
| TypeScript              | Server Actions | Vercel Hosting                    |

---

## 📦 Local Setup

1. **Clone the repository**

```bash
git clone https://github.com/virz12/everyvent.git
cd everyvent
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup Environment Variables**

Create a `.env` file and add the following:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
AUTH_SECRET=your-secret-key

AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

4. **Generate Prisma Client & Migrate DB**

```bash
npx prisma generate
npx prisma migrate dev
```

5. **Run the development server**

```bash
npm run dev
```

---

## 🧠 Folder Structure

```
app/
├─ (auth)/              # Auth pages: login, register
├─ (main)/              # Public pages: home, about, events
├─ api/                 # API routes & server actions
├─ dashboard/           # User dashboard
├─ ui/                  # Fonst & Global style
public/                 # Static assets & images
```

---

## 🛡️ Authentication

Using **NextAuth v5** with two strategies:

- 🔐 Google OAuth2
- 🔑 Credentials (email & password)

Authentication is session-based using `auth()` server actions.

---

## 👨‍💻 Developer

Made with ❤️ by [Virz](https://github.com/virz12)

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---
