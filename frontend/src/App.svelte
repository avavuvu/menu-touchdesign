<script lang="ts">
    import Cart from "./components/Cart.svelte";
    import MenuItem from "./components/MenuItem.svelte";
    import MenuSection from "./components/MenuSection.svelte";
    import PlaceOrder from "./components/PlaceOrder.svelte";
    import Slider from "./components/Slider.svelte";
    import type { Items } from "./lib/types";

    import { items } from "./lib/items";

</script>

<div class="mb-24"></div>

<Cart/>

<!-- <Slider/> -->

<MenuSection {items}/>

<PlaceOrder></PlaceOrder>

<style>

</style>