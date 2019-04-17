var mysql = require('mysql');

class MySql {

    constructor() {
        this.conexion = mysql.createConnection({
            host: 'localhost',
            user: 'root', 
            password: 'guitarra1', 
            database: 'bloques_salones_temporal', 
            dateStrings: true

        });

        this.conexion.connect( err => {
            if (err) {
                console.log('Error en la conexión de la base de datos', err);
                return;
            }

            console.log('Base de datos conectada correctamente');
        });
    }

    query(sql, args) {
        return new Promise( (resolve, reject) => {
            this.conexion.query(sql, args, (error, filas) => {
                if (error) return reject(error);

                resolve(filas);
            });
        });
    }

    close() {
        return new Promise( (resolve, reject) => {
            this.conexion.end( error => {
                if (error) return reject(error);

                resolve();
            });
        })
    }
}

class Singleton {

    constructor() {
        if ( !Singleton.instancia ) {
            Singleton.instancia = new MySql();
        }
    }

    getInstancia() {
        return Singleton.instancia;
    }
}

module.exports = Singleton;