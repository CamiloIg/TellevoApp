import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  isLoading: boolean = false; // Controla la pantalla de carga
  loadingMessage: string = 'Iniciando sesión...'; // Mensaje inicial
  progress: number = 0; // Controla la barra de progreso

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    this.createPageAnimation(); // Crea la animación de entrada de la página
  }

  createPageAnimation() {
    const contentElement = document.querySelector('ion-content');
    if (contentElement) {
      const animation = this.animationCtrl.create()
        .addElement(contentElement)
        .duration(1000)
        .fromTo('transform', 'translateY(100%)', 'translateY(0%)')
        .fromTo('opacity', '0', '1');
      animation.play();
    }
  }

  // Método de login con animación de carga
  async login() {
    this.isLoading = true; // Activar la pantalla de carga
    this.loadingMessage = 'Conectando...'; // Cambiar el mensaje a "Conectando..."
    this.progress = 30; // 30% de progreso inicial

    try {
      // Lógica de login (simulada con un retraso de 2 segundos)
      await this.authService.login(this.email, this.password);
      this.loadingMessage = 'Sesión iniciada'; // Cambiar el mensaje a "Sesión iniciada"
      this.progress = 100; // Completar la barra de carga

      setTimeout(() => {
        this.isLoading = false; // Ocultar la pantalla de carga
        this.router.navigate(['/home']); // Redirigir a la página de inicio
      }, 2000);
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      this.isLoading = false; // Asegura que la pantalla de carga desaparezca en caso de error
      this.loadingMessage = 'Error al iniciar sesión. Intenta de nuevo.'; // Mensaje de error
      this.progress = 0; // Reiniciar barra de progreso
    }
  }
}
