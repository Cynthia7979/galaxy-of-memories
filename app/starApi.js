export function addStar(stars, setStars) {
    return (name, born, death, description, resetValues=()=>{}) => {
        setStars([
            ...stars,
            {
                name: name,
                born: born,
                death: death,
                description: description,
                color: randomStarColor(),
                position: randomPos(),
                planets: []
            }
        ]);
        resetValues();
    }
}

export function searchStar(stars, setZoom, setFocusPos, setCurrentFocus, showMessage) {
    return (nameQuery) => {
        console.log(stars.filter(obj => obj.name == nameQuery))
        let chosenStar = stars.filter(obj => obj.name == nameQuery)[0]
        setCurrentFocus(chosenStar ? chosenStar.name : null);
        chosenStar ? setFocusPos({x: chosenStar.position[0], y: chosenStar.position[1], z: chosenStar.position[2]}) : 0
        setZoom(chosenStar ? true : false)
        if (!chosenStar) showMessage("Star Not Found", 1000)
    }
}

export function addPlanet(stars, setStars, currentFocus) {
    return (planetMessage, resetValues=()=>{}) => {
        let starsCopy = stars.map( star => {
            let starCopy = star;
            if (starCopy.name === currentFocus) {
                starCopy.planets.push({
                    label: planetMessage,
                    color: randomPlanetColor()
                })
            }
            return starCopy
        })
        setStars(starsCopy);
        resetValues();
    }
}

const randomColor = (redMin, redMax, greenMin, greenMax, blueMin, blueMax) => {
    const red = ((Math.random() * (redMax - redMin) + redMin) << 0).toString(16).padStart(2, '0');
    const green = ((Math.random() * (greenMax - greenMin) + greenMin) << 0).toString(16).padStart(2, '0')
    const blue = ((Math.random() * (blueMax - blueMin) + blueMin) << 0).toString(16).padStart(2, '0')
    return '#' + red + green + blue
}
const randomStarColor = () => randomColor(0xF0, 0xFF, 0xE0, 0xF0, 0x86, 0xFF)
const randomPlanetColor = () => randomColor(0x70, 0xCF, 0x30, 0xCF, 0x86, 0xFF)
const randomValue = (min=-3, max=3, gap=5) => (Math.random() * (max/gap - min/gap) + min/gap) * gap
const randomPos = () => [randomValue(), randomValue(), randomValue(-3, 1)]
