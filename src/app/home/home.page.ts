import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';  // Importar Router

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string = '';
  trips: any[] = [];
  filteredTrips: any[] = [];
  isOwner: boolean = false; // Indica si el usuario es conductor
  destination: string = ''; // Filtro por destino
  newTrip = {
    driverName: '',
    vehicle: '',
    departureTime: '',
    availableSeats: 0,
    pricePerPassenger: 0,
  };


  constructor(
    private firestore: FirestoreService,
    private authService: AuthenticationService,
    private toastController: ToastController,
    private router: Router  // Inyectar Router para la navegación
  ) {}

  ngOnInit() {
    // Obtener el usuario actual y determinar su rol
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.firestore.getDoc('Users', user.uid).subscribe((userData) => {
          if (userData) {
            this.userName = userData.displayName || 'Usuario';
            this.isOwner = userData.role === 'owner'; // Verificar si es conductor
          }
        });
      }
    });

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

  addTrip() {
    if (!this.newTrip.driverName || !this.newTrip.vehicle || !this.newTrip.departureTime || this.newTrip.availableSeats <= 0 || this.newTrip.pricePerPassenger <= 0) {
      this.showToast('Por favor, completa todos los campos.');
      return;
    }

    const tripData = {
      ...this.newTrip,
      tripIni: 'Ubicación de origen', // Este valor puede obtenerse dinámicamente
      time: new Date(), // Hora actual
    };

    this.firestore.createDoc('Trips', tripData).then(() => {
      this.showToast('Viaje agregado correctamente.');
      this.newTrip = {
        driverName: '',
        vehicle: '',
        departureTime: '',
        availableSeats: 0,
        pricePerPassenger: 0,
      };
      this.loadTrips(); // Actualizar lista de viajes
    }).catch((error) => {
      console.error('Error al agregar viaje:', error);
      this.showToast('Hubo un error al agregar el viaje.');
    });
  }

  selectTrip(trip: any) {
    this.showToast(`¡Has reservado el viaje de ${trip.tripIni} a ${ trip.tripDes }!`);
    // Aquí puedes añadir lógica para manejar reservas
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  // Navegar a la página de agregar viaje
  navigateToAddTrip() {
    this.router.navigate(['/add-trip']);  // Redirige a la ruta de la página de agregar viaje
  }
}
