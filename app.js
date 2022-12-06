const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, ()=>{console.log(`Sever up on PORT ${PORT}`)})

const productRouter = require('./router/productRouter.js')
const cartRouter = require ('./router/cartRouter.js')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', productRouter)
app.use('/api/carrito', cartRouter)

app.use((req, res) => {
    res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} método ${req.method} no implementada`});
});

