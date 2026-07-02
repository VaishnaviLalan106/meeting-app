import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {

  const [socketId, setSocketId] = useState("");
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {

    socket.on("connect", () => {
      setSocketId(socket.id);
      setStatus("Connected");
    });

    socket.on("disconnect", () => {
      setStatus("Disconnected");
      setSocketId("");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };

  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Meeting App</h1>

      <h2>Status : {status}</h2>

      <h3>Socket ID</h3>

      <p>{socketId}</p>

    </div>
  );
}

export default App;