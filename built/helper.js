export function randomNum(min, max) {
    const dif = max - min;
    const randomNum = Math.round(Math.random() * dif) + min;
    return randomNum;
}
