package ar.edu.unsam.algo3.controller

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import trabajoPracticoAlgoritmos2.*
import java.time.LocalTime

@AutoConfigureMockMvc
@SpringBootTest
@DisplayName("Dado un controller de actividades")
class ActivityControllerTestSpec(@Autowired val mockMvc: MockMvc) {

    @Autowired
    lateinit var activityRepository: Repositorio<Actividad>

    @Test
    fun `Should return the right amount of activities`() {
        mockMvc.perform(MockMvcRequestBuilders.get("/activities"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(5))
    }

    @Test
    fun `Should return the right activity`() {
        mockMvc.perform(MockMvcRequestBuilders.get("/activities/0"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("$.descripcion").value("Escalar"))
    }

    @Test
    fun `Should throw error if the id doesn't exist`() {
        mockMvc.perform(MockMvcRequestBuilders.get("/activities/48"))
                .andExpect(MockMvcResultMatchers.status().isNotFound)
    }

    @Test
    fun `Should add activity to the repository`() {
        val actividadFutbol =
                Actividad(1500.0, "Futbol", LocalTime.of(13, 30, 0), LocalTime.of(14, 30, 0), Dificultad.BAJA)
        mockMvc.perform(
                MockMvcRequestBuilders.post("/createActivity")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(DEFAULT_MAPPER.writeValueAsString(actividadFutbol)))
                .andExpect(MockMvcResultMatchers.status().isOk)
        assertEquals(activityRepository.coleccion.size, 6)
        //Limpio el contexto para evitar flaky tests
        val aux = activityRepository.getById(5)
        activityRepository.delete(aux!!)
    }

    @Test
    fun `Should delete the activity in the repository`() {
        val activityToErase = activityRepository.getById(0)
        mockMvc.perform(MockMvcRequestBuilders.delete("/deleteActivity/0"))
                .andExpect(MockMvcResultMatchers.status().isOk)
        assertEquals(activityRepository.coleccion.size, 4)
        //Limpio el contexto para evitar flaky tests
        activityRepository.coleccion.add(activityToErase!!)
    }

    @Test
    fun `Should throw error if the activity doesn't exist`() {
        mockMvc.perform(MockMvcRequestBuilders.delete("/deleteActivity/48"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest)
    }

    @Test
    fun `Should update the activity in the repository`() {

        val activityToUpdate = activityRepository.getById(0)

        val actividadFutbol =
                Actividad(1500.0, "Futbol", LocalTime.of(13, 30, 0), LocalTime.of(14, 30, 0), Dificultad.BAJA,id = 0)

        mockMvc.perform(
                MockMvcRequestBuilders.patch("/updateActivity")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(DEFAULT_MAPPER.writeValueAsString(actividadFutbol)))
                .andExpect(MockMvcResultMatchers.status().isOk)
        assertEquals(activityRepository.getById(0)!!.descripcion,"Futbol")
        //Limpio el contexto para evitar flaky tests
        activityRepository.update(activityToUpdate!!)
    }
}
