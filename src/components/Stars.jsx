export default function Stars({ vote }) {
    const stars = Math.ceil(vote / 2)

    if (stars === 5) {
        return <span>★★★★★</span>
    } else if (stars === 4) {
        return <span>★★★★☆</span>
    } else if (stars === 3) {
        return <span>★★★☆☆</span>
    } else if (stars === 2) {
        return <span>★★☆☆☆</span>
    } else if (stars === 1) {
        return <span>★☆☆☆☆</span>
    } else {
        return <span>☆☆☆☆☆</span>
    }
}
