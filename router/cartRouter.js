const express = require('express')
const { parse } = require('path')
const router = express.Router()
const CartManager = require('../controllers/cartManager.js')

let manejadorCarritos = new CartManager()

router.post('/', (req, res) => {
    if (!req.body.productos) {
        res.status(400).send({status: 400, message: "No se recibieron todos los campos requeridos"})
    } else {
        manejadorCarritos.add(req.body)
            .then(result => res.status(result.status).send(result));
    }
})

router.delete('/:id', (req, res) => {
    let paramId = req.params.id
    manejadorCarritos.deleteCartById(paramId)
        .then(result => res.status(result.status).send(result));
})


router.get('/:id/productos', (req, res) => {
    let paramId = req.params.id
    manejadorCarritos.listAll(paramId)
        .then(result => res.status(result.status).send(result));
    
})

router.post('/:id/productos', (req, res) => {
    let paramId = req.params.id
    if ((!req.body.nombre) || (!req.body.descripcion) || (!req.body.codigo) || 
        (!req.body.foto) || (!req.body.precio) || (!req.body.stock))  {
        res.status(400).send({status: 400, message: "No se recibieron todos los campos requeridos"})
    } else {
        manejadorCarritos.addById(paramId, req.body)
            .then(result => res.status(result.status).send(result));
    }
    
})

router.delete('/:id/productos/:id_prod', (req, res) => {
    let paramIdCart = req.params.id
    let paramIdProd = req.params.id_prod


    manejadorCarritos.deleteProdById(paramIdCart, paramIdProd)
        .then(result => res.status(result.status).send(result));

})


module.exports = router