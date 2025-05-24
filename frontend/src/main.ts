import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import socket from './lib/ws'

socket.connect()

socket.on("connect", () => {
    console.log("connected")
  });

const app = mount(App, {
    target: document.getElementById('app')!,
})

export default app
