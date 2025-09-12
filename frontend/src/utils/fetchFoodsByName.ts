import { type FuseSearch } from "../fuse-search";
import type { Food } from "../types.backend";


type Foods = Record<string, Food[]>


export function fetchFoodsByName(foodNames: string[], fuseSearch: FuseSearch) {

    // const { allFoods } = useFoods()

    const results = foodNames.map(name => fuseSearch.search(name))

    // console.info({ foodNames, fuseSearch, results })

    // const results = useQueries({
    //     queries: names.map(name => ({
    //         queryKey: ["food", name],
    //         queryFn: () => api.getFoodsByName(name),
    //         staleTime: Infinity,
    //     }))
    // })

    // const fetchedFoods = results.map(result => result.data)

    // Assign each array of fetched foods to the appropriate name
    const output: Foods = {}

    results.forEach((foodResults, i) => {
        const foodName = foodNames[i]
        output[foodName] = foodResults.map(res => res.item)
    })

    return output
}
