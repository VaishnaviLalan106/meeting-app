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

## WebRTC Offer

The first browser creates an SDP Offer using:

const offer = await peerConnection.createOffer();

This offer contains information about the browser's media capabilities, supported codecs, encryption, and connection parameters.

After creating the offer, it must be saved as the browser's local description:

await peerConnection.setLocalDescription(offer);

The offer is then sent to the other participant using Socket.IO.

Important:
The offer should only be created after the user has joined a room. Even correct code can fail if it runs at the wrong time.

# Single Responsibility Principle

Instead of writing one large function that performs many tasks, divide the work into smaller functions.

Example:

startCamera()
→ Only requests camera and microphone access.

createPeerConnection()
→ Creates the RTCPeerConnection and attaches media tracks.

Keeping functions focused makes the code easier to read, debug, and extend.
## Refactoring

Refactoring means improving the internal structure of the code without changing what the user sees.

The application's behavior stays the same, but the code becomes cleaner, easier to read, and easier to maintain.
# WebRTC Signaling Structure

Instead of writing all WebRTC logic in one place, separate it into functions with clear responsibilities.

Example:

startCamera()
→ Requests camera and microphone.

createPeerConnection()
→ Creates the RTCPeerConnection and attaches local media.

createOffer()
→ Creates and sends an SDP Offer.

handleOffer()
→ Processes an Offer received from another user.

This structure keeps the code easier to understand and maintain.

# Creating vs Calling a Function

Creating a function only defines what it should do.

Example:

const createOffer = async () => {
    ...
}

Nothing happens until the function is called.

Example:

createOffer();

Only then does JavaScript execute the code inside the function.

This is an important concept because many helper functions exist in a project before they are actually used.
# React Component Architecture

Whenever creating a React component, I will follow this order:

1. Imports
2. Socket/API initialization
3. States (useState)
4. Refs (useRef)
5. Helper functions
6. Event/Button functions
7. useEffect()
8. return() (UI)

As the project grows, helper functions should be grouped into sections using comments.

Example sections:

- Camera Functions
- WebRTC Functions
- Room Functions
- Chat Functions
- Utility Functions

Keeping the same structure in every component makes the project easier to understand, debug, and maintain.