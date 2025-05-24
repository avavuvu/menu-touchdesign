import { writable } from "svelte/store";
import type { Addon, Item, ItemReference } from "./types";
import { SvelteMap } from "svelte/reactivity";

type Cart = {
    items: ItemReference[]
    
}

export const cart: Cart = $state({
    items: []
})

// dirty code
export const addToCart = (item: ItemReference) => {
    cart.items.push({
        ...item,
        addons: JSON.parse(JSON.stringify(item.addons))
    })
}

export const removeFromCart = (itemToRemove: ItemReference) => {
    cart.items = cart.items.filter(item => item !== itemToRemove)
}