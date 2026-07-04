import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {

  const [socketId, setSocketId] = useState("");
  const [status, setStatus] = useState("Connecting...");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const localVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);

  useEffect(() => {

  const handleReceiveMessage = (message) => {

    setMessages((previousMessages) => [
      ...previousMessages,
      message
    ]);

  };

  socket.on("connect", () => {
    setSocketId(socket.id);
    setStatus("Connected");
  });

  socket.on("disconnect", () => {
    setStatus("Disconnected");
  });

  socket.on("receive-message", handleReceiveMessage);

  const startCamera = async () => {

    try {

        const stream = await navigator.mediaDevices.getUserMedia({

            video: true,

            audio: true

        });
        localStream.current = stream;

        localVideoRef.current.srcObject = stream;
    } catch (error) {

        console.error(error);

    }

};
  startCamera();
  const createPeerConnection = () => {
    peerConnection.current = new RTCPeerConnection();

    localStream.current.getTracks().forEach((track) => {

    peerConnection.current.addTrack(

        track,

        localStream.current

    );

});

};
  socket.on("offer", handleOffer);
  const createOffer = async () => {

    const offer = await peerConnection.current.createOffer();

    await peerConnection.current.setLocalDescription(offer);

    socket.emit("offer", {

        room,
        offer

    });

};
  const handleOffer = async (data) => {

    console.log("Offer received");

};

  return () => {

    socket.off("connect");
    socket.off("disconnect");
    socket.off("receive-message", handleReceiveMessage);
    socket.on("offer", handleOffer);

  };

}, []);

  const joinRoom = () => {

    if (room.trim() === "") return;

    socket.emit("join-room", room);

    setJoined(true);

};
  const sendMessage = () => {

    if (message.trim() === "") return;

    socket.emit("send-message", {room, message});

    setMessage("");

};

  return (

    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "Arial",
        padding: "20px",
        border: "1px solid lightgray",
        borderRadius: "10px"
      }}
    >

      <h1>💬 Meeting Chat</h1>

      <p><b>Status:</b> {status}</p>

      <p><b>Socket ID:</b> {socketId}</p>

      <hr />
      <div style={{ marginBottom: "20px" }}>

  <input
    type="text"
    placeholder="Enter Room ID..."
    value={room}
    onChange={(e) => setRoom(e.target.value)}
    style={{
      width: "60%",
      padding: "10px"
    }}
  />

  <button
    onClick={joinRoom}
    style={{
      padding: "10px 20px",
      marginLeft: "10px"
    }}
  >
    Join Room
  </button>
  <video
    ref={localVideoRef}
    autoPlay
    playsInline
    muted
    style={{
        width: "300px",
        borderRadius: "10px",
        border: "2px solid gray",
        marginBottom: "20px"
    }}
/>
</div>

      <div
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid gray",
          padding: "10px",
          marginBottom: "15px"
        }}
      >

        {
          messages.map((msg, index) => (

            <p key={index}>
              {msg}
            </p>

          ))
        }

      </div>

      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "75%",
          padding: "10px"
        }}
      />

      <button
    onClick={sendMessage}
    style={{
        padding: "10px 20px",
        marginLeft: "10px"
    }}
    >
    Send
</button>

    </div>

  );

}

export default App;