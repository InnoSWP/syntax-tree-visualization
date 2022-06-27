export function hashCode(string: String) {
    let hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash
}

// @ts-ignore
export function logger(req, res, next) {
    let date = new Date();
    let formattedDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
        date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log(`${formattedDate} ${req.method} request on ${req.url}`)
    next()
}
