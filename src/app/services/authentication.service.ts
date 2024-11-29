import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth, 
    private firestore: AngularFirestore, // Inyecta AngularFirestore
    private router: Router
  ) {}

  // Registrar un usuario
  async register(email: string, password: string, displayName: string, role: string) {
    try {
      // Crear el usuario en Firebase Auth
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        // Guardar los datos del usuario en Firestore
        await this.firestore.collection('Users').doc(user.uid).set({
          email: user.email,
          displayName: displayName,  // Nombre de usuario
          role: role,                // Rol del usuario (pasajero, dueño, etc.)
          createdAt: new Date()
        });

        console.log('Usuario registrado y datos guardados en Firestore');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  }

  // Iniciar sesión de un usuario
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Cerrar sesión
  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Obtener el usuario actual
  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }

  // Enviar correo de recuperación de contraseña
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      console.log('Correo de recuperación enviado a:', email);
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      throw error;
    }
  }
}
