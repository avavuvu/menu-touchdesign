import { writable } from "svelte/store";
import type { Addon, MenuItem, ItemReference } from "./types";
import { SvelteMap } from "svelte/reactivity";

type Cart = {
    items: ItemReference[]
    status: string,
    username: string,
    notes: string,
    orderNumber: number
}

export const cart: Cart = $state({
    items: [],
    status: "",
    username: localStorage.getItem("username") || "",
    notes: "",
    orderNumber: Number(localStorage.getItem("orderNumber")) || 0
})

// dirty code
export const addToCart = (item: ItemReference) => {
    if(cart.items.length > 10) {
        return
    }

    cart.items.push({
        ...item,
        addons: JSON.parse(JSON.stringify(item.addons))
    })
}

export const removeFromCart = (itemToRemove: ItemReference) => {
    cart.items = cart.items.filter(item => item !== itemToRemove)
}