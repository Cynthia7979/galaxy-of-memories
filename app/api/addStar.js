import clientPromise from "../../lib/mongo";

const addStar = async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("galaxy-of-memories")
        const { name, born, death, description, media } = req.body
        const newStar = await db.collection("stars").insertOne({
            name,
            born,
            death,
            description,
            media,
        })
        res.json(newStar);
    } catch (e) {
        console.error(e)
        throw new Error(e).message
    }
}

export default addStar; 