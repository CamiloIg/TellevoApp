import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  // Crear un documento en una colección
  createDoc(collection: string, data: any) {
    return this.firestore.collection(collection).add(data);
  }

  // Leer todos los documentos de una colección
  getCollection(collection: string): Observable<any[]> {
    return this.firestore.collection(collection).valueChanges();
  }

  // Leer un documento específico por su ID
  getDoc(collection: string, id: string): Observable<any> {
    return this.firestore.collection(collection).doc(id).valueChanges();
  }

  // Actualizar un documento específico
  updateDoc(collection: string, id: string, data: any) {
    return this.firestore.collection(collection).doc(id).update(data);
  }

  //Actualizar la cantidad de asientos disponibles
  updateSeatsAvailable(tripId: string, availableSeats: number){
    return this.firestore.collection('Trips').doc(tripId).update({
      availableSeats: availableSeats
    })
  }

  // Eliminar un documento específico
  deleteDoc(collection: string, id: string) {
    return this.firestore.collection(collection).doc(id).delete();
  }

  // Método para obtener reservas por ID de usuario
  getReservationsByUserId(userId: string): Observable<any[]> {
    return this.firestore.collection('reservations', ref => ref.where('userId', '==', userId)).valueChanges();
  }
}
