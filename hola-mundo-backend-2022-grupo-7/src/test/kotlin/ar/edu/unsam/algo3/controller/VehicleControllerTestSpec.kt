package ar.edu.unsam.algo3.controller

import org.junit.jupiter.api.Assertions
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
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import trabajoPracticoAlgoritmos2.Autos
import trabajoPracticoAlgoritmos2.DEFAULT_MAPPER
import trabajoPracticoAlgoritmos2.Repositorio
import trabajoPracticoAlgoritmos2.Vehiculo
import java.time.LocalDate


@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("Dado un controller de vehiculos")
class VehicleControllerTestSpec(@Autowired val mockMVC: MockMvc) {

    @Autowired
    lateinit var vehicleRepository: Repositorio<Vehiculo>

   @Test
   fun `Should return the right amount of objects`(){
        mockMVC
            .perform(MockMvcRequestBuilders.get("/vehicles"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(("application/json")))
            .andExpect(jsonPath("$.length()").value(6))
   }

    @Test
    fun `Should return the right object`() {
        mockMVC.perform(MockMvcRequestBuilders.get("/vehicles/0"))
                .andExpect(status().isOk)
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.marca").value("Honda"))
    }

    @Test
    fun `Should throw error if object doesn't exists`() {
        mockMVC.perform(MockMvcRequestBuilders.get("/vehicle/100"))
                .andExpect(status().isNotFound)
    }

    @Test
    fun `Should create new vehicle correctly`() {
        val vehicle1 = Autos(false, "AUDI", "Algo", LocalDate.of(2001, 1, 1), 15000.0)
        mockMVC.perform(
                MockMvcRequestBuilders.post("/createVehicle")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(DEFAULT_MAPPER.writeValueAsString(vehicle1)))
                .andExpect(status().isOk)
        assertEquals(vehicleRepository.coleccion.size,7)
        //Limpio el contexto para evitar flaky tests
        val aux = vehicleRepository.getById(2)
        vehicleRepository.delete(aux!!)
    }

    @Test
    fun `Should update vehicle correctly`() {
        val vehicleToUpdate = this.vehicleRepository.getById(0)
        val vehicle = Autos(false, "AUDI", "Algo", LocalDate.of(2001, 1, 1), 15000.0, id = 0)

        mockMVC.perform(
                MockMvcRequestBuilders.patch("/updateVehicle")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(DEFAULT_MAPPER.writeValueAsString(vehicle)))
                .andExpect(status().isOk)

        assertEquals(vehicleRepository.getById(0)!!.modelo,"Algo")
        //Limpio el contexto para evitar flaky tests
        vehicleRepository.update(vehicleToUpdate!!)
    }

    @Test
    fun `Should delete the vehicle from the repository`() {
        val vehicleToDelete = vehicleRepository.getById(0)
        mockMVC.perform(
                MockMvcRequestBuilders.delete("/deleteVehicle/0"))
                .andExpect(MockMvcResultMatchers.status().isOk)
        Assertions.assertEquals(vehicleRepository.coleccion.size, 5)
        //Limpio el contexto para evitar flaky tests
        vehicleRepository.coleccion.add(vehicleToDelete!!)
    }

    @Test
    fun `Should throw error if the vehicle doesnt exist`() {
        mockMVC.perform(
                MockMvcRequestBuilders.delete("/deleteVehicle/48"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest)
    }
}