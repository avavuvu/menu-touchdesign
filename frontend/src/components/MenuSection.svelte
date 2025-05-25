<script lang="ts">
    import type { Items } from "../lib/types";
    import MenuItem from "./MenuItem.svelte";
    import SoundItem from "./SoundItem.svelte";

    const { items }: { items: Items } = $props()

    const getHeaderImage = (course: string) => {
        return `/header/${course}.svg`
    }

</script>

<div class="item-list p-4">
    {#each Object.entries(items) as [course, itemList]}
        <img
            class="mx-auto max-w-[100px] py-4" 
            src={getHeaderImage(course)} alt={course}>

        <div class="grid grid-cols-1 gap-2">
            {#each itemList as item, index}
                {#if "type" in item}
                    <SoundItem id={item.id} {index}/>
                {:else}
                    <MenuItem {item} {index}/>

                {/if}
            {/each} 

        </div>
    {/each}
</div>