<script lang="ts">
    import ws from "../lib/ws";

    const { id, index }: {id : string, index: number } = $props()

    const sendData = () => {
        const data = JSON.stringify({
            [id]: 100 
        })
        
        ws.send(data)

        console.log(data)
    };

</script>


<button 
    class="active:scale-105 transition-all"
    onclick={() => sendData()}>
    <div 
        class:reverse={index % 2 === 0}
        class="entry group grid grid-cols-2 border border-black">
        <div
            class:reverse={index % 2 === 0}>
            <div class="w-full aspect-square overflow-hidden">
                <img class="" src="/icon/sound.svg" alt="">

            </div>
        </div>
    
        <div 
            class="p-2 flex flex-col justify-between">
            <div>
                <h2 class="font-bold text-xs text-right group-[.reverse]:text-left">
                    Sound Button
                </h2>
                <p class="text-xs text-gray-500 text-right group-[.reverse]:text-left">
                    Click me!
                </p>
            </div>
        </div>
    </div>
</button>

<style>
    .entry {
        grid-template-rows: 1fr 0fr;
        transition: grid-template-rows 400ms;
        transition-timing-function: ease-in-out;
        text-align: left;
    }

    .reverse {
        grid-column-start: 2;
        grid-row-start: 1;
        text-align: right;
    }
</style>