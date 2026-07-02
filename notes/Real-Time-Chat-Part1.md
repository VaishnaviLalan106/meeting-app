# Real-Time Chat - Part 1

## What did I build today?

Today I built the user interface for my chat application and sent my first real-time message from the React frontend to the Express backend using Socket.IO.

Although other users cannot see the message yet, I successfully established the flow from the browser to the server.

---

## New Concepts

### Why is `messages` an array?

A chat application contains multiple messages, not just one.

Example:

[
"Hello",
"Hi",
"How are you?"
]

React displays each message using `map()`.

---

### What is `message`?

The `message` state stores whatever the user is currently typing in the input box.

Once I press Send, it is transmitted to the backend and then cleared from the input field.

---

### What does `socket.emit()` do?

`socket.emit()` sends an event along with optional data to the server.

Example:

```javascript
socket.emit("send-message", message);
```

This sends:

Event Name → send-message

Data → The message typed by the user

---

### Communication Flow

User types

↓

Clicks Send

↓

React emits event

↓

Socket.IO

↓

Backend receives event

↓

Backend processes the data

---

## Important Points

- Chat messages should be stored in an array.
- `map()` is used to display every message.
- `socket.emit()` sends data instantly to the backend.
- Every button click creates one event.

---

## Real-Life Analogy

Imagine writing a letter.

The input box is where I write the letter.

Clicking the Send button hands the letter to the post office (server).

Right now, the post office receives the letter but hasn't delivered it to anyone yet.

---

## Common Mistakes

- Forgetting to clear the input after sending.
- Using a string instead of an array for chat history.
- Misspelling the event name.

---

## Interview Question

Q: Why do chat applications usually store messages inside an array?

Answer:

Because a conversation contains multiple messages. React can efficiently render the list using `map()`, and new messages can simply be appended to the array as they arrive.