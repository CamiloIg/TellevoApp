import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.page.html',
  styleUrls: ['./my-reservations.page.scss'],
})
export class MyReservationsPage implements OnInit {

  reservations: any[] = []; // Array para almacenar las reservas

  constructor(private firestore: FirestoreService, private authService: AuthenticationService) {}

  ngOnInit() {
    // Obtener el ID del usuario logueado
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        // Obtener las reservas asociadas al usuario
        this.firestore.getReservationsByUserId(user.uid).subscribe(data => {
          this.reservations = data;
          console.log('Mis reservas:', this.reservations);
        });
      }
    });
  }
}
