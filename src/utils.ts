
export function startWithUpperCase(text: string) {
    if (text && text.length) {
        return text[0].toUpperCase() + text.substr(1);
    }
    return text;
}
