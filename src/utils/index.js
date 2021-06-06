export function formatJSON(input, indent, isObj) {
    if (typeof input === "string") {
        let s = "";
        try {
            s = JSON.parse(input);
        } catch (error) {
            return "";
        }
        if (isObj) {
            return JSON.stringify(s, null, indent);
        } else {
            const obj = JSON.parse(s);
            return JSON.stringify(obj, null, indent);
        }
    } else {
        return JSON.stringify(input, null, indent)
    }
}