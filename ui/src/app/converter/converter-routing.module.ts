import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConverterPageComponent } from './components/converter-page/converter-page.component';

const routes: Routes = [
  {
    path: '',
    component: ConverterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConverterRoutingModule {}
