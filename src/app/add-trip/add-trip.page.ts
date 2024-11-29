import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.page.html',
  styleUrls: ['./add-trip.page.scss'],
})
export class AddTripPage {
  newTrip = {
    driverName: '',
    vehicle: '',
    departureTime: '',
    availableSeats: 0,
    pricePerPassenger: 0,
  };

  constructor(
    private firestore: FirestoreService,
    private toastController: ToastController
  ) {}

  async addTrip() {
    if (!this.newTrip.driverName || !this.newTrip.vehicle || !this.newTrip.departureTime || this.newTrip.availableSeats <= 0 || this.newTrip.pricePerPassenger <= 0) {
      this.showToast('Por favor, completa todos los campos.');
      return;
    }

    const tripData = {
      ...this.newTrip,
      startLocation: 'Ubicación de origen', // Este valor puede ser dinámico si se agrega
      time: new Date(), // Hora actual
    };

    try {
      await this.firestore.createDoc('Trips', tripData);
      this.showToast('Viaje agregado correctamente.');
      this.resetForm();
    } catch (error) {
      console.error('Error al agregar viaje:', error);
      this.showToast('Hubo un error al agregar el viaje.');
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  private resetForm() {
    this.newTrip = {
      driverName: '',
      vehicle: '',
      departureTime: '',
      availableSeats: 0,
      pricePerPassenger: 0,
    };
  }
}
