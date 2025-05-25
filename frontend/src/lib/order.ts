import { cart } from "./cartStore.svelte";
import type { Addon, ItemReference } from "./types";
import ws from "./ws";

export const checkOut = () => {
    if (ws.readyState !== WebSocket.OPEN) {
        cart.status = "Not connected to server"

        return
    }

    if(cart.items.length === 0) {
        cart.status = "Please select at least one item."
        return
    }

    cart.orderNumber += 1
    localStorage.setItem("orderNumber", String(cart.orderNumber))
    const formattedOrderNumber = cart.orderNumber.toString().padStart(3, '0');

    const username = cart.username || "Anonymous"
    if(cart.username) {
        localStorage.setItem("username", cart.username)
    }

    const total = cart.items
        .reduce((total, item) => total + item.price, 0)
        .toFixed(2);

    const items = cart.items
        .map((item) => ({
            ...item,
            addons: item.addons // VVV we need to explitly type this coz of a bug i think
                .filter((addon: Addon & { selected: boolean }) => addon.selected)
        }))

    let message = `ORDER ${formattedOrderNumber} FOR ${username}:\n`; // Order number added first
    
    const formattedItems = items.flatMap(item => {
        let formattedItem = `${item.name} - $${item.price.toFixed(2)}`
        const formattedAddonArray = item.addons.map(addon => `\t+ ${addon.name} - $${addon.price.toFixed(2)}`)

        let formattedArray = [formattedItem]
        if(formattedAddonArray.length > 0) {
            formattedArray = [formattedItem].concat(formattedAddonArray)
        }

        return formattedArray
    })

    message += formattedItems.join("\n")
    message += `\nTOTAL: $${total}`;

    if (cart.notes) {
        message += `\n\ncheeky note: ${cart.notes.trim()}`;
    }

    message += `\n\n`; // Add double line break after each completed order

    ws.send(message);
    console.log(message)

    //reset
    cart.items = []
    cart.notes = ""
    cart.status = `Order ${formattedOrderNumber} sent! Check the big screen for your number.`;
}