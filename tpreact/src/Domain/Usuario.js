export class Usuario{

    id = -1
    nombre = ""
    apellido = ""
    username = ""
    contrasenia = ""
    paisDeResidencia = ""
    destinosDeseados = []
    destinosVisitados = []
    gustos = new Neofilo()
    criterio = new Relajado()
    diasParaViajar = 0
    fechaDeAlta = 0
    itinerarios = []
}

export class UserInformation{

    itinerariosPuntuados
    itinerariosCreados
    destinosVisitados
    amigos

}

class Neofilo {

    type = "Neofilo"

}

class Relajado {
    type = "Relajado"

}