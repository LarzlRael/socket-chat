
var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');

//referencias de jquery
var divUsuarios = $('#divUsuarios');
var form_enviar = $('#form-enviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');


//para obtener el parametro de la url
function renderizarUsuarios(personas) {

    console.log('Personas conctadas al nuestro chat ', personas);
    //funciones para renderixar usuarios

    var html = '';
    var sala = params.get('sala');
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + sala + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {

        html += `<li>
            <a data-id="${personas[i].id}" href="javascript:void(0)">
                <img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> 
                <span> ${personas[i].nombre}<small class="text-success">online</small>
                </span>
            </a>
        </li >`;

    }

    divUsuarios.html(html);
}

//Listeners

divUsuarios.on('click', 'a', function () {
    //para sacar el id de cada id ussando data-id
    var id = $(this).data('id');
    console.log(id)

    if (id) {
        console.log(id);
    }
})

form_enviar.on('submit', function (e) {
    //esto evitara que se recargue la página
    e.preventDefault();
    //console.log(txtMensaje.val())

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre,
        mensaje: txtMensaje.val()
    }, function (mensaje) {
        // console.log('respuesta del server : ', resp);
        //para cuando el mensaje se envia la caja de texto se vacie y el foco se mantenga en el mismo lugar
        txtMensaje.val('').focus();
        //usando la funcion para renderizar mensajes
        renredizarMensajes(mensaje, true)
        //funcion para que el scrool se vaya abajo
        scrollBottom();

    })

})


function renredizarMensajes(mensaje, yo) {
    //El parametro yo es para diferenciar si el mensaje ha sido enviado por mi u otro usuario, vamos a manejarlo con un boolean
    console.log('este mensaje es de renderizarMensaje : ', mensaje)

    var fecha = new Date(mensaje.fecha);
    var hora = `${fecha.getHours()} : ${fecha.getMinutes()} `;
    var html = '';
    var adminClass = 'info';

    if (mensaje.nombre === 'Admin') {
        adminClass = 'danger'
    }

    if (yo) {
        html = `
        <li class="reverse">
            <div class="chat-content">
                <h5>${mensaje.nombre}</h5>
                <div class="box bg-light-inverse">${mensaje.mensaje}</div>
            </div>
            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" />
            </div>
            <div class="chat-time">${hora}</div>
        </li> 
        `;

    } else {

        if (mensaje.nombre !== 'Admin') {

            var img = '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        } else {
            img = ''
        }

        html = `
        <li>
            ${img}
            <div class="chat-content">
                <h5>${mensaje.nombre}</h5>
                <div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>
            </div>
            <div class="chat-time">${hora}/div>
        </li>
    `;
    }

    divChatbox.append(html);
}

function scrollBottom() {
    // selectors
    var newMessage = divChatbox.children("li:last-child");

    // heights
    var clientHeight = divChatbox.prop("clientHeight");
    var scrollTop = divChatbox.prop("scrollTop");
    var scrollHeight = divChatbox.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (
        clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
        scrollHeight
    ) {
        divChatbox.scrollTop(scrollHeight);
    }
}
