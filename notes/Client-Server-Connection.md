# Client ↔ Server Connection using Socket.IO

## What did I learn today?

Today I connected my React frontend with my Express backend using Socket.IO.

Until now, my frontend and backend were two separate applications. They were running independently, but they couldn't communicate.

After using Socket.IO, both applications established a real-time connection.

This is the base of our meeting application. Every future feature like chat, audio calling, video calling, screen sharing and room management will use this connection.

---

## Frontend

Runs on:

http://localhost:5173

This is created automatically by Vite when I run:

npm run dev

The frontend is responsible for showing the user interface.

Examples:

- Buttons
- Video screen
- Chat window
- Join Room page

The frontend itself cannot manage communication between multiple users.

---

## Backend

Runs on:

http://localhost:5000

This is my Express + Socket.IO server.

The backend listens for new users, messages and events.

Think of it like the meeting organizer.

Whenever someone joins, leaves or sends a message, the backend manages everything.

---

## What is localhost?

localhost simply means "this computer".

So,

http://localhost:5173

means

"My React application running on my own computer."

Similarly,

http://localhost:5000

means

"My backend server running on my own computer."

---

## What is a Port?

A computer can run many applications at the same time.

Each application gets its own port number.

Example:

5173 → React

5000 → Express

3306 → MySQL

27017 → MongoDB

Port numbers help the computer know which application should receive the request.

---

## Why do React and Express use different ports?

Because they are different applications.

React shows the user interface.

Express handles backend logic.

They run independently but communicate using Socket.IO.

---

## What is CORS?

Browsers don't allow one website to access another website automatically.

Even though both are running on my computer,

localhost:5173

and

localhost:5000

are treated as different origins.

CORS tells the backend,

"It's okay to accept requests from my React application."

Without CORS, the browser blocks the connection.

---

## Socket.IO Client

Inside React:

const socket = io("http://localhost:5000");

This line creates a connection with the backend.

As soon as the page opens, React tries to connect with the server.

---

## Socket.IO Server

Inside Express:

io.on("connection", (socket) => {

});

Whenever a new user connects, this event runs.

Socket.IO automatically creates a unique socket ID for every connected user.

Every browser tab gets its own socket ID.

---

## Flow of Connection

User opens React

↓

React creates Socket.IO client

↓

Socket.IO client contacts backend

↓

Backend accepts connection

↓

Socket.IO generates unique Socket ID

↓

Connection established

---

## Important Things I Learned

• React is only responsible for the user interface.

• Express is responsible for backend logic.

• Socket.IO creates a real-time communication channel.

• Every connected user gets a unique Socket ID.

• CORS allows the frontend to communicate with the backend.

• localhost means my own computer.

• Different applications use different ports.

---

## Small Analogy

Think of it like this.

React = Receptionist

Express = Office

Socket.IO = Telephone line

Users = Visitors

The receptionist talks to the office using the telephone line.

Without the telephone line, they cannot communicate instantly.

---

## Interview Question

Q. Why do we need Socket.IO?

Answer:

Socket.IO provides real-time communication between the frontend and backend.

Instead of repeatedly sending HTTP requests, both remain connected continuously, allowing instant communication required for chat applications, online games, collaborative editors and video meeting applications.
## Things I discovered today

Today I made a common React mistake by defining `sendMessage` inside `useEffect()`. Because of that, the function was only available inside the `useEffect` block, and the button outside couldn't access it.

The browser console showed:

`sendMessage is not defined`

Reading the error carefully helped me identify the problem instead of guessing.

**Lesson learned:**
- Functions used by JSX (like button `onClick`) should usually be defined inside the component but **outside** `useEffect()`, unless they are only meant to be used inside that effect.