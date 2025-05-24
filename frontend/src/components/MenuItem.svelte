<script lang="ts">
    import { addToCart } from "../lib/cartStore.svelte";
    import type { Addon, Item, ItemReference } from "../lib/types";


    const { item, index }: {
        item: Item
        index: number
    } = $props()

    let selected = $state(false)

    const itemReference: ItemReference = $state({
        ...item,
        addons: item.addons?.map((addon) => ({
            ...addon,
            selected: false
        })) ?? []
    })

    const toggleAddon = (addon: Addon & { selected: boolean }) => {
        addon.selected = !addon.selected
    }
</script>

<div class="">
    <div 
        style:--col-size={"addons" in item ? ".75fr" : ".34fr"}
        class:selected={selected} 
        class:reverse={index % 2 === 0}
        class="entry group grid grid-cols-2 border border-black">
        <button
            onclick={() => selected = !selected}
            class:reverse={index % 2 === 0}>
            <img class="" src="https://placehold.co/500x500" alt="">
        </button>
    
        <button 
            onclick={() => selected = !selected}
            class="p-2 flex flex-col justify-between">
            <div>
                <h2 class="font-bold text-xs text-right group-[.reverse]:text-left">
                    {item.name}
                </h2>
                <p class="text-xs text-gray-500 text-right group-[.reverse]:text-left">
                    {#if item.description}
                        {item.description}
                    {:else}
                        Lorem ipsum is a type of placeholder text used in graphic design
                    {/if}
                </p>
            </div>
            <span class="w-full text-right">
                ${item.price}
            </span>
        </button>
    
        <div class="foldout col-span-2 flex flex-col justify-between text-xs">
            <div class="p-2 h-full">
                {#if "addons" in item}
                    <h3 class="text-left">Extras</h3>
                    <div class="h-full justify-center flex">
                    {#each itemReference.addons as addon}
                        <button 
                            onclick={() => toggleAddon(addon)}
                            class="w-full">
                            <span class="w-full inline-flex justify-between">
                                <h4 class="font-bold">{addon.name}</h4>
                                <span>${addon.price}</span>
                            </span>
                            <span class="w-full inline-flex justify-between">
                                <p class="text-md text-gray-500">
                                    {addon.description}
                                </p>
                                <input bind:checked={addon.selected} type="checkbox">
                            </span>

                        </button>
                    {/each}
                    </div>
                {/if}
    
            </div>
    
            <div class="w-full inline-flex justify-center mb-4">
                <button 
                    onclick={() => addToCart(itemReference)}
                    class="text-center border px-2 rounded-xl">Add to Order</button>
            </div>
        </div>
    </div>

</div>

<style>
    .reverse {
        grid-column-start: 2;
        grid-row-start: 1;
        text-align: right;
    }

    .entry {
        grid-template-rows: 1fr 0fr;
        transition: grid-template-rows 400ms;
        transition-timing-function: ease-in-out;
        text-align: left;
    }

    .entry.selected {
        grid-template-rows: 1fr var(--col-size);
    }

    .foldout {
        opacity: 0;
        overflow: hidden;
        min-height: 0;
        transition: transform 0.3s ease, opacity 0.3s ease-in-out;
    }

    .selected .foldout {
        opacity: 1;
    }
</style>