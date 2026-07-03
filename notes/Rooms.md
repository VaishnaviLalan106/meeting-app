# Socket.IO Rooms - Part 1

## What did I build today?

Today I added the user interface for joining a meeting room.

The user can enter a Room ID and click "Join Room". The frontend sends a `join-room` event to the server.

At this stage, the server has not processed the room yet. I only built the client-side functionality.

---

## New States

### room

Stores the Room ID entered by the user.

Example:

AI101

MeetingRoom

Room123

---

### joined

Stores whether the user has successfully joined a room.

Initially:

false

After joining:

true

---

## New Event

socket.emit("join-room", room)

This sends the Room ID to the backend so that the server can place the user into the correct meeting room.

---

## Flow

User

↓

Types Room ID

↓

Clicks Join

↓

React sends "join-room" event

↓

Server (next step)

## What did I learn today?

Today I learned how Socket.IO creates meeting rooms.

The method:

```javascript
socket.join(room)
```

adds the current connected client to a specific room.

Socket.IO internally manages all room members, so I don't have to create my own arrays or data structures.

---

## Communication Flow

User

↓

Types Room ID

↓

Clicks Join

↓

Frontend sends:

join-room

↓

Server receives event

↓

socket.join(room)

↓

Socket.IO stores the user inside that room

---

## Why are rooms important?

Without rooms, every connected user would receive every message.

Rooms isolate communication.

This is the same concept used by:

- Google Meet
- Zoom
- Discord Voice Channels
- Microsoft Teams

Each meeting is simply a different room.

---

## Real-life Analogy

Imagine a college.

There are many classrooms.

Students inside Classroom A cannot hear the lecture happening in Classroom B.

Socket.IO rooms work exactly the same way.

The server is the college.

Each room is a classroom.

Each connected socket is a student.

---

## Interview Question

Q: What does `socket.join(room)` do?

Answer:

It adds the connected socket to a named Socket.IO room. Once inside that room, the server can send events specifically to members of that room without affecting users in other rooms.