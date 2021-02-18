export default {
    randomRange(min, max) {
        return Math.random() * (max - min) + min
    },
    randomRangeInt(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    },
    map(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
    },
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max)
    },
    radToDeg(rad) {
        return rad * 180 / Math.PI
    },
    degToRad(deg) {
        return deg * Math.PI / 180
    },
    dist(p1, p2) {
        const a = p2.x - p1.x
        const b = p2.y - p1.y
        return Math.sqrt((a * a) + (b * b))
    },
    angle(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x)
    },
}
