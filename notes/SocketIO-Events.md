# Socket.IO Events

## What did I learn today?

Today I learned how data is exchanged between the frontend and backend using Socket.IO events.

A successful connection alone isn't enough. Both sides need a way to send and receive information. Socket.IO does this using events.

---

## Two important methods

### socket.emit()

Used to send data.

Think of it as speaking.

Example:

socket.emit("hello-server", "Hello from React!")

This sends an event named "hello-server" along with some data.

---

### socket.on()

Used to listen for data.

Think of it as listening.

Example:

socket.on("hello-client", (message) => {

})

Whenever the event "hello-client" arrives, this function runs.

---

## Communication Flow

React

↓

socket.emit()

↓

Server receives event using socket.on()

↓

Server processes the data

↓

Server sends a response using socket.emit()

↓

React receives it using socket.on()

---

## Key Learning

- Socket.IO communication is event-based.
- emit() sends events.
- on() listens for events.
- Event names must match exactly on both sides.
- Data can be sent together with the event.
- Communication happens in both directions.

---

## Real-life Analogy

Imagine a walkie-talkie.

When I press the talk button, I am using emit().

When I wait for the other person to reply, I am using on().

Both people can send and receive messages without reconnecting every time.

---

## Common Mistakes

- Mismatched event names.
- Forgetting to add a listener using socket.on().
- Using emit() when the intention is to listen.

---

## Interview Question

Q: What is the difference between socket.emit() and socket.on()?

Answer:

socket.emit() is used to send an event and optional data. socket.on() is used to listen for an event and execute code when that event is received. Together they provide real-time, bidirectional communication between the client and the server.