import { cart } from "./cartStore.svelte";
import type { Addon, ItemReference } from "./types";
import socket from "./ws";

export const checkOut = () => {
    if(cart.items.length === 0) {
        return
    }

    const items = cart.items
        .map((item) => ({
            ...item,
            addons: item.addons //we need to explitly type this coz of a bug i think
                .filter((addon: Addon & { selected: boolean }) => addon.selected)
        }))

    socket.emit("make order", {
        items: items
    })
}