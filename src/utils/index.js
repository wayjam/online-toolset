export function formatJSON(input, indent, parsed) {
    let s = "";
    try {
        s = JSON.parse(input);
    } catch (error) {
        return "";
    }
    if (parsed) {
        return JSON.stringify(s, null, indent);
    } else {
        const obj = JSON.parse(s);
        return JSON.stringify(obj, null, indent);
    }
}


