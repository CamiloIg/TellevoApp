import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Asegúrate de importar HttpClient

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  constructor(private http: HttpClient) {}

  // Enviar correo de confirmación al pasajero
  sendEmailConfirmation(reservationDetails: any) {
    const emailData = {
      to: reservationDetails.passengerEmail,  // Correo del pasajero
      subject: 'Confirmación de Reserva',
      body: `Tu reserva ha sido confirmada para el viaje de ${reservationDetails.trip.startLocation} a ${reservationDetails.trip.endLocation}.`,
    };

    return this.http.post('/api/send-email', emailData).subscribe(response => {
      console.log('Correo de confirmación enviado al pasajero', response);
    });
  }

  // Enviar correo al dueño del vehículo
  sendEmailToOwner(ownerEmail: string, reservationDetails: any) {
    const emailData = {
      to: ownerEmail,  // Correo del dueño
      subject: 'Nueva Reserva para tu viaje',
      body: `Un pasajero ha reservado tu viaje de ${reservationDetails.trip.startLocation} a ${reservationDetails.trip.endLocation}.`,
    };

    return this.http.post('/api/send-email', emailData).subscribe(response => {
      console.log('Correo de confirmación enviado al dueño', response);
    });
  }
}
