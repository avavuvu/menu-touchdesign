<script lang="ts">
    import { slide } from "svelte/transition";
    import { cart, removeFromCart } from "../lib/cartStore.svelte";

    const total = $derived(cart.items.reduce((totalValue, item) => {
        return totalValue + item.price
    }, 0))
</script>

<div class="cart fixed left-0 right-0 top-4 text-lg "
    class:show={total > 0 || cart.status !== ""} >
    <div class=" bg-gray-100 min-h-8 p-2 max-w-[90%] mx-auto">
        {#if total > 0}
            <div class="w-full min-h-8 max-h-24 overflow-scroll">
                {#each cart.items.toReversed() as cartItem}
                    <div class="w-full items-start  inline-grid grid-cols-[10%_auto_15%]">
                        <button onclick={() => removeFromCart(cartItem)}>✕</button>
                        <span>
                            <p class="font-bold">
                                {cartItem.name}
                            </p>
                            {#each cartItem.addons as addon}
                            {#if addon.selected}
                                <p class="ml-3 italic">+{addon.name}</p>
                            {/if}
                        {/each}
                        </span>
            
                        <span class=" text-right">${cartItem.price}</span>
                    </div>
                {/each}
            </div>
            <hr>

            <div class="w-full font-bold inline-flex justify-between ">
                <span class="">Total</span>
                <span class="">${total}</span>
            </div>
        {:else}
            <div transition:slide>
                <p class="text-gray-600 italic">{cart.status}</p>

            </div>
        {/if}


    </div>
</div>

<style>
    .cart {
        transform: translateY(-120%);
        transition: transform 0.3s ease, opacity 0.3s ease;
        pointer-events: none;
        opacity: 0;
    }

    .cart.show {
        transform: translate(0);
        opacity: 1;
        pointer-events: auto;
    }
</style>