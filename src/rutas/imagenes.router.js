const Router = require('express');
const ImagenModelo = require('../modelos/imagen.model');
const fs = require('fs');
const formidable = require('formidable');

const rutas = Router();

/* [ INICIO ] RUTAS POST */
rutas.post('/insertar', (req, res) => {

    var form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {

        let idImg = await ImagenModelo.insertar( 
            { fecha: fields.fecha, de: fields.de, idRelacion: fields.idRelacion }
        );
        
        if ( idImg > 0 ) {

            // Movemos la imagen para su carpeta respectiva
            console.log( fields, files );

            fs.rename(files.imagen.path, `./src/archivos/imgs/${fields.de}/${idImg}.jpg`, err => {
                if ( err ) {
                    console.log('ERROR AL MOVEL IMAGEN', err);

                    return res.json({
                        'okay': false,
                        'error': 'No se pudo mover la imagen'
                    });
                }

                return res.json({
                    'okay': true,
                });
            });

        } else {
            res.json({
                'okay': false,
                'error': 'No insertó la imagen'
            });
        }
    });
});
/* [ FIN ] RUTAS POST */

module.exports = rutas;

