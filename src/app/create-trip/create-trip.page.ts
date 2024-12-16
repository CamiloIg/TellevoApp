import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
})
export class CreateTripPage {

  startLocation: string = '';
  endLocation: string = '';
  time: string = '';
  pricePerPassenger: number = 0;
  availableSeats: number = 0;

  constructor(private firestore: FirestoreService) {}

  createTrip() {
    const tripData = {
      driverId: 'userId', // Deberás obtener el userId del usuario logueado
      tripIni: this.startLocation,
      endLocation: this.endLocation,
      time: this.time,
      pricePerPassenger: this.pricePerPassenger,
      availableSeats: this.availableSeats,
    };
    this.firestore.createDoc('Trips', tripData)
      .then(() => {
        console.log('Viaje creado con éxito');
      })
      .catch(error => {
        console.error('Error al crear el viaje:', error);
      });
  }
}
