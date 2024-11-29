import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular'; // Importa AnimationController

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  displayName: string = '';
  role: string = 'pasajero';

  isLoading: boolean = false; // Controla la pantalla de carga
  loadingMessage: string = 'Creando tu cuenta...'; // Mensaje inicial para la carga
  progress: number = 0; // Progreso inicial de la barra

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private animationCtrl: AnimationController // Inyecta AnimationController
  ) {}

  ngOnInit() {
    this.createPageAnimation(); // Crea la animación cuando la página se inicializa
  }

  createPageAnimation() {
    const contentElement = document.querySelector('ion-content'); // Selecciona el contenido de la página
    if (contentElement) {
      const animation = this.animationCtrl.create()
        .addElement(contentElement)
        .duration(1000) // Duración de la animación
        .fromTo('transform', 'translateY(100%)', 'translateY(0%)') // Movimiento de abajo hacia arriba
        .fromTo('opacity', '0', '1'); // Desvanecimiento de opacidad de 0 a 1

      animation.play(); // Ejecuta la animación
    }
  }

  async register() {
    if (this.password !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      this.loadingMessage = 'Error: Las contraseñas no coinciden.';
      this.progress = 0;
      return;
    }

    this.isLoading = true; // Activa la pantalla de carga
    this.loadingMessage = 'Conectando al servidor...';
    this.progress = 30; // Simula un 30% de progreso

    try {
      await this.authService.register(this.email, this.password, this.displayName, this.role);
      this.loadingMessage = '¡Cuenta creada exitosamente!';
      this.progress = 100; // Completa el progreso

      setTimeout(() => {
        this.isLoading = false; // Oculta la pantalla de carga
        this.router.navigate(['/home']); // Navega a la página de inicio
      }, 2000); // Simula un retraso para la transición
    } catch (error) {
      console.error('Error al registrarse:', error);
      this.isLoading = false; // Asegura que la pantalla de carga desaparezca en caso de error
      this.loadingMessage = 'Error al crear la cuenta. Inténtalo de nuevo.';
      this.progress = 0; // Reinicia el progreso
    }
  }

  async navigateToLogin() {
    const contentElement = document.querySelector('ion-content');
    if (contentElement) {
      const animation = this.animationCtrl.create()
        .addElement(contentElement)
        .duration(600)
        .fromTo('transform', 'translateX(0%)', 'translateX(100%)'); // Deslizamiento hacia la derecha

      await animation.play();
    }
    this.router.navigate(['/login']); // Navega a la página de inicio de sesión
  }
}
