/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ActivitiesPage from './Pages/ActivitiesPage'
import DestinationPage from './Pages/DestinationPage'
import { LoginPage } from './Pages/LoginPage'
import VehiclesPage from './Pages/VehiclesPage'
import HomePage from './Pages/HomePage'
import { NewActivity } from './Pages/ActivityFormPage'
import { NewVehicle } from './Pages/VehicleFormPage'

export const TareasRoutes = () => 
    <Router>
        <Routes>
            <Route exact={true} path="/" element={<LoginPage/>} />
            <Route exact={true} path="/home" element={<HomePage/>} />
            <Route exact={true} path="/destination" element={<DestinationPage/>} />
            <Route exact={true} path="/vehicles" element={<VehiclesPage/>} />
            <Route exact={true} path="/activities" element={<ActivitiesPage/>} />
            <Route exact={true} path="/editActivity" element={<NewActivity type='edit'/>} />
            <Route exact={true} path="/newActivity" element={<NewActivity type='new'/>} />
            <Route exact={true} path="/editVehicle" element={<NewVehicle type="edit" />} />
            <Route exact={true} path="/newVehicle" element={<NewVehicle type="new"/>} />
        </Routes>
    </Router>