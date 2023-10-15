export function addStar(stars, setStars) {
    return (name, born, death, description) => {
        setStars([
            ...stars,
            {
                name: name,
                born: born,
                death: death,
                description: description,
                color: randomColor(),
                position: randomPos()
            }
        ])
    }
}

const randomColor = (redMin=0xF0, redMax=0xFF, greenMin=0xE0, greenMax=0xF0, blueMin=0x86, blueMax=0xFF) => {
    const red = ((Math.random() * (redMax - redMin) + redMin) << 0).toString(16).padStart(2, '0');
    const green = ((Math.random() * (greenMax - greenMin) + greenMin) << 0).toString(16).padStart(2, '0')
    const blue = ((Math.random() * (blueMax - blueMin) + blueMin) << 0).toString(16).padStart(2, '0')
    return '#' + red + green + blue
}
const randomValue = (min=-3, max=3, gap=5) => (Math.random() * (max/gap - min/gap) + min/gap) * gap
const randomPos = () => [randomValue(), randomValue(), randomValue(-3, 1)]