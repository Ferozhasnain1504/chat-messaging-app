# 💬 Chat Messaging App

A full-stack, real-time one-on-one chat application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO**. It supports secure JWT-based authentication, live online/offline presence, image sharing via Cloudinary, transactional emails, and bot/rate-limit protection via Arcjet.

---

## ✨ Features

- 🔐 **Authentication & Authorization** — signup/login/logout with JWT stored in HTTP-only cookies
- ⚡ **Real-time messaging** — instant delivery powered by Socket.IO, with authenticated socket connections
- 🟢 **Online presence** — see which contacts are currently online, updated live for all connected clients
- 🖼️ **Image sharing** — upload and send images in chat, stored via Cloudinary
- 👤 **Profile management** — update profile picture and info after signup
- 📧 **Transactional emails** — welcome emails sent via Resend
- 🛡️ **Bot & rate-limit protection** — Arcjet middleware guards auth and message routes
- 🔊 **UI touches** — keyboard/notification sound effects, loading skeletons, animated containers
- 🎨 **Modern UI** — React 19 + Tailwind CSS + DaisyUI, built with Vite
- 📦 **Single-command production build** — root script builds both frontend and backend for deployment

---

## 🏗️ Tech Stack

### Backend (`/backend`)
| Tool | Purpose |
|---|---|
| Express | HTTP server & routing |
| MongoDB + Mongoose | Database & ODM |
| Socket.IO | Real-time bidirectional communication |
| JWT (`jsonwebtoken`) | Authentication |
| bcryptjs | Password hashing |
| Cloudinary | Image storage |
| Resend | Transactional email delivery |
| Arcjet | Rate limiting / bot protection |
| cookie-parser, cors, dotenv | Middleware & config |
| nodemon | Dev-time auto-reload |

### Frontend (`/frontend`)
| Tool | Purpose |
|---|---|
| React 19 | UI library |
| Vite | Build tool & dev server |
| Zustand | State management |
| React Router | Client-side routing |
| Tailwind CSS + DaisyUI | Styling & UI components |
| Axios | HTTP client |
| Socket.IO Client | Real-time updates |
| React Hot Toast | Notifications |
| Lucide React | Icons |

---

## 📁 Project Structure

```
chat-messaging-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js       # signup, login, logout, updateProfile
│   │   │   └── message.controller.js    # contacts, chats, get/send messages
│   │   ├── emails/
│   │   │   ├── emailHandlers.js         # Resend email sending logic
│   │   │   └── emailTemplates.js        # HTML email templates
│   │   ├── lib/
│   │   │   ├── arcjet.js                # Arcjet client setup
│   │   │   ├── cloudinary.js            # Cloudinary config
│   │   │   ├── db.js                    # MongoDB connection
│   │   │   ├── env.js                   # Centralized env variable access
│   │   │   ├── resend.js                # Resend client setup
│   │   │   ├── socket.js                # Socket.IO server + online-user tracking
│   │   │   └── utils.js                 # Helper functions (e.g. JWT signing)
│   │   ├── middleware/
│   │   │   ├── arcjet.middleware.js     # Rate limiting / bot protection
│   │   │   ├── auth.middleware.js       # Route protection (JWT verification)
│   │   │   └── socket.auth.middleware.js# Socket connection authentication
│   │   ├── models/
│   │   │   ├── message.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   └── server.js                    # App entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/                  # ChatContainer, ChatHeader, ContactList, etc.
│   │   ├── hooks/                       # useKeyboardSound
│   │   ├── lib/                         # axios instance
│   │   ├── pages/                       # ChatPage, LoginPage, SignUpPage
│   │   ├── store/                       # useAuthStore, useChatStore (Zustand)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/                          # images, sound effects
│   └── package.json
├── package.json                         # root-level build/start scripts
└── .gitignore
```

---

## 🔌 API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| POST | `/signup` | Register a new user | No |
| POST | `/login` | Log in | No |
| POST | `/logout` | Log out | No |
| PUT | `/update-profile` | Update profile info/avatar | Yes |
| GET | `/check` | Verify current session (used on page refresh) | Yes |

### Messages — `/api/messages`
| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| GET | `/contacts` | Get all available contacts | Yes |
| GET | `/chats` | Get list of users you've chatted with | Yes |
| GET | `/:id` | Get message history with a specific user | Yes |
| POST | `/send/:id` | Send a message (text and/or image) to a user | Yes |

> All message routes and the write-operations on auth routes run through Arcjet's rate-limiting/bot-protection middleware before hitting the controller.

### Real-time (Socket.IO)
- Socket connections are authenticated via `socket.auth.middleware.js` using the JWT cookie.
- `getOnlineUsers` is broadcast to all clients whenever a user connects or disconnects, so the UI can reflect live presence.

---

## ⚙️ Environment Variables

Create a `.env` file inside `backend/` with the following keys:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

CLIENT_URL=http://localhost:5173

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_sender_email
EMAIL_FROM_NAME=YourAppName

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

> `NODE_ENV=production` also switches the server to serve the built frontend (`frontend/dist`) as static files.

---

## 🚀 Getting Started

### Prerequisites
- Node.js **>= 20.0.0**
- A MongoDB database (local or Atlas)
- Accounts/API keys for **Cloudinary**, **Resend**, and **Arcjet**

### 1. Clone the repository
```bash
git clone https://github.com/Ferozhasnain1504/chat-messaging-app.git
cd chat-messaging-app
```

### 2. Install dependencies
Install root, backend, and frontend dependencies:
```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 3. Configure environment variables
Add the `.env` file described above inside `backend/`.

### 4. Run in development mode

**Backend** (with auto-reload):
```bash
cd backend
npm run dev
```

**Frontend** (Vite dev server):
```bash
cd frontend
npm run dev
```

The frontend will typically run on `http://localhost:5173` and the backend on the port set in `.env` (e.g. `5001`).

### 5. Build for production
From the project root:
```bash
npm run build
npm start
```
- `npm run build` installs backend & frontend dependencies and builds the frontend (`vite build`).
- `npm start` runs the backend, which — when `NODE_ENV=production` — also serves the built frontend.

---

## 🧩 Notable Implementation Details

- **JWT auth via cookies**: tokens are issued on signup/login and stored as HTTP-only cookies rather than local storage, reducing XSS risk.
- **Layered middleware**: both auth and message routes run Arcjet protection first, then (where required) JWT verification, before reaching the controller.
- **Socket authentication**: the Socket.IO server uses a dedicated middleware to authenticate each socket connection using the same JWT used for REST requests, and maintains an in-memory map of online users.
- **Email on signup**: a welcome email is dispatched through Resend using templates defined in `emailTemplates.js`.
- **Image uploads**: images are uploaded to Cloudinary from the backend and their URLs are stored with the message/user document.

---

## 📄 License

No license has been added yet. This project is currently unlicensed.  
A license will be specified here in the future. For now, please treat the code as "all rights reserved."

---

## 🙋 Author

**Feroz Hasnain** — [@Ferozhasnain1504](https://github.com/Ferozhasnain1504)
