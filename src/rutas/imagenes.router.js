const Router = require('express');
const ImagenModelo = require('../modelos/imagen.model');
const fs = require('fs');
const formidable = require('formidable');

const rutas = Router();

/* [ INICIO ] RUTAS POST */
rutas.post('/insertar', (req, res) => {

    var form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {

        if ( fields.tipo == 'bloque' ) {
            // Todas las imagenes vienen juntas

            let ruta = `/root/node_proyectos/UbietyServer/src/archivos/imgs/bloques/${ fields.numBloque }`;

            if ( !fs.existsSync(ruta) )  
                fs.mkdirSync(ruta);

            for ( let n = 1; n <= fields.numImagenes; n++ ) {
                await moverImagen( files['imagen'+n].path, ruta, n);

                console.log(`Imagen ${n} del bloque ${fields.numBloque} guardada`);
            }

            res.json({
                'okay': true
            });

        } else if ( fields.tipo == 'salon' ) {
            // Los salones solo tienen una imagen

            let ruta = `/root/node_proyectos/UbietyServer/src/archivos/imgs/salones`;

            if ( !fs.existsSync(ruta) )
                fs.mkdirSync();

            moverImagen( files.imagen.path, ruta, fields.numSalon )
                .then( resp => {
                    res.json({
                        'okay': true
                    });
                })
                .catch( error => {
                    res.json({
                        'okay': false
                    });
                });

        }

    });
});

function moverImagen(rutaVieja, rutaNueva, nombre) {

    return new Promise( (resolve, reject) => {
        fs.rename( rutaVieja, rutaNueva + `/${ nombre }.jpg`, err => {
                        
            if ( err ) {
                console.log('>>> ERROR AL GUARDARSE IMAGEN DE BLOQUE', err);

                reject();
            }

            resolve();
        });
    });
}

/* [ FIN ] RUTAS POST */

module.exports = rutas;

