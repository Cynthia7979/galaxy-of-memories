const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const app = initializeApp({
    credential: applicationDefault()
});

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true })

async function addStar(name, born, death, description, media) {
    const starRef = db.collection('stars').doc(name);
    starRef.set({
        born: born,
        death: death,
        description: description,
        media: media
    })
    return starRef;
}

// Test
// addStar("GPBurdell", 2000, 3000, "Hello", "helllo").then(
//     starID => console.log(starID)
// )