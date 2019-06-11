var MySql = require('../datos/mysql');

class BloqueModelo {

    static async insertar(bloque) {
        let  mysql = new MySql().getInstancia();

        let posicion = bloque.posicion;

        let resInsertPos = await mysql.query(
            `INSERT INTO posiciones (latitud, longitud)
                VALUES (?, ?);`,
            [
                posicion.latitud,
                posicion.longitud
            ]
        )

        let resInsertBloque = await mysql.query(
            `INSERT INTO bloques (nombre, codigo, id_zona, id_posicion) 
                VALUES (?, ?, ?, ?);`,
            [
                bloque.nombre,
                bloque.codigo,
                bloque.idZona,
                resInsertPos.insertId
            ]
        );

        let salones = bloque.salones;

        for ( let salon of salones ) {
            let resInsertSalon = await mysql.query(
                `INSERT INTO salones (nombre, codigo, piso, id_bloque)
                    VALUES (?, ?, ?, ?);`,
                [
                    salon.nombre,
                    salon.codigo,
                    salon.piso,
                    resInsertBloque.insertId
                ]
            );

            salon.idServer = resInsertSalon.insertId;
        }

        // Retornamos el id en el cual se insertó en la base de datos para que
        // porterior mente envien las imagenes y relacionarlas con el bloque y los salones
        bloque.idServer = resInsertBloque.insertId;

        return bloque;
    }

    static async editarPosicion( posicion, idBloque ) {
        let  mysql = new MySql().getInstancia();

        let resInsertPos = await mysql.query(
            `INSERT INTO posiciones (latitud, longitud)
                VALUES (?, ?);`,
            [
                posicion.latitud,
                posicion.longitud
            ]
        );

        let resUpdateBloque = await mysql.query(
            `UPDATE bloques SET id_posicion = ? WHERE id = ?;`,
            [
                resInsertPos.insertId,
                idBloque
            ]
        );

        return resUpdateBloque;
    }

    static async getTodos() {
        let  mysql = new MySql().getInstancia();

        let resBloques = await mysql.query(
            'SELECT *, id_zona AS idZona, id_posicion AS idPosicion FROM bloques'
        );

        return resBloques;
    }

    static async getInfoTodos() {
        let  mysql = new MySql().getInstancia();

        let resBloques = await mysql.query(
            'SELECT *, id_zona AS idZona, id_posicion AS idPosicion FROM bloques'
        );

        for ( let bloque of resBloques ) {
            let resPos = await mysql.query(
                'SELECT * FROM posiciones WHERE id = ?',
                [ bloque.id_posicion ]
            );

            if ( resPos.length > 0 ) bloque.posicion = resPos[0];

            let resSalones = await mysql.query(
                'SELECT * FROM salones WHERE id_bloque = ?',
                [ bloque.id ]
            );

            bloque.salones = resSalones;
        }

        return resBloques;
    }

    static async getUno( idBloque ) {
        let  mysql = new MySql().getInstancia();

        let resBloques = await mysql.query(
            `SELECT bloques.*, bloques.id_zona AS idZona, bloques.id_posicion AS idPosicion 
                FROM bloques
                WHERE bloques.id = ?`,
            [ idBloque ]
        );

        if ( resBloques.length > 0 ) {

            let resPos = await mysql.query(
                `SELECT * FROM posiciones WHERE id = ?`,
                [ resBloques[0].id_posicion ]
            );

            if ( resPos.length > 0 && resPos[0].id != 19 ) { // La 19 es una posicion temporal
                resBloques[0].posicion = resPos[0]; // agregamos la posicion a la respuesta
            }

            return resBloques[0];

        }

        

        return undefined;
    }

}

module.exports = BloqueModelo;
