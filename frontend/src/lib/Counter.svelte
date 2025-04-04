<script lang="ts">
    import socket from "./ws";

    let count: number = $state(0);
    const increment = () => {
        count += 1;

        socket.emit("count", `count: ${count}`)
        
    };

    socket.on("global message", (event) => {
        globalMessage = event
    })

    let globalMessage = $state("")
</script>

<button onclick={increment}>
    count is {count}
</button>

<button onclick={() => socket.emit("global message", "Hello World")}>
    Global Message: {globalMessage}
</button>
