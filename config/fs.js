var admin = require("firebase-admin");

var serviceAccount = require("../fs-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Base de datos FireStore Conectada')

const db = admin.firestore()
const prods = db.collection('productos')
const carts = db.collection('carrito')

module.exports = {prods, carts}