export function randomNum(min: number, max: number): number {
    const dif = max - min; 
    const randomNum = Math.round(Math.random() * dif) + min;
    return randomNum;
}