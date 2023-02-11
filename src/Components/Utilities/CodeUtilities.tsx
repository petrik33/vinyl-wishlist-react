export const filterId = <T extends { id: string}>(array: Array<T>, id: string)  : Array<T> => {
    return array.filter((value) => {
        return (value.id !== id);
    })
}