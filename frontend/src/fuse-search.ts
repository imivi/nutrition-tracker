import Fuse from 'fuse.js'
import { type Food } from './types.backend'

export const fuseSearch = new Fuse<Food>([], {
    includeScore: true,
    keys: ["name"],
})

export type FuseSearch = typeof fuseSearch

export function searchFoods(foodNames: string[]) {
    return foodNames.map(name => fuseSearch.search(name))
}

// export function setItemsToSearch(foods:Food[]) {
//     fuseSearch.setCollection(foods)
// }