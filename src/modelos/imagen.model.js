var MySql = require('../datos/mysql');

class ImagenModelo {
    
    static async insertar(imagen) {
        let mysql = new MySql().getInstancia();

        let resInsertImg = await mysql.query(
            'INSERT INTO imagenes (fecha) VALUES (?);',
            [
                imagen.fecha
            ]
        );

        // De que es la imagen, eje: bloque, salon, etc.
        switch ( imagen.de ) {
            case 'bloque':

                await mysql.query(
                    `INSERT INTO imagen_bloque (id_imagen, id_bloque)
                        VALUES (?, ?);`,
                    [ resInsertImg.insertId, imagen.idRelacion ]
                );

                return resInsertImg.insertId;
            case 'salon':

                await mysql.query(
                    `INSERT INTO imagen_salon (id_imagen, id_salon)
                        VALUES (?, ?);`,
                    [ resInsertImg.insertId, imagen.idRelacion ]
                );

                return resInsertImg.insertId;
        }
    }

}

module.exports = ImagenModelo;

