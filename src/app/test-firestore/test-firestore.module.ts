import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestFirestorePageRoutingModule } from './test-firestore-routing.module';

import { TestFirestorePage } from './test-firestore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestFirestorePageRoutingModule
  ],
  declarations: [TestFirestorePage]
})
export class TestFirestorePageModule {}
