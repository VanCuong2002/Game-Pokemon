// Thuật toán Fisher-Yates algorith
export const shuffled = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp: T = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}
