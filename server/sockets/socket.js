const { io } = require('../server');

const { Usuarios } = require('../classes/Usuarios');

const { crearMensaje } = require('../utilidades/utilidades')
const usuarios = new Usuarios();
io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {



        if (!data.nombre || !data.sala) {
            return callback({
                err: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }
        //  unir a un cliente a una sala en particular
        client.join(data.sala);


        // para  mandar el id este es siguiete codigo
        let personas = usuarios.agregarPersona(client.id, data, data.sala);
        //cuando una persona se conecta se dispara la funcion para actualizar la lista de personas
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonaPorSala(data.sala));

        callback(usuarios.getPersonaPorSala(data.sala));
    })

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje)

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    })


    //cuando un cliente se desconecta
    client.on('disconnect', () => {
        let personaBorrarada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrarada.sala).emit('crearMensaje', crearMensaje('Admin', `${personaBorrarada.nombre} salio`))
        //tenemos que volver a ejectuar este metodo para actulizar, cuando una personas se desconecta
        client.broadcast.to(personaBorrarada.sala).emit('listaPersona', usuarios.getPersonaPorSala(personaBorrarada.sala));
    });

    //mensajes privados

    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id);
        //donde to es el id del usuario de la persona que queremos mandar el mensaje
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    })

});
