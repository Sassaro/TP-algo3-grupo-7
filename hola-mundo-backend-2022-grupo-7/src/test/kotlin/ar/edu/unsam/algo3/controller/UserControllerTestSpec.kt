package ar.edu.unsam.algo3.controller

import VariablesStub.usuarioJosePerez
import VariablesStub.usuarioPedroBarreras
import ar.edu.unsam.algo3.ServerApplication
import com.fasterxml.jackson.module.kotlin.jacksonTypeRef
import io.mockk.core.ValueClassSupport.boxedValue
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import trabajoPracticoAlgoritmos2.*


@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("Dado un controller de itinerarios")
class UserControllerTestSpec(@Autowired val mockMvc: MockMvc) {

    @Autowired
    lateinit var userRepository:Repositorio<Usuario>

    @Test
    fun `Should return the right amount of objects`() {
        mockMvc.perform(get("/pruebaUser"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(3))
    }

    @Test
    fun `Should return the right user`() {
        mockMvc.perform(get("/pruebaUser/0"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.nombre").value("Jose"))
    }

    @Test
    fun `Should throw error if user is not found`() {
        mockMvc.perform(get("/pruebaUser/48"))
            .andExpect(status().isNotFound)
    }


    @Test
    fun `Should update the user correctly`() {

        var aux = usuarioJosePerez
        //hago Deep Copy del usuario
        var userBeforeUpdate = DEFAULT_MAPPER.readValue(DEFAULT_MAPPER.writeValueAsString(usuarioJosePerez), jacksonTypeRef<Usuario>())

        aux.nombre = "Pepe"

        mockMvc.perform(
            patch("/pruebaEditarUser/" + aux.id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(DEFAULT_MAPPER.writeValueAsString(aux)))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.nombre").value("Pepe"))
            .andExpect(jsonPath("$.id").value(0))
            .andExpect(jsonPath("$.amigos[0].nombre").value("Pedro"))
            .andExpect(jsonPath("$.gustos.type").value("Neofilo"))
            .andExpect(jsonPath("$.criterio.type").value("Relajado"))

        this.userRepository.update(userBeforeUpdate)

        assertEquals(usuarioJosePerez.gustos::class, Neofilo::class)
        assertEquals(usuarioJosePerez.criterio::class, Relajado::class)
    }

    @Test
    fun `Should update the user correctly and keep the correct classes`() {

        var aux = usuarioPedroBarreras
        //hago Deep Copy del usuario
        var userBeforeUpdate = DEFAULT_MAPPER.readValue(DEFAULT_MAPPER.writeValueAsString(usuarioPedroBarreras), jacksonTypeRef<Usuario>())

        aux.nombre = "Torcuato"

        mockMvc.perform(
            patch("/pruebaEditarUser/" + aux.id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(DEFAULT_MAPPER.writeValueAsString(aux)))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.nombre").value("Torcuato"))
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.gustos.type").value("Combinado"))
            .andExpect(jsonPath("$.criterio.type").value("Exigente"))

        this.userRepository.update(userBeforeUpdate)

        assertEquals(usuarioPedroBarreras.gustos::class, Combinado::class)
        assertEquals(usuarioPedroBarreras.criterio::class, Exigente::class)
    }

    @Test
    fun `Should return the right user values`() {

        mockMvc.perform(
                get("/getUserInformation/0"))
                .andExpect(status().isOk)
                .andExpect( jsonPath("$.itinerariosPuntuados").value("0") )
                .andExpect( jsonPath("$.itinerariosCreados").value("2") )
                .andExpect( jsonPath("$.destinosVisitados").value("1") )
                .andExpect( jsonPath("$.amigos").value("1") )

    }
}