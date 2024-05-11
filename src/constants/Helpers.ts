
export const computeTime = (timestamp: string) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const _date = `${day}-${month}-${year}`
    const _time = `${hours}:${minutes}`
    return { _date, _time }
}