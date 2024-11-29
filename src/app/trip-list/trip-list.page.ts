import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service'; // Importa el servicio
import { ToastController } from '@ionic/angular'; // Importa ToastController
import { Router } from '@angular/router'; // Importa Router para navegar a la página de confirmación

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.page.html',
  styleUrls: ['./trip-list.page.scss'],
})
export class TripListPage implements OnInit {

  trips: any[] = []; // Array para almacenar los viajes disponibles

  constructor(private firestore: FirestoreService, private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    // Cargar todos los viajes desde Firestore
    this.firestore.getCollection('Trips').subscribe(data => {
      this.trips = data.map(e => {
        return {
          id: e.payload.doc.id, // Agregar el ID del documento
          ...e.payload.doc.data() // Agregar los datos del viaje
        };
      });
    });
  }

  // Función para realizar la reserva
  async reserveTrip(trip: any) {
    if (trip.availableSeats > 0) {
      const newSeats = trip.availableSeats - 1;

      try {
        // Actualizar la cantidad de asientos disponibles en Firestore
        await this.firestore.updateSeatsAvailable(trip.id, newSeats);
        this.showToast('Reserva realizada con éxito');

        // Datos del pasajero (aquí debes obtener los datos del usuario logueado)
        const passengerDetails = {
          name: 'Juan Pérez', // Ejemplo, debes obtener esto del usuario logueado
        };

        // Navegar a la página de confirmación de reserva
        this.router.navigate(['/reservation-confirmation'], {
          queryParams: {
            trip: JSON.stringify(trip),
            passenger: JSON.stringify(passengerDetails)
          }
        });

      } catch (error) {
        console.error('Error al realizar la reserva:', error);
        this.showToast('Hubo un error al realizar la reserva');
      }
    } else {
      this.showToast('No hay asientos disponibles');
    }
  }

  // Función para mostrar el Toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  // Duración del toast en milisegundos
      position: 'bottom'  // Puedes usar 'top', 'middle', o 'bottom'
    });
    toast.present();  // Muestra el Toast
  }
}
