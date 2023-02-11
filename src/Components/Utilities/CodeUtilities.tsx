export const filterWithId = <T extends { id: string}>(array: Array<T>, id: string)  : Array<T> => {
    return array.filter((value) => {
        return (value.id !== id);
    })
}

export const filterId = (array: Array<string>, id: string) => {
    return array.filter((value) => {
        return (value !== id);
    })
}