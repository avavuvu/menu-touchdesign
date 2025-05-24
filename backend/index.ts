
import { createServer } from "node:http"
import { parse } from "yaml"
import express from "express"
import http from "http"
import { Server } from "socket.io"

const file = Bun.file("./config/testdata.yaml")
const yamlData = await file.text()

type Config = {
    orderFrequencyMs: number,
    names: string[],
    items: {
        entree: string[],
        main: string[],
        dessert: string[],
        drinks: string[],
    }
}

const config: Config = parse(yamlData)["config"]

const items = Object.entries(config.items)
    .flatMap(([course, items]) =>
        items.map(item => ({
            name: item,
            course,
        }))
    )

const app = express();
const httpServer = http.createServer(app);

// Proper CORS middleware for Express
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Your JSON endpoint
app.get('/api', (req, res) => {
    res.json({
        items: config.items
    });
});

// Socket.IO setup
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Client connected')
    socket.on("make order", (order) => {
        console.log(JSON.stringify(order))

        amount ++

        console.log(amount)
    })
});

let amount = 0

httpServer.listen(3000, () => {
    console.log('Server running on port 3000');
});