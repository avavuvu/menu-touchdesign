<script lang="ts">
    import Cart from "./components/Cart.svelte";
    import MenuItem from "./components/MenuItem.svelte";
    import MenuSection from "./components/MenuSection.svelte";
    import PlaceOrder from "./components/PlaceOrder.svelte";
    import { cart } from "./lib/cartStore.svelte";
    import { checkOut } from "./lib/order";
    import type { Item, Items } from "./lib/types";
    import socket from "./lib/ws";

    const fetchItems = async () => {
        const response = await fetch("http://localhost:3000/api", {
        })

        const { items }: { items: Items} = await response.json()

        return items
    }

</script>

<div class="mb-24"></div>

<Cart/>

{#await fetchItems()}
    <!--  -->
{:then items} 
    <MenuSection {items}/>
{/await}

<PlaceOrder></PlaceOrder>

<style>

</style>