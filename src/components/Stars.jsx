export default function Stars({ vote }) {
    const stars = Math.ceil(vote / 2)

    if (stars === 5) {
        return <span className="text-warning">★★★★★</span>
    } else if (stars === 4) {
        return <span className="text-warning">★★★★☆</span>
    } else if (stars === 3) {
        return <span className="text-warning">★★★☆☆</span>
    } else if (stars === 2) {
        return <span className="text-warning">★★☆☆☆</span>
    } else if (stars === 1) {
        return <span className="text-warning">★☆☆☆☆</span>
    } else {
        return <span className="text-warning">☆☆☆☆☆</span>
    }
}
