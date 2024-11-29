import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestFirestorePage } from './test-firestore.page';

const routes: Routes = [
  {
    path: '',
    component: TestFirestorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestFirestorePageRoutingModule {}
