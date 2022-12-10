package ar.edu.unsam.algo3.controller

import VariablesStub.itinerario
import VariablesStub.usuarioPedroBarreras
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
class ItineraryControllerTestSpec(@Autowired val mockMvc: MockMvc) {

    @Autowired
    lateinit var itineraryRepository:Repositorio<Itinerario>

    @Test
    fun `Should return the right amount of itineraries`() {
        mockMvc.perform(get("/main"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(2))
    }

    @Test
    fun `Should return the right itinerary`() {
        mockMvc.perform(get("/main/0"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.destino.pais").value("Alemania"))
    }

    @Test
    fun `Should throw error if itinerary is not found`() {
        mockMvc.perform(get("/main/48"))
            .andExpect(status().isNotFound)
    }

    @Test
    fun `Should update the itinerary correctly and not destroy user attributes`() {

        val aux = Puntuacion(10, usuarioPedroBarreras)
        var itineraryToUpdate = itinerario
        var itineraryBeforeUpdate = itineraryToUpdate.clone()

        itineraryToUpdate.agregarPuntuacion(aux)

        mockMvc.perform(
            patch("/editItinerary/" + itineraryToUpdate.id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(DEFAULT_MAPPER.writeValueAsString(itineraryToUpdate)))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.puntuaciones.length()").value(1))
        //limpio el contexto para evitar flaky tests

        this.itineraryRepository.update(itineraryBeforeUpdate)
    }
}
