import { cart } from "./cartStore.svelte";

let ws = new WebSocket('wss://sos-server-bad6016839b8.herokuapp.com:443');

ws.addEventListener('open', (event) => {
    console.log('websocket opened')
});

// debug ping
ws.addEventListener('message', (message) => {
    if (message.data === 'ping') {
        ws.send('pong');
        return;
    }
});

ws.addEventListener("close", () => {
    cart.status = 'Disconnected - trying to reconnect...';
    console.log('Disconnected from server');

    setTimeout(() => {
        window.location.reload();
    }, 3000);
})


export default ws