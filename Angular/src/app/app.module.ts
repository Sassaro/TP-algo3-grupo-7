import { Update_CardComponent } from './Shared/Update_Card/Update_Card.component';
import { Config_DemandingComponent } from './Shared/Config_Demanding/Config_Demanding.component';
import { FilterVehiclesPipe } from './Pipes/filterVehicles.pipe';
import { FilterItineraryPipe } from './Pipes/filterItinerary.pipe';
import { Car_Brand_SelectorComponent } from './Shared/Car_Brand_Selector/Car_Brand_Selector.component';
import { Add_Score_MenuComponent } from './Shared/Add_Score_Menu/Add_Score_Menu.component';
import { Add_Destination_MenuComponent } from './Shared/Add_Destination_Menu/Add_Destination_Menu.component';
import { ProfilePlacesElementComponent } from './Shared/Profile-places-element/Profile-places-element.component';
import { Input_SelectorComponent } from './Shared/Input_Selector/Input_Selector.component';
import { UserPreferenceComponent } from './Shared/User-Preference/User-Preference.component';
import { ProfileComponent } from './Pages/Profile/Profile.component';
import { Friend_ProfileComponent } from './Shared/Friend_Profile/Friend_Profile.component';
import { FriendsComponent } from './Shared/Friends/Friends.component';
import { Validation_FieldComponent } from './Shared/Validation_Field/Validation_Field.component';
import { LogoComponent } from './Shared/Logo/Logo.component';
import { InputComponent } from './Shared/Input/Input.component';
import { ProfilePlacesComponent } from './Shared/Profile-places/Profile-places.component';
import { Card_ActivityComponent } from './Shared/Card_Activity/Card_Activity.component';
import { DropdownComponent } from './Shared/Dropdown/Dropdown.component';
import { ScoreComponent } from './Shared/Score/Score.component';
import { ErrorHandler, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule, routingComponents } from './app-routing.module'
import { AppComponent } from './app.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './Pages/Login/Login.component';
import { MainComponent } from './Pages/Main/Main.component';
import { ActivitiesComponent } from './Pages/Activities/Activities.component';
import { Edit_itineraryComponent } from './Pages/Edit_itinerary/Edit_itinerary.component';
import { VehiclesComponent } from './Pages/Vehicles/Vehicles.component';
import { ItineraryComponent } from './Pages/Itinerary/Itinerary.component';
import { My_itinerariesComponent } from './Pages/My_itineraries/My_itineraries.component';
import { Card_MainComponent } from './Shared/Card_Main/Card_Main.component';
import { Card_VehicleComponent } from './Shared/Card_Vehicle/Card_Vehicle.component';
import { UserDataComponent } from './Shared/User-Data/User-Data.component';
import { KeypadComponent } from './Shared/Keypad/Keypad.component';
import { Card_LoginComponent } from './Shared/Card_Login/Card_Login.component';
import { NavigationComponent } from './Shared/Navigation/Navigation.component';
import { Container_ItineraryComponent } from './Shared/Container_Itinerary/Container_Itinerary.component';
import { ResultBarComponent } from './Shared/Result-Bar/Result-Bar.component';
import { Search_BarComponent } from './Shared/Search_Bar/Search_Bar.component';
import { HeaderComponent } from './Shared/Header/Header.component';
import { FooterComponent } from './Shared/Footer/Footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterActivityPipe } from './Pipes/filterActivity.pipe';
import { Error_CardComponent } from './Shared/Error_Card/Error_Card.component';

@NgModule({
  declarations: [			
    routingComponents,
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent,
    VehiclesComponent,
    Card_MainComponent,
    Search_BarComponent,
    ResultBarComponent,
    ItineraryComponent,
    Container_ItineraryComponent,
    NavigationComponent,
    Card_LoginComponent,
    My_itinerariesComponent,
    Card_VehicleComponent,
    ActivitiesComponent,
    Edit_itineraryComponent,
    KeypadComponent,
    UserDataComponent,
    ScoreComponent,
    DropdownComponent,
    Card_ActivityComponent,
    ProfilePlacesComponent,
    InputComponent,
    LogoComponent,
    Validation_FieldComponent,
    FriendsComponent,
    Friend_ProfileComponent,
    ProfileComponent,
    UserPreferenceComponent,
    Input_SelectorComponent,
    ProfilePlacesElementComponent,
    Add_Destination_MenuComponent,
    Add_Score_MenuComponent,
    FilterActivityPipe,
    Car_Brand_SelectorComponent,
    FilterItineraryPipe,
    FilterVehiclesPipe,
    Config_DemandingComponent,
    Error_CardComponent,
    Update_CardComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
