import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger('pageAnimations', [
      // Animación futurista entre Login y Register
      transition('loginPage <=> registerPage', [
        style({
          position: 'absolute',
          opacity: 0,
          transform: 'scale(0.8) rotateY(90deg) translateZ(-100px)',  // Comienza con rotación y profundidad
        }),
        animate('1s cubic-bezier(0.25, 0.8, 0.25, 1)', style({
          opacity: 1,
          transform: 'scale(1) rotateY(0) translateZ(0)',  // Finaliza con el tamaño normal y sin rotación
        }))
      ])
    ])
  ]
})
export class AppComponent {
  constructor() {}

  // Método para preparar la animación de la ruta
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
