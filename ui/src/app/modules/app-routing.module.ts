import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '../+shared/constants/app-routes.const';
import { AuthGuard } from '../+shared/authorization/guards/auth.guard';

const routes: Routes = [
  {
    path: APP_ROUTES.Login,
    loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
  },
  {
    path: APP_ROUTES.Сonverter,
    canActivate: [AuthGuard],
    loadChildren: () => import('../converter/converter.module').then(m => m.ConverterModule)
  },
  { path: '**', redirectTo: APP_ROUTES.Login }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
