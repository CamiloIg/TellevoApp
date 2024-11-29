import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-confirmation',
  templateUrl: './reservation-confirmation.page.html',
  styleUrls: ['./reservation-confirmation.page.scss'],
})
export class ReservationConfirmationPage implements OnInit {

  tripDetails: any = {}; // Datos del viaje
  passengerDetails: any = {}; // Datos del pasajero

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Recibimos los datos del viaje desde la navegación
    this.route.queryParams.subscribe(params => {
      if (params && params['trip'] && params['passenger']) {
        this.tripDetails = JSON.parse(params['trip']);
        this.passengerDetails = JSON.parse(params['passenger']);
      }
    });
  }
}
