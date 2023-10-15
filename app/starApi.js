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

export function searchStar(stars, setZoom, setFocusPos, setCurrentFocus) {
    return (nameQuery) => {
        console.log(stars.filter(obj => obj.name == nameQuery))
        let chosenStar = stars.filter(obj => obj.name == nameQuery)[0]
        setCurrentFocus(chosenStar ? chosenStar.name : null);
        setFocusPos(chosenStar ? {x: chosenStar.position[0], y: chosenStar.position[1], z: chosenStar.position[2]} : {x: 0, y: 0, z: 10})
        setZoom(chosenStar ? true : false)
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
