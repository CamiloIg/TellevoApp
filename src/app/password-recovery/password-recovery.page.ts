import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service'; // Asegúrate de tener este servicio implementado

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage {
  email: string = '';

  constructor(
    private authService: AuthenticationService,
    private toastController: ToastController
  ) {}

  async recoverPassword() {
    if (!this.email) {
      this.showToast('Por favor, ingresa tu correo electrónico');
      return;
    }

    try {
      await this.authService.sendPasswordResetEmail(this.email);
      this.showToast('Enlace para restablecer contraseña enviado. Revisa tu correo.');
    } catch (error) {
      console.error('Error al enviar enlace de recuperación:', error);
      this.showToast('Hubo un problema. Por favor, intenta nuevamente.');
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
}
