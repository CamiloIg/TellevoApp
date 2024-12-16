import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service'; // Importa el servicio
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular'; // Importa ToastController
import { Router } from '@angular/router'; // Importa Router para navegar a la página de confirmación

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.page.html',
  styleUrls: ['./trip-list.page.scss'],
})
export class TripListPage implements OnInit {
  trips: any[] = [];
  filteredTrips: any[] = [];
  destination: string = ''; // Filtro por destino
  newTrip = {
    driverName: '',
    vehicle: '',
    departureTime: '',
    availableSeats: 0,
    pricePerPassenger: 0,
  };
  authService: any;
   

  constructor(
    private firestore: FirestoreService, 
    private toastController: ToastController, 
    private router: Router
  ) {}
  
  ngOnInit() {
    
    this.loadTrips();
  }

  loadTrips() {
    this.firestore.getCollection('Trips').subscribe((data) => {
      this.trips = data;
      this.filteredTrips = data; // Mostrar todos los viajes inicialmente
    });
  }

  searchTrips() {
    this.filteredTrips = this.trips.filter((trip) =>
      trip.endLocation.toLowerCase().includes(this.destination.toLowerCase())
    );
  }

  selectTrip(trip: any) {
    this.showToast(`¡Has reservado el viaje de ${trip.tripIni} a ${trip.tripDes}!`);
    // Aquí puedes añadir lógica para manejar reservas
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