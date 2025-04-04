import { io } from "socket.io-client"

const socket = io("ws://localhost:3000", {
  reconnectionDelayMax: 10000,
});

socket.connect()

socket.on("message", (event) => {
    console.log(event)
})

export default socket