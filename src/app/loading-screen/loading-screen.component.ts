import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent  implements OnInit {

  isLoading: boolean = true;
  loadingMessage: string = 'Cargando...';
  progress: number = 0;

  constructor() { }

  ngOnInit() {}

}
