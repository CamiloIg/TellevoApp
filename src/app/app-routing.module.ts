  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { AuthGuard } from './guards/auth.guard';  // Asegúrate de tener el guard de autenticación

  const routes: Routes = [
    {
      path: '',
      redirectTo: '/login',  // Redirige a login si la ruta es vacía
      pathMatch: 'full'
    },
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
      data: { animation: 'loginPage' }
    },
    {
      path: 'register',
      loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
      data: { animation: 'registerPage' }
    },
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'password-recovery',
      loadChildren: () => import('./password-recovery/password-recovery.module').then(m => m.PasswordRecoveryPageModule)
    },
    {
      path: 'trip-list',
      loadChildren: () => import('./trip-list/trip-list.module').then(m => m.TripListPageModule),
      canActivate: [AuthGuard]  // Proteger esta ruta con el guard de autenticación
    },
    {
      path: 'reservation-confirmation',
      loadChildren: () => import('./reservation-confirmation/reservation-confirmation.module').then(m => m.ReservationConfirmationPageModule)
    },
    {
      path: 'my-reservations',
      loadChildren: () => import('./my-reservations/my-reservations.module').then(m => m.MyReservationsPageModule),
      canActivate: [AuthGuard]  // Proteger esta ruta con el guard de autenticación
    },
    {
      path: 'add-trip',
      loadChildren: () => import('./add-trip/add-trip.module').then( m => m.AddTripPageModule)
    },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
