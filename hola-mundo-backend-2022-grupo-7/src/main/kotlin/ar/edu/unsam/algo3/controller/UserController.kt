package ar.edu.unsam.algo3.controllers

import ar.edu.unsam.algo3.services.ItineraryService
import ar.edu.unsam.algo3.services.UserInformation
import ar.edu.unsam.algo3.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.uqbar.tareas.errors.BusinessException
import org.uqbar.tareas.errors.NotFoundException
import trabajoPracticoAlgoritmos2.Itinerario
import trabajoPracticoAlgoritmos2.Repositorio
import trabajoPracticoAlgoritmos2.Usuario

@RestController
@CrossOrigin("*")
class UserController{

    @Autowired
    lateinit var userService: UserService

    @GetMapping("/pruebaUser")
    fun getUser(): MutableList<Usuario> {
        return userService.getUser()
    }

    @GetMapping("/pruebaUser/{id}")
    fun getUserById(@PathVariable id:Int): Usuario? {
        return userService.getUserById(id)
    }

    @PatchMapping("/pruebaEditarUser/{id}")
    fun updateUser(@RequestBody updatedUser: String): Usuario {
        return userService.updateUser(updatedUser)
    }

    @PostMapping("/login")
    fun validateUser(@RequestBody userToValidate: Usuario): ResponseEntity<Any>? {
        val listaUsers = userService.searchUserByUsername(userToValidate.username)
            if(listaUsers.isEmpty() || listaUsers[0].contrasenia != userToValidate.contrasenia){
                throw BusinessException("El usuario o contraseña ingresados son incorrectos")
            }else{
                return ResponseEntity.ok(listaUsers[0])
            }
    }

    @GetMapping("/getUserInformation/{id}")
    fun getUserInformation(@PathVariable id:Int): UserInformation {
        return userService.getUserInformation(id)
    }

}