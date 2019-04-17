var Router = require('express');
const BloqueModelo = require('../modelos/bloque.model');

const rutas = Router();

/* [ INICIO ] RUTAS GET */
rutas.get('', (req, res) => {

    BloqueModelo.getTodos()
    .then( resp => {
        res.json({
            'okay': true,
            'bloques': resp
        });
    })
    .catch( err => {
        console.log('ERROR AL INSERTAR BLOQUE ', err);

        res.json({
            'okay': false,
            'error': err
        });
    });

})
/* [ FIN ] RUTAS GET */

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

/* [ INICIO ] RUTAS PUT */
rutas.put('/update-posicion', (req, res) => {

    BloqueModelo.editarPosicion( 
        {
            "latitud": req.body.latitud,
            "longitud": req.body.longitud
        }, req.body.idBloque )
        .then( resp => {

            if ( resp.affectedRows > 0 ) {
                res.json({
                    'okay': true,
                    'bloque': resp
                });
            } else {

                res.json({
                    'okay': false,
                    'error': 'No se pudo hacer la actualización'
                });
            }
            
        })
        .catch( err => {
            console.log('ERROR AL ACTUALIZAR POSICION DE BLOQUE ', err);

            res.json({
                'okay': false,
                'error': err
            });
        });
});
/* [ FIN ] RUTAS PUT */

module.exports = rutas;

