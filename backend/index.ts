import { Server } from "socket.io"
import { createServer } from "node:http"
import { parse } from "yaml"

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

const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("Someone connected")

    socket.on("echo", (event) => {
        io.sockets.emit("echo", `echo: ${event}`)
    })
})

setInterval(() => {
    const { course, name } = items[Math.floor(Math.random() * items.length)]
    const price = Math.floor(Math.random() * 20)

    const username = config.names[Math.floor(Math.random() * config.names.length)]

    console.log(`
Creating a new order from ${username},
\t ${name}
\t ${course} 
\t $${String(price).concat(".00")}
        `)

    io.sockets.emit("order", {
        username: username,
        order: {
            course,
            item: name,
            price
        }
    })
}, config.orderFrequencyMs)


httpServer.listen(3000, () => {
    console.log("listening on http://localhost:3000")
})