import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-test-firestore',
  templateUrl: './test-firestore.page.html',
  styleUrls: ['./test-firestore.page.scss'],
})
export class TestFirestorePage implements OnInit {

  users: any[] = [];

  constructor(private firestore: FirestoreService) {}

  ngOnInit() {
    // Crear un nuevo usuario de prueba
    this.firestore.createDoc('Users', {
      name: 'Carlos Gómez',
      email: 'carlos@example.com',
      role: 'passenger'
    }).then(() => {
      console.log('Usuario creado con éxito');
    });

    // Leer la colección de usuarios
    this.firestore.getCollection('Users').subscribe(data => {
      this.users = data;
      console.log('Usuarios obtenidos:', this.users);
    });
  }
}
