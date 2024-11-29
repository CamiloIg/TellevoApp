import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Asegúrate de importar IonicModule
import { LoadingScreenComponent } from './loading-screen.component';

@NgModule({
  declarations: [LoadingScreenComponent],
  imports: [
    CommonModule,
    IonicModule // Asegúrate de que IonicModule esté importado
  ],
  exports: [LoadingScreenComponent] // Exportar el componente si es necesario
})
export class LoadingScreenModule { }