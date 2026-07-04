# WebRTC Basics

## What is WebRTC?

WebRTC (Web Real-Time Communication) is a technology that allows two browsers or devices to communicate directly for audio, video, and screen sharing.

Unlike chat messages, audio and video are usually not sent through the backend server. Instead, the server helps both devices discover each other and exchange connection information.

After that, the browsers establish a direct peer-to-peer connection.

---

## What is Signaling?

Signaling is the process of exchanging connection information between two devices before they establish a direct connection.

In this project, Socket.IO will be used as the signaling server.

---

## New Terms

### Peer

Another browser or device participating in the call.

### Peer-to-Peer (P2P)

A direct connection between two devices.

### Offer

A request to start a WebRTC connection.

### Answer

A response accepting that connection request.

---

## Important Learning

Socket.IO is not used to transmit audio or video.

It is used only for signaling.

Once the connection is established, audio and video travel directly between peers.

# WebRTC Signaling - Part 2

Today I prepared my backend to act as a signaling server.

I added three new Socket.IO events:

- offer
- answer
- ice-candidate

At this stage, these events do not create a video call.

Instead, they simply forward connection information between users inside the same room.

---

## socket.to(room).emit()

This sends an event to everyone in the room **except** the sender.

Example:

Vaishu sends an Offer.

The server forwards it only to the other participant.

Vaishu does not receive her own Offer.

---

## Difference

io.to(room).emit()

→ Sends to everyone inside the room.

socket.to(room).emit()

→ Sends to everyone except the sender.

This difference is very important when building WebRTC applications.
# Accessing Camera and Microphone

Today I learned about the browser API:

navigator.mediaDevices.getUserMedia()

This API requests permission to use the user's camera and microphone.

If permission is granted, it returns a MediaStream.

A MediaStream contains the live audio and video data from the user's device.

To display this stream on the page, I assigned it to:

videoElement.srcObject = stream

I also learned why the local preview is muted:

The browser would otherwise play my own microphone audio back through my speakers, creating an audio feedback loop.

## Milestone Achieved

Today I successfully accessed my webcam and microphone using:

navigator.mediaDevices.getUserMedia()

At this stage, each browser only displays its own local camera preview.

This does NOT mean a video call is working yet.

The camera stream has not been sent to another browser.

The next step is to create a WebRTC peer connection so that browsers can exchange their video and audio streams.

# WebRTC Basics

Socket.IO and WebRTC have different jobs.

Socket.IO is used only for signaling:
- Join room
- Send offer
- Send answer
- Exchange ICE candidates

WebRTC is responsible for:
- Video
- Audio
- Screen sharing

A WebRTC connection is represented by an RTCPeerConnection object.

The local camera and microphone stream must be added to the RTCPeerConnection using:

stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
});

Without adding tracks, the peer connection exists but no media can be sent.