import { Edit_itineraryComponent } from './Pages/Edit_itinerary/Edit_itinerary.component';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { My_itinerariesComponent } from './Pages/My_itineraries/My_itineraries.component';
import { VehiclesComponent } from './Pages/Vehicles/Vehicles.component';
import { LoginComponent } from "./Pages/Login/Login.component"
import { MainComponent } from './Pages/Main/Main.component';
import { ItineraryComponent } from './Pages/Itinerary/Itinerary.component';
import { ActivitiesComponent } from './Pages/Activities/Activities.component';
import { ProfileComponent } from './Pages/Profile/Profile.component';

export const routes: Routes = [

  { path: 'index', component: LoginComponent },
  { path: ':userId/main', component: MainComponent },
  { path: ':userId/myItineraries', component: My_itinerariesComponent},
  { path: ':userId/itinerary/:id', component: ItineraryComponent},
  { path: ':userId/editItinerary/:id', component: Edit_itineraryComponent},
  { path: ':userId/vehicles', component: VehiclesComponent},
  { path: ':userId/:itineraryId/:activityDay/activities', component: ActivitiesComponent},
  { path: ':userId/profile', component: ProfileComponent},
  { path: '**', redirectTo: '/index', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent,
  MainComponent
]