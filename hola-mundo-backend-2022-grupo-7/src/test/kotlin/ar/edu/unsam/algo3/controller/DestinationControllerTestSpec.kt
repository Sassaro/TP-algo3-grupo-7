package ar.edu.unsam.algo3.controller

import VariablesStub.destinoAlemaniaMunich
import VariablesStub.usuarioJosePerez
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator
import com.fasterxml.jackson.databind.jsontype.PolymorphicTypeValidator
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import trabajoPracticoAlgoritmos2.*
import java.time.LocalTime


@AutoConfigureMockMvc
@SpringBootTest
@DisplayName("Dado un controller de destinos")
class DestinationControllerTestSpec(@Autowired val mockMvc: MockMvc) {

    @Autowired
    lateinit var destinationRepository: Repositorio<Destino>

    @Test
    fun `Should return the right amount of objects`() {
        mockMvc.perform(MockMvcRequestBuilders.get("/prueba"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(7))
    }

    @Test
    fun `Should return the right object`() {
        mockMvc.perform(MockMvcRequestBuilders.get("/prueba/1"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.pais").value("Alemania"))
    }

    @Test
    fun `Should throw error if object doesn't exist`() {
        mockMvc.perform(MockMvcRequestBuilders.get("/prueba/48"))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
    }

    @Test
    fun `Should update the destination correctly`() {

        val aux = destinoAlemaniaMunich
        aux.ciudad = "Berlin"

        mockMvc.perform(
            patch("/editarPrueba/0")
                .contentType(MediaType.APPLICATION_JSON)
                .content(DEFAULT_MAPPER.writeValueAsString(destinoAlemaniaMunich)))
            .andExpect(status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.ciudad").value("Berlin"))

    }

    @Test
    fun `Should add destination to the repository`() {
        val destination = Destino("Argentina","Tandil",15000.0)
        mockMvc.perform(
                MockMvcRequestBuilders.post("/createDestination")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(DEFAULT_MAPPER.writeValueAsString(destination)))
                .andExpect(MockMvcResultMatchers.status().isOk)
        Assertions.assertEquals(destinationRepository.coleccion.size, 8)
        //Limpio el contexto para evitar flaky tests
        val aux = destinationRepository.getById(7)
        destinationRepository.delete(aux!!)
    }

    @Test
    fun `Should delete destination of the repository`() {
        val destinationToDelete = destinationRepository.getById(0)
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/deleteDestination/0"))
                .andExpect(MockMvcResultMatchers.status().isOk)
        Assertions.assertEquals(destinationRepository.coleccion.size, 6)
        //Limpio el contexto para evitar flaky tests
        destinationRepository.coleccion.add(destinationToDelete!!)
    }

    @Test
    fun `Should throw error if destination doesn't exist`() {
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/deleteDestination/48"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest)
    }
}