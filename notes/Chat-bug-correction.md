## Why did I use a named event handler?

Instead of passing an anonymous function directly to `socket.on()`, I created a separate function called `handleReceiveMessage`.

This makes cleanup more reliable because I can remove the exact same listener using:

```javascript
socket.off("receive-message", handleReceiveMessage);
```

Using named functions for event listeners is a common practice in React because it makes the code easier to read, debug, and maintain.