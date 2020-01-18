

class Usuarios {
    constructor() {
        this.personas = [];

    }
    //crea una persona con el id y con el nombre
    agregarPersona(id, nombre, sala) {
        let persona = {
            id, nombre, sala
        };
        this.personas.push(persona);
        return this.personas;
    }
    // returna la persona segun su id
    getPersona(id) {
        //una forma de buscar es es con este mentodo filter
        let persona = this.personas.filter(persona => {
            return persona.id === id
        })[0];
        return persona;
    }
    //retorna todas las personas de nuestro arreglo
    getPersonas() {
        return this.personas;
    }

    getPersonaPorSala(sala) {
        let personaEnSala = this.personas.filter(persona => {
            return persona.sala === sala
        });
        return personaEnSala;

    }
    //boorar a la  persona que se fue del chat usando tambien el metodo filter
    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter(persona => {
            return persona.id !== id;
        })
        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}