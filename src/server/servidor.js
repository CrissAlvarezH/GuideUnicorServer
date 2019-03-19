var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');

class Servidor {

    constructor(puerto) {
        this.puerto = puerto;
        this.app = express();

        this.app.use( function (req, res, next) {
            // Permite a cualquier origen conectarse
            res.setHeader('Access-Control-Allow-Origin', '*');
        
            // Los metodos permitidos
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        
            // Headers permitidas
            res.setHeader('Access-Control-Allow-Headers', 'Authorization,X-Requested-With,content-type');

            // Pasamos a los siguientes middlewares
            next();
        });

        this.app.use( morgan('dev') );// utilizamos morgan para ver los logs del server en su modo dev

        // para soportar json encode bodys en las peticiones
        this.app.use( bodyParser.json() );
        this.app.use( bodyParser.urlencoded({ extended: true}) );

        this.server = http.createServer(this.app);// creamos un servidor http manejado por express
    }

    agregarRutas( rutas ) {
        rutas.forEach(ruta => {
            this.app.use(ruta.rutaRaiz, ruta.enrutador);
        });
    }

    iniciar( callBack ) {
        this.server.listen(this.puerto, callBack);
    }

}

class Singleton {
    constructor() {
        if ( !Singleton.instancia ) {
            Singleton.instancia = new Servidor(4400);
        }
    }

    getInstancia() {
        return Singleton.instancia;
    }
}

module.exports = Singleton;