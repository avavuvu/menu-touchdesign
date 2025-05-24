export type Course = "entree" | "main" | "dessert" | "drinks"
    
export type Item = {
    description?: string,
    name: string
    price: number
    addons?: Addon[]
}

export type ItemReference = Item & {
    addons: (Addon & { selected: boolean })[],
}

export type Addon = {
        price: string,
        name: string
        description: string
    }

export type Items = Record<Course, Item[]>