export default {
    capitalize(string) {
        return string.replace(/^\w/g, c => c.toUpperCase())
    },
}
