const Servidor = require('./server/servidor');
const rutaBloques = require('./rutas/bloques.router');
const rutaImagenes = require('./rutas/imagenes.router');

const servidor = new Servidor().getInstancia();

servidor.agregarRutas([
    { rutaRaiz: '/bloques', enrutador: rutaBloques },
    { rutaRaiz: '/imagenes', enrutador: rutaImagenes }
]);

servidor.iniciar( () => console.log('Servidor corriendo en el puerto ' + servidor.puerto) );