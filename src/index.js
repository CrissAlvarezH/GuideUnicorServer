const Servidor = require('./server/servidor');
const rutaBloques = require('./rutas/bloques.router');

const servidor = new Servidor().getInstancia();

servidor.agregarRutas([
    { rutaRaiz: '/bloques', enrutador: rutaBloques }
]);

servidor.iniciar( () => console.log('Servidor corriendo en el puerto ' + servidor.puerto) );