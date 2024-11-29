import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// HTTP Client Module import
import { HttpClientModule } from '@angular/common/http'; // Agregar HttpClientModule
import { LoadingScreenModule } from './loading-screen/loading-screen.module'; // Asegúrate de que esta línea esté presente

@NgModule({
  declarations: [
    AppComponent // Declara aquí tus componentes principales
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase
    AngularFireAnalyticsModule, // Módulo opcional para Analytics
    AngularFireAuthModule,
    HttpClientModule, // Asegúrate de que esté importado
    LoadingScreenModule, // Agregar esta línea
  ],
  providers: [],
  bootstrap: [AppComponent], // Define el componente principal de arranque
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
