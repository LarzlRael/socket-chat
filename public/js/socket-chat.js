var socket = io();

var params = new URLSearchParams(window.location.search);

//la funcion params has es para ver si el url cumple o no con el parametro

if (!params.has('nombre')) {
    window.location = "index.html";
    throw new Error('El nombre es necesario y sala son encearios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function () {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function (resp) {
        console.log(resp)
    });
});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});






// Enviar información
//emit emitir
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function (resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function (mensaje) {


    console.log('Servidor:', mensaje);

});

//Escuchar cambios de usuario
//cuando un usuario entra o sale del chat

socket.on('listaPersona', function (personas) {


    console.log('Servidor:', personas);

});

//mensajes privados
socket.on('mensajePrivado', function (mensaje) {
    console.log('mensaje privado ', mensaje)
})

// socket.emit('mensajePrivado', {

//     mensaje: 'hola quien quiera que seas',
//     para :"BPVkuHR3wqmEqycKAAAG"
// });