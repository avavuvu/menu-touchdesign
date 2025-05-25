<script lang="ts">
    import { cart } from "../lib/cartStore.svelte";
    import { checkOut } from "../lib/order";


</script>

<div class="sticky bottom-0 bg-white h-44 py-2">
    <div class="mx-auto max-w-[90%] grid gap-2 grid-rows-[1fr_1fr_1fr] h-full">
        <input class="block w-full px-2" type="text" 
                bind:value={cart.username}
                id="usernameInput" 
                placeholder="who do you think you are?"
                autocomplete="off"
                required>

        <textarea 
            bind:value={cart.notes}
            class="block w-full px-2"
            id="messageInput" 
            placeholder="send a cheeky note to the chef"></textarea>

        <button 
            onclick={() => checkOut()}
            class="block w-full bg-black text-white">Place Order</button>

    </div>
</div>

<style>
    input, textarea {
        border: 1px solid #dddddd;
        background: #ffffff;
        color: #333333;
        font-size: 14px;
    }
    input:focus {
        outline: none;
        border-color: #000000;
    }
</style>