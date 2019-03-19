var Router = require('express');
const BloqueModelo = require('../modelos/bloque.model');

const rutas = Router();

/* [ INICIO ] RUTAS POST */
rutas.post('/insertar', (req, res) => {
    let bloque = req.body;

    BloqueModelo.insertar(bloque)
        .then( resp => {
            res.json({
                'okay': true,
                'bloque': resp
            });
        })
        .catch( err => {
            console.log('ERROR AL INSERTAR BLOQUE ', err);

            res.json({
                'okay': false,
                'error': err
            });
        });
});
/* [ FIN ] RUTAS POST */

module.exports = rutas;

