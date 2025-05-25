export type Course = "entree" | "main" | "dessert" | "drinks"
    
export type MenuItem = {
    description?: string,
    name: string
    price: number
    addons?: Addon[],
    imageUrl?: string
}

export type SoundItem = {
    type: "sound",
    id: "button1" | "button2" | "button3" | "button4" | "button5"
}

export type Item = MenuItem | SoundItem

export type ItemReference = MenuItem & {
    addons: (Addon & { selected: boolean })[],
}

export type Addon = {
        price: number,
        name: string
        description: string
    }

export type Items = Record<Course, Item[]>